'use client';
import { mockedData } from '@/app/data';
import { ApiResponseType } from '@/components/Table/types';
import React, { useState } from 'react';

type DataContextType = {
  data: ApiResponseType;
  loading: boolean;
  error: string;
  playlistNames: string[];
  setData: (newData: ApiResponseType) => void;
  setLoading: (loadingState: boolean) => void;
  setError: (errorMessage: string) => void;
  setPlaylistNames: (playlistNames: string[]) => void;
};

export const DataContext = React.createContext<DataContextType>({
  data: mockedData,
  loading: false,
  error: '',
  playlistNames: [],
  setData: () => {},
  setLoading: () => {},
  setError: () => {},
  setPlaylistNames: () => {},
});

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<ApiResponseType>(mockedData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [playlistNames, setPlaylistNames] = useState<string[]>([]);

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        playlistNames,
        setData,
        setLoading,
        setError,
        setPlaylistNames,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
