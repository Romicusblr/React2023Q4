import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value.trim())}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
