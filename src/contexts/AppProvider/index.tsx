'use client';
import React, { createContext, useState } from 'react';

type AppContextType = {
  selectedTrack: number | null;
  selectedAttribute: string;
  correlationRange: number[];
  setSelectedTrack: (track: number | null) => void;
  setSelectedAttribute: (attribute: string) => void;
  setCorrelationRange: (range: number[]) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContext = createContext<AppContextType>({
  selectedTrack: null,
  selectedAttribute: '',
  correlationRange: [0.3, 0.7],
  setSelectedTrack: () => {},
  setSelectedAttribute: () => {},
  setCorrelationRange: () => {},
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string>('');
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
