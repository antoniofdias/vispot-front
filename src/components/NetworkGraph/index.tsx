import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { Skeleton } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import Graph from 'react-vis-graph-wrapper';

interface Node {
  id: number;
  title: HTMLDivElement;
  color: string;
}

interface Edge {
  from: number;
  to: number;
  color: {
    color: string;
    highlight: string;
  };
}

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

interface RefData {
  fit: () => void;
  on: (arg0: string, arg1: () => void) => void;
  selectNodes: (arg0: number[]) => void;
}

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

  const [graph, setGraph] = useState<GraphData>({ nodes: [], edges: [] });
  const networkRef = useRef<RefData | null>(null);

  function htmlTitle(html: string) {
    const container = document.createElement('div');
    container.innerHTML = html;
    return container;
  }

  useEffect(() => {
    if (!data?.songs || !data?.correlation) return;

    const newNodes = data.songs.map((track) => ({
      id: track.id,
      title: htmlTitle(
        `${track.name}<br>${selectedAttribute}: ${track[selectedAttribute]}` +
          (hasMoreThanOnePlaylist && selectedAttribute !== 'playlist'
            ? `<br>[${track.playlist}]`
            : '')
      ),
      color: track.colors[selectedPalette][selectedAttribute],
    }));

    const newEdges = [];
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        newEdges.push({
          from: newNodes[i].id,
          to: newNodes[j].id,
          title: data.correlation[i][j].toFixed(3),
          color: {
            color: 'blue',
            highlight: 'green',
          },
        });
      }
    }

    const filteredEdges = newEdges.filter(
      (edge) =>
        edge.title >= correlationRange[0] / 10 &&
        edge.title <= correlationRange[1] / 10
    );

    setGraph({ nodes: newNodes, edges: filteredEdges });
  }, [
    data,
    selectedAttribute,
    selectedPalette,
    hasMoreThanOnePlaylist,
    correlationRange,
  ]);

  useEffect(() => {
    if (networkRef.current && selectedTracks) {
      networkRef.current.selectNodes(selectedTracks);
    }
  }, [selectedTracks]);

  useEffect(() => {
    networkRef.current?.on('stabilized', () => {
      networkRef.current?.fit();
    });
  }, []);

  if (loading) {
    return <Skeleton variant="circular" height="100%" />;
  }

  const options = {
    autoResize: true,
    layout: {
      improvedLayout: false,
      randomSeed: undefined,
    },
    edges: {
      color: 'blue',
      arrows: { to: false, from: false },
    },
    physics: { enabled: true },
  };

  const events = {
    select: (event: any) => {
      if (event.nodes.length) {
        setSelectedTracks([event.nodes[0]]);
      }
    },
    doubleClick: () => {
      if (networkRef.current) {
        networkRef.current.fit();
      }
    },
  };

  return (
    <div style={{ height: 510 }}>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => (networkRef.current = network)}
      />
    </div>
  );
};
