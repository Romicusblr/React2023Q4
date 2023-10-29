import React from 'react';
import SearchBar from '../../components/SearchBar';
import SearchResultList from '../../components/LaureateList';
import './SearchPage.module.css';
import { searchLaureat } from '../../api';
import { LaureateDTO } from '../../api/dtos/laureate.dto';

const SearchPage: React.FC = () => {
  const [laureates, setLaureates] = React.useState<LaureateDTO[]>([]);
  
  const handleSearch = async (query: string) => {
    const data = await searchLaureat(query);
    console.log("🚀 ~ file: index.tsx:12 ~ handleSearch ~ data:", data);
    setLaureates(data);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResultList laureates={laureates} />
    </div>
  );
}

export default SearchPage;
