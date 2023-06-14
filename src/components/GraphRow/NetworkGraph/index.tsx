//@ts-nocheck
import { AppContext } from '@/contexts/AppProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import Graph from 'react-vis-network-graph';

// import "./styles.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";

export const NetworkGraph = ({ data }: any) => {
  const { selectedTrack, setSelectedTrack } = useContext(AppContext);
  const [value, setValue] = useState<number[]>([0.3, 0.7]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState<Edge[]>();
  const [graph, setGraph] = useState();
  const [filteredEdges, setFilteredEdges] = useState<Edge[]>();

  const networkRef = useRef<any>(null);

  useEffect(() => {
    const nodesHm = data.songs.map((track: any) => {
      return {
        id: track.id,
        label: track.id,
        title: track.name,
        uri: track.uri,
        color: track.colors.acousticness,
        parent: 0,
        // opacity: 0.3,
      };
    });
    setNodes(nodesHm);

    const edgesHm: Edge[] = [];
    for (let i = 1; i <= nodesHm.length; i++) {
      for (let j = i + 1; j <= nodesHm.length; j++) {
        edgesHm.push({
          from: i,
          to: j,
          title: data.correlation[i - 1][j - 1],
        });
      }
    }
    setEdges(edgesHm);
    const edgesHm2 = edgesHm.filter(
      (edge) => edge.title >= value[0] / 10 && edge.title <= value[1] / 10
    );
    setFilteredEdges(edgesHm2);
  }, [data.correlation, data.songs]);

  useEffect(() => {
    if (edges !== undefined) {
      const edgesHm = edges.filter(
        (edge) => edge.title >= value[0] / 10 && edge.title <= value[1] / 10
      );
      setFilteredEdges(edgesHm);
    }
  }, [value]);

  useEffect(() => {
    if (networkRef.current !== null && selectedTrack !== null) {
      networkRef.current.selectNodes([selectedTrack]);
    }
  }, [selectedTrack]);

  useEffect(() => {
    setGraph({
      // nodes: [
      //   { id: 1, label: '1', title: 'node 1 tootip text' },
      //   { id: 2, label: '2', title: 'node 2 tootip text' },
      //   { id: 3, label: '3', title: 'node 3 tootip text' },
      //   { id: 4, label: '4', title: 'node 4 tootip text' },
      //   { id: 5, label: '5', title: 'node 5 tootip text' },
      //   { id: 6, label: '6', title: 'node 6 tootip text' },
      // ],
      // edges: [
      //   { from: 1, to: 2, title: 'hmm' },
      //   { from: 1, to: 3 },
      //   { from: 2, to: 4 },
      //   { from: 2, to: 5 },
      //   { from: 2, to: 6 },
      //   { from: 6, to: 1 },
      //   { from: 5, to: 6 },
      // ],
      nodes: nodes.map((node) => {
        return {
          ...node,
          opacity:
            selectedTrack === null || node.id === selectedTrack ? 1 : 0.3,
        };
      }),
      edges: filteredEdges,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrack, nodes, filteredEdges]);

  const options = {
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
    height: '500px',
  };

  const events = {
    select: (event) => {
      let { nodes, edges } = event;
      console.log(edges);
      console.log(nodes);
      if (nodes.length) {
        setSelectedTrack(nodes[0]);
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
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {
        networkRef.current = network;
      }}
    />
  );
};
