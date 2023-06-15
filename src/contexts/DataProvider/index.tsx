'use client';
import { mockedData } from '@/app/data';
import { ApiResponseType } from '@/components/Table/types';
import React, { useState } from 'react';

type DataContextType = {
  data: ApiResponseType;
  loading: boolean;
  setData: (newData: ApiResponseType) => void;
  setLoading: (loadingState: boolean) => void;
};

export const DataContext = React.createContext<DataContextType>({
  data: mockedData,
  setData: () => {},
  loading: false,
  setLoading: () => {},
});

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<ApiResponseType>(mockedData);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
