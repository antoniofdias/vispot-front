//@ts-nocheck
import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { Skeleton } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import Graph from 'react-vis-network-graph';

type Node = {
  id: string | number;
  title: string;
  color: string;
};

type Edge = {
  from: number;
  to: number;
  title: number;
};

export const NetworkGraph = () => {
  const { data, loading } = useContext(DataContext);
  const {
    selectedTracks,
    setSelectedTracks,
    correlationRange,
    selectedPalette,
    selectedAttribute,
    hasMoreThanOnePlaylist,
  } = useContext(AppContext);

  const [nodes, setNodes] = useState<Node[]>();
  const [edges, setEdges] = useState<Edge[]>();
  const [filteredEdges, setFilteredEdges] = useState<Edge[]>();
  const [graph, setGraph] = useState();

  const networkRef = useRef<any>(null);

  useEffect(() => {
    const newNodes = data.songs.map((track: any) => {
      return {
        id: track.id,
        label: track.id,
        title:
          track.name +
          '<br>' +
          (hasMoreThanOnePlaylist ? `[${track.playlist}]` : ''),
        color: track.colors[selectedPalette][selectedAttribute],
      };
    });
    setNodes(newNodes);

    const newEdges: Edge[] = [];
    for (let i = 1; i <= newNodes.length; i++) {
      for (let j = i + 1; j <= newNodes.length; j++) {
        newEdges.push({
          from: i,
          to: j,
          title: data.correlation[i - 1][j - 1].toFixed(3),
        });
      }
    }
    setEdges(newEdges);
    const currentFilteredEdges = newEdges.filter(
      (edge) =>
        edge.title >= correlationRange[0] / 10 &&
        edge.title <= correlationRange[1] / 10
    );
    setFilteredEdges(currentFilteredEdges);
  }, [data, selectedAttribute, selectedPalette, hasMoreThanOnePlaylist]);

  useEffect(() => {
    if (edges !== undefined) {
      const newEdges = edges.filter(
        (edge) =>
          edge.title >= correlationRange[0] / 10 &&
          edge.title <= correlationRange[1] / 10
      );
      setFilteredEdges(newEdges);
    }
  }, [correlationRange]);

  useEffect(() => {
    if (networkRef.current !== null && selectedTracks !== null) {
      networkRef.current.selectNodes(selectedTracks);
    } else if (networkRef.current !== null && selectedTracks === null) {
      networkRef.current.selectEdges([]);
    }
  }, [selectedTracks]);

  useEffect(() => {
    if (networkRef.current !== null) {
      networkRef.current.setOptions({
        physics: { enabled: true },
      });
    }

    setTimeout(() => {
      if (networkRef.current !== null) {
        networkRef.current.setOptions({
          physics: { enabled: false },
        });
      }
    }, 10000);
  }, [data, correlationRange]);

  useEffect(() => {
    setGraph({
      nodes: nodes?.map((node) => {
        return {
          ...node,
          opacity:
            selectedTracks === null || selectedTracks.includes(node.id)
              ? 1
              : 0.3,
        };
      }),
      edges: filteredEdges,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTracks, nodes, filteredEdges]);

  if (loading) {
    return <Skeleton variant="circular" height="100%" />;
  }

  const options = {
    autoResize: true,
    layout: {
      hierarchical: false,
    },
    edges: {
      color: {
        color: 'blue',
        highlight: 'green',
      },
      arrows: { to: { enabled: false }, from: { enabled: false } },
    },
  };

  const events = {
    select: (event) => {
      let { nodes } = event;
      if (nodes.length) {
        setSelectedTracks([nodes[0]]);
      }
    },
    doubleClick: () => {
      if (
        networkRef.current !== null &&
        networkRef.current.view !== undefined
      ) {
        networkRef.current.view.fit();
      }
    },
  };

  return (
    <div style={{ height: 510 }}>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          networkRef.current = network;
        }}
      />
    </div>
  );
};
