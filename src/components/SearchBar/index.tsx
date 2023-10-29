import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface SearchBarState {
  query: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      query: localStorage.getItem('searchQuery') || '',
    };
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
    localStorage.setItem('searchQuery', this.state.query);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value.trim() });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;
