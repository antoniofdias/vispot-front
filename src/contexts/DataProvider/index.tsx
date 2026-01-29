'use client';

import { ApiResponseType } from '@/components/Table/types';
import { MockKey, mocks } from '@/mocks';
import React, { useState } from 'react';

type DataContextType = {
  data: ApiResponseType;
  loading: boolean;
  error: string;
  playlistNames: string[];

  currentMock: MockKey;

  setData: (newData: ApiResponseType) => void;
  setMock: (key: MockKey) => void;
  setLoading: (loadingState: boolean) => void;
  setError: (errorMessage: string) => void;
  setPlaylistNames: (playlistNames: string[]) => void;
};

export const DataContext = React.createContext<DataContextType>({
  data: mocks.default,
  loading: false,
  error: '',
  playlistNames: [],
  currentMock: 'default',
  setData: () => {},
  setMock: () => {},
  setLoading: () => {},
  setError: () => {},
  setPlaylistNames: () => {},
});

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<ApiResponseType>(mocks.default);
  const [currentMock, setCurrentMock] = useState<MockKey>('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [playlistNames, setPlaylistNames] = useState<string[]>([]);

  const setMock = (key: MockKey) => {
    setLoading(true);
    setData(mocks[key]);
    setCurrentMock(key);
    setLoading(false);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        playlistNames,
        currentMock,
        setData,
        setMock,
        setLoading,
        setError,
        setPlaylistNames,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
