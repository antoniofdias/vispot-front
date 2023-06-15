'use client';
import React, { createContext, useState } from 'react';

type AppContextType = {
  selectedTrack: number | null;
  selectedAttribute:
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
  correlationRange: number[];
  setSelectedTrack: (track: number | null) => void;
  setSelectedAttribute: (
    attribute:
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
  ) => void;
  setCorrelationRange: (range: number[]) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContext = createContext<AppContextType>({
  selectedTrack: null,
  selectedAttribute: 'acousticness',
  correlationRange: [0.3, 0.7],
  setSelectedTrack: () => {},
  setSelectedAttribute: () => {},
  setCorrelationRange: () => {},
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<
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
  >('acousticness');
  const [correlationRange, setCorrelationRange] = useState<number[]>([
    0.3, 0.7,
  ]);

  return (
    <AppContext.Provider
      value={{
        selectedTrack,
        selectedAttribute,
        correlationRange,
        setSelectedTrack,
        setSelectedAttribute,
        setCorrelationRange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
