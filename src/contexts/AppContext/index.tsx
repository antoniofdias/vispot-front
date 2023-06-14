import React, { createContext, useState } from 'react';

type AppContextType = {
  selectedTrack: number | null;
  nodes: any[]; // Replace `any[]` with the appropriate type for your nodes
  edges: any[]; // Replace `any[]` with the appropriate type for your edges
  selectedAttribute: string;
  correlationRange: [number, number];
  setSelectedTrack: (track: number | null) => void;
  setNodes: (nodes: any[]) => void;
  setEdges: (edges: any[]) => void;
  setSelectedAttribute: (attribute: string) => void;
  setCorrelationRange: (range: [number, number]) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContext = createContext<AppContextType>({
  selectedTrack: null,
  nodes: [],
  edges: [],
  selectedAttribute: '',
  correlationRange: [0, 0],
  setSelectedTrack: () => {},
  setNodes: () => {},
  setEdges: () => {},
  setSelectedAttribute: () => {},
  setCorrelationRange: () => {},
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [selectedAttribute, setSelectedAttribute] = useState<string>('');
  const [correlationRange, setCorrelationRange] = useState<[number, number]>([
    0, 0,
  ]);

  return (
    <AppContext.Provider
      value={{
        selectedTrack,
        nodes,
        edges,
        selectedAttribute,
        correlationRange,
        setSelectedTrack,
        setNodes,
        setEdges,
        setSelectedAttribute,
        setCorrelationRange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
