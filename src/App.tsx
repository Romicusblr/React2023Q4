import React from 'react';
import './App.css';
import SearchPage from './pages/SearchPage';

const App: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl my-4 bold font-bold text-center">Search App</h1>
      <SearchPage />
    </>
  );
};

export default App;
