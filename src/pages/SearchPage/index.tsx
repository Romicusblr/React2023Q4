import React from 'react';
import SearchBar from '../../components/SearchBar';
import SearchResultList from '../../components/LaureateList';
import './SearchPage.module.css';
import { searchLaureat } from '../../api';
import { LaureateDTO } from '../../api/dtos/laureate.dto';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loader from '../../components/Loader';

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

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.handleSearch(savedQuery);
  }

  handleSearch = async (query: string) => {
    this.setState({ isLoading: true });
    const data = await searchLaureat(query);
    this.setState({ laureates: data });
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="flex flex-col justify-center items-center">
        <ErrorBoundary>
          <SearchBar onSearch={this.handleSearch} />
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <SearchResultList laureates={this.state.laureates} />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default SearchPage;
