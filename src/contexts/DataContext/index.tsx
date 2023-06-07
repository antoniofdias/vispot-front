import { mockedData } from '@/app/data';
import { ApiResponseType } from '@/components/Table/types';
import React from 'react';

type DataContextType = {
  data: ApiResponseType;
  setData: (newData: ApiResponseType) => void;
};

export const DataContext = React.createContext<DataContextType>({
  data: mockedData,
  setData: () => {},
});
