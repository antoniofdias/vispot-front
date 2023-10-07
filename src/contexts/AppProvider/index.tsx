'use client';
import React, { createContext, useState } from 'react';

type Attribute =
  | 'duration_ms'
  | 'danceability'
  | 'energy'
  | 'loudness'
  | 'speechiness'
  | 'acousticness'
  | 'instrumentalness'
  | 'liveness'
  | 'valence'
  | 'tempo';

export type EdgeBundlingSignalsType = {
  tension: number;
  radius: number;
  extent: number;
  rotate: number;
  textSize: number;
  textOffset: number;
  layout: 'tidy' | 'cluster';
};

type AppContextType = {
  selectedTrack: number | null;
  selectedPalette: 'viridis' | 'cividis' | 'jet' | 'hot';
  selectedAttribute: Attribute;
  drawerOpen: boolean;
  correlationRange: number[];
  edgeBundlingSignals: EdgeBundlingSignalsType;
  setSelectedTrack: (track: number | null) => void;
  setSelectedPalette: (palette: 'viridis' | 'cividis' | 'jet' | 'hot') => void;
  setSelectedAttribute: (attribute: Attribute) => void;
  setDrawerOpen: (open: boolean) => void;
  setCorrelationRange: (range: number[]) => void;
  setEdgeBundlingSignals: (
    newSignals: Partial<EdgeBundlingSignalsType>
  ) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContext = createContext<AppContextType>({
  selectedTrack: null,
  selectedPalette: 'viridis',
  selectedAttribute: 'acousticness',
  drawerOpen: true,
  correlationRange: [0.3, 0.7],
  edgeBundlingSignals: {
    tension: 0.85,
    radius: 190,
    extent: 360,
    rotate: 0,
    textSize: 8,
    textOffset: 2,
    layout: 'cluster',
  },
  setSelectedPalette: () => {},
  setSelectedTrack: () => {},
  setSelectedAttribute: () => {},
  setDrawerOpen: () => {},
  setCorrelationRange: () => {},
  setEdgeBundlingSignals: () => {},
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  const [selectedPalette, setSelectedPalette] = useState<
    'viridis' | 'cividis' | 'jet' | 'hot'
  >('viridis');

  const [selectedAttribute, setSelectedAttribute] =
    useState<Attribute>('acousticness');

  const [drawerOpen, setDrawerOpen] = useState(true);

  const [correlationRange, setCorrelationRange] = useState<number[]>([
    0.3, 0.7,
  ]);

  const [edgeBundlingSignals, setEdgeBundlingSignals] =
    useState<EdgeBundlingSignalsType>({
      tension: 0.85,
      radius: 190,
      extent: 360,
      rotate: 0,
      textSize: 8,
      textOffset: 2,
      layout: 'cluster',
    });

  const updateEdgeBundlingSignals = (
    newSignals: Partial<EdgeBundlingSignalsType>
  ) => {
    setEdgeBundlingSignals({
      ...edgeBundlingSignals,
      ...newSignals,
    });
  };

  return (
    <AppContext.Provider
      value={{
        selectedTrack,
        selectedPalette,
        selectedAttribute,
        drawerOpen,
        correlationRange,
        edgeBundlingSignals,
        setSelectedTrack,
        setSelectedPalette,
        setSelectedAttribute,
        setDrawerOpen,
        setCorrelationRange,
        setEdgeBundlingSignals: updateEdgeBundlingSignals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
