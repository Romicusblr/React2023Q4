import React, { useEffect } from 'react';
import { useLaureates as useLaureatesContext } from '@/context/LaureateContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { searchText, setSearchText } = useLaureatesContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
    localStorage.setItem('searchQuery', searchText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.trim());
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    setSearchText(savedQuery);
  }, [setSearchText]);

  return (
    <div className=" justify-start mb-4">
      <form
        className="flex flex-row h-10 w-full min-w-[200px] max-w-[24rem]"
        onSubmit={handleSubmit}
      >
        <input
          className="h-full w-full rounded border bg-transparent px-3 py-2.5 font-sans text-sm font-normal transition-all focus:border-pink-500 focus:outline-0"
          type="text"
          value={searchText}
          onChange={handleChange}
          placeholder=" "
        />
        <button
          className="ml-2 btn btn-submit"
          data-ripple-light="true"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
