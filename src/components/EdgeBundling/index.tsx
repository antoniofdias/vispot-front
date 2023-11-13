'use client';
import { AppContext, EdgeBundlingSignalsType } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { Skeleton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { VisualizationSpec, createClassFromSpec } from 'react-vega';
import { baseSpec } from './baseSpec';

type Node = {
  id: string | number;
  name: string;
  parent?: number;
};

type Edge = {
  source: number;
  target: number;
  weight: number;
};

export const EdgeBundling = () => {
  const { data, loading } = useContext(DataContext);
  const {
    selectedTracks,
    setSelectedTracks,
    correlationRange,
    edgeBundlingSignals,
  } = useContext(AppContext);

  const [nodes, setNodes] = useState<Node[]>();
  const [filteredNodes, setFilteredNodes] = useState<Node[]>();
  const [edges, setEdges] = useState<Edge[]>();
  const [filteredEdges, setFilteredEdges] = useState<Edge[]>();
  const [testSpec, setTestSpec] = useState<any>(baseSpec);

  useEffect(() => {
    const newNodes: Node[] = data.songs.map((track: any) => {
      return {
        id: track.id,
        name: track.name,
        parent: 0,
      };
    });
    const root: Node = {
      id: 0,
      name: 'root',
    };
    setNodes([root, ...newNodes]);

    const newEdges: Edge[] = [];
    for (let i = 1; i <= newNodes.length; i++) {
      for (let j = i + 1; j <= newNodes.length; j++) {
        newEdges.push({
          source: i,
          target: j,
          weight: data.correlation[i - 1][j - 1],
        });
      }
    }
    setEdges(newEdges);

    const updatedFilteredEdges = newEdges.filter(
      (edge) =>
        edge.weight >= correlationRange[0] / 10 &&
        edge.weight <= correlationRange[1] / 10
    );
    setFilteredEdges(updatedFilteredEdges);

    const nodeSet = new Set<number>();
    updatedFilteredEdges.forEach((edge) => {
      nodeSet.add(edge.source);
      nodeSet.add(edge.target);
    });
    nodeSet.add(0);
    const updatedFilteredNodes = [root, ...newNodes].filter((node) =>
      nodeSet.has(node.id as number)
    );
    setFilteredNodes(updatedFilteredNodes);
  }, [data.correlation, data.songs]);

  useEffect(() => {
    if (edges !== undefined) {
      const newEdges = edges.filter(
        (edge) =>
          edge.weight >= correlationRange[0] / 10 &&
          edge.weight <= correlationRange[1] / 10
      );
      setFilteredEdges(newEdges);

      if (nodes !== undefined) {
        const nodeSet = new Set<number>();
        newEdges.forEach((edge) => {
          nodeSet.add(edge.source);
          nodeSet.add(edge.target);
        });
        nodeSet.add(0);
        const updatedFilteredNodes = nodes.filter((node) =>
          nodeSet.has(node.id as number)
        );
        setFilteredNodes(updatedFilteredNodes);
      }
    }
  }, [correlationRange]);

  useEffect(() => {
    const newTestSpec = { ...testSpec };
    const tracks = selectedTracks === null ? [] : selectedTracks;

    newTestSpec.signals[newTestSpec.signals.length - 1] = {
      name: 'active',
      value: tracks,
      on: [
        { events: 'text:mouseover', update: '[datum.id]' },
        {
          events: 'mouseover[!event.item]',
          update: `[${tracks.join()}]`,
        },
      ],
    };

    newTestSpec.data[0].values = filteredNodes;
    newTestSpec.data[2].values = filteredEdges;

    setTestSpec(newTestSpec);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTracks, filteredNodes, filteredEdges]);

  if (loading) {
    return <Skeleton variant="circular" height="100%" />;
  }

  const EdgeBundlingFromSpec = createClassFromSpec({
    mode: 'vega',
    spec: {
      ...testSpec,
      width:
        typeof window !== 'undefined' && window.innerWidth > 992 ? 500 : 300,
      signals: [
        ...testSpec.signals,
        ...[
          'tension',
          'radius',
          'extent',
          'rotate',
          'textSize',
          'textOffset',
          'layout',
        ].map((name) => ({
          name,
          value: edgeBundlingSignals[name as keyof EdgeBundlingSignalsType],
        })),
      ],
    } as VisualizationSpec,
  });

  const handleClick = (...args: any) => {
    setSelectedTracks([args[1].id] || null);
  };
  const signalListeners = { click: handleClick };

  return data ? (
    <EdgeBundlingFromSpec
      signalListeners={signalListeners}
      actions={false}
      style={{ display: 'flex', justifyContent: 'center' }}
    />
  ) : (
    <></>
  );
};
