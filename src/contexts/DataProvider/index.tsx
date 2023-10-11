'use client';
import { mockedData } from '@/app/data';
import { ApiResponseType } from '@/components/Table/types';
import React, { useState } from 'react';

type DataContextType = {
  data: ApiResponseType;
  loading: boolean;
  error: string;
  setData: (newData: ApiResponseType) => void;
  setLoading: (loadingState: boolean) => void;
  setError: (errorMessage: string) => void;
};

export const DataContext = React.createContext<DataContextType>({
  data: mockedData,
  loading: false,
  error: '',
  setData: () => {},
  setLoading: () => {},
  setError: () => {},
});

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<ApiResponseType>(mockedData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        setData,
        setLoading,
        setError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
