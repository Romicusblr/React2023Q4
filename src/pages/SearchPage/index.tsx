import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import SearchResultList from '../../components/LaureateList';
import { searchLaureat } from '../../api';
import { LaureateDTO } from '../../api/dtos/laureate.dto';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loader from '../../components/Loader';

const SearchPage: React.FC = () => {
  const [laureates, setLaureates] = useState<LaureateDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    handleSearch(savedQuery);
  }, []); // Empty dependency array to run only on mount

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const data = await searchLaureat(query);
      setLaureates(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <ErrorBoundary>
          <SearchResultList laureates={laureates} />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default SearchPage;
