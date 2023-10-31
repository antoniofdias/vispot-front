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
  selectedTracks: number[] | null;
  selectedPalette: 'viridis' | 'cividis' | 'jet' | 'hot';
  selectedAttribute: Attribute;
  correlationRange: number[];
  edgeBundlingSignals: EdgeBundlingSignalsType;
  setSelectedTracks: (tracks: number[] | null) => void;
  setSelectedPalette: (palette: 'viridis' | 'cividis' | 'jet' | 'hot') => void;
  setSelectedAttribute: (attribute: Attribute) => void;
  setCorrelationRange: (range: number[]) => void;
  setEdgeBundlingSignals: (
    newSignals: Partial<EdgeBundlingSignalsType>
  ) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContext = createContext<AppContextType>({
  selectedTracks: null,
  selectedPalette: 'viridis',
  selectedAttribute: 'acousticness',
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
  setSelectedTracks: () => {},
  setSelectedAttribute: () => {},
  setCorrelationRange: () => {},
  setEdgeBundlingSignals: () => {},
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedTracks, setSelectedTracks] = useState<number[] | null>(null);

  const [selectedPalette, setSelectedPalette] = useState<
    'viridis' | 'cividis' | 'jet' | 'hot'
  >('viridis');

  const [selectedAttribute, setSelectedAttribute] =
    useState<Attribute>('acousticness');

  const [correlationRange, setCorrelationRange] = useState<number[]>([
    0.3, 0.7,
  ]);

  const [edgeBundlingSignals, setEdgeBundlingSignals] =
    useState<EdgeBundlingSignalsType>({
      tension: 0.85,
      radius:
        typeof window !== 'undefined' && window.innerWidth > 992 ? 190 : 100,
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
        selectedTracks,
        selectedPalette,
        selectedAttribute,
        correlationRange,
        edgeBundlingSignals,
        setSelectedTracks,
        setSelectedPalette,
        setSelectedAttribute,
        setCorrelationRange,
        setEdgeBundlingSignals: updateEdgeBundlingSignals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
