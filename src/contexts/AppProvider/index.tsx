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

type AppContextType = {
  selectedTrack: number | null;
  selectedPalette: 'viridis' | 'inferno' | 'winter';
  selectedAttribute: Attribute;
  correlationRange: number[];
  setSelectedTrack: (track: number | null) => void;
  setSelectedPalette: (palette: 'viridis' | 'inferno' | 'winter') => void;
  setSelectedAttribute: (attribute: Attribute) => void;
  setCorrelationRange: (range: number[]) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContext = createContext<AppContextType>({
  selectedTrack: null,
  selectedPalette: 'viridis',
  selectedAttribute: 'acousticness',
  correlationRange: [0.3, 0.7],
  setSelectedPalette: () => {},
  setSelectedTrack: () => {},
  setSelectedAttribute: () => {},
  setCorrelationRange: () => {},
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  const [selectedPalette, setSelectedPalette] = useState<
    'viridis' | 'inferno' | 'winter'
  >('inferno');

  const [selectedAttribute, setSelectedAttribute] =
    useState<Attribute>('acousticness');

  const [correlationRange, setCorrelationRange] = useState<number[]>([
    0.3, 0.7,
  ]);

  return (
    <AppContext.Provider
      value={{
        selectedTrack,
        selectedPalette,
        selectedAttribute,
        correlationRange,
        setSelectedTrack,
        setSelectedPalette,
        setSelectedAttribute,
        setCorrelationRange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
