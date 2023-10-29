import React from 'react';
import SearchBar from '../../components/SearchBar';
import SearchResultList from '../../components/LaureateList';
import './SearchPage.module.css';
import { searchLaureat } from '../../api';
import { LaureateDTO } from '../../api/dtos/laureate.dto';

interface SearchPageState {
  laureates: LaureateDTO[];
}

class SearchPage extends React.Component<object, SearchPageState> {
  constructor(props: object) {
    super(props);
    this.state = {
      laureates: [],
    };
  }

  handleSearch = async (query: string) => {
    const data = await searchLaureat(query);
    this.setState({ laureates: data });
  };

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        <SearchResultList laureates={this.state.laureates} />
      </div>
    );
  }
}

export default SearchPage;
