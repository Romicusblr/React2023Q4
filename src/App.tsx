import React from 'react';
import './App.css';
import SearchPage from './pages/SearchPage';

class App extends React.Component<object> {
  render() {
    return (
      <div>
        <h1>Search App</h1>
        <SearchPage />
      </div>
    );
  }
}

export default App;
