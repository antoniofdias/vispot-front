'use client';
import { ApiResponseType } from '@/components/Table/types';
import { mocks } from '@/mocks';
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
  data: mocks.default,
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
  const [data, setData] = useState<ApiResponseType>(mocks.default);
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
