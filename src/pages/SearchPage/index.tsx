import React from 'react';
import SearchBar from '../../components/SearchBar';
import SearchResultList from '../../components/LaureateList';
import './SearchPage.module.css';
import { searchLaureat } from '../../api';
import { LaureateDTO } from '../../api/dtos/laureate.dto';

interface SearchPageState {
  laureates: LaureateDTO[];
  isLoading: boolean;
}

class SearchPage extends React.Component<object, SearchPageState> {
  constructor(props: object) {
    super(props);
    this.state = {
      laureates: [],
      isLoading: false,
    };
  }

  handleSearch = async (query: string) => {
    this.setState({ isLoading: true });
    const data = await searchLaureat(query);
    this.setState({ laureates: data });
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <SearchResultList laureates={this.state.laureates} />
        )}
      </div>
    );
  }
}

export default SearchPage;
