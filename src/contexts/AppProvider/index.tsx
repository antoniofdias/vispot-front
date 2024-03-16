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
  | 'tempo'
  | 'playlist';

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
  hasMoreThanOnePlaylist: boolean;
  edgeBundlingSignals: EdgeBundlingSignalsType;
  setSelectedTracks: (tracks: number[] | null) => void;
  setSelectedPalette: (palette: 'viridis' | 'cividis' | 'jet' | 'hot') => void;
  setSelectedAttribute: (attribute: Attribute) => void;
  setCorrelationRange: (range: number[]) => void;
  setHasMoreThanOnePlaylist: (multiples: boolean) => void;
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
  correlationRange: [0.6, 1.0],
  hasMoreThanOnePlaylist: false,
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
  setHasMoreThanOnePlaylist: () => {},
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
    0.6, 1.0,
  ]);

  const [hasMoreThanOnePlaylist, setHasMoreThanOnePlaylist] =
    useState<boolean>(false);

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
        hasMoreThanOnePlaylist,
        edgeBundlingSignals,
        setSelectedTracks,
        setSelectedPalette,
        setSelectedAttribute,
        setCorrelationRange,
        setHasMoreThanOnePlaylist,
        setEdgeBundlingSignals: updateEdgeBundlingSignals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
