import { FC, createContext, useState, useContext, ReactNode } from 'react';
import { LaureateDTO } from '@/api/dtos/laureate.dto';

interface LaureateContextType {
  searchText: string;
  setSearchText: (text: string) => void;
  laureates: LaureateDTO[];
  setLaureates: (laureates: LaureateDTO[]) => void;
  total: number;
  setTotal: (num: number) => void;
}

const initialContext: LaureateContextType = {
  searchText: '',
  setSearchText: () => {},
  laureates: [],
  setLaureates: () => {},
  total: 0,
  setTotal: () => {},
};

// Create a context for the search text and laureates list
export const LaureateContext = createContext<LaureateContextType>(initialContext);

interface LaureateProviderProps {
  children: ReactNode;
}

// Provider component that encapsulates the state and logic
export const LaureateProvider: FC<LaureateProviderProps> = ({ children }) => {
  const [searchText, setSearchText] = useState<string>(initialContext.searchText);
  const [laureates, setLaureates] = useState<LaureateDTO[]>(initialContext.laureates);
  const [total, setTotal] = useState<number>(initialContext.total);

  return (
    <LaureateContext.Provider value={{ searchText, setSearchText, laureates, setLaureates, total, setTotal }}>
      {children}
    </LaureateContext.Provider>
  );
};

// Custom hook to use the laureate context
export const useLaureates = (): LaureateContextType => {
  const context = useContext(LaureateContext);
  if (!context) {
    throw new Error('useLaureates must be used within a LaureateProvider');
  }
  return context;
};
