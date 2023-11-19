import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useSearchLaureatesQuery } from '@/api/laureates';
import Pagination from '@/components/Pagination/Pagination';
import LaureatesList from './LaureatesList';
import Loading from '@/components/Loading';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/config';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setPerPage, setSearchText } from '@/features/laureates/laureatesSlice';
import { useEffect } from 'react';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

export default function Laureates() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchTextLS, setSearchTextLS] = useLocalStorage<string>(
    'searchText',
    ''
  );

  const [searchParams] = useSearchParams();
  const searchText = useAppSelector((state) => state.laureate.searchText);
  const perPage = useAppSelector((state) => state.laureate.perPage);
  const name = searchParams.get('search') ?? searchText;
  const page = parseInt(searchParams.get('page') ?? '') || DEFAULT_PAGE;
  const limit = parseInt(searchParams.get('limit') ?? '') || DEFAULT_LIMIT;

  const req = { name, page, limit };
  const res = useSearchLaureatesQuery(req);
  const { data, error, isFetching, isSuccess, isError } = res;

  useEffect(() => {
    dispatch(setSearchText(searchTextLS));
    dispatch(setPerPage(DEFAULT_LIMIT));
  }, [searchTextLS, dispatch]);

  const onSearch = (query: string) => {
    searchParams.set('search', query);
    searchParams.set('limit', limit.toString());
    searchParams.set('page', page.toString());
    setSearchTextLS(query);
    dispatch(setSearchText(searchTextLS));
    // Navigate to the updated URL, which will trigger the loader
    navigate({
      search: searchParams.toString(),
    });
  };

  const onLimitChange = (limit: string) => {
    searchParams.set('limit', limit);
    searchParams.set('page', '1');
    dispatch(setPerPage(+limit));

    // Navigate to the updated URL, which will trigger the loader
    navigate({
      search: searchParams.toString(),
    });
  };

  const createPageUrl = (searchParams: URLSearchParams, page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return params.toString();
  };

  let content;

  if (isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    const { total, laureates } = data;
    const left = createPageUrl(searchParams, page - 1);
    const right = createPageUrl(searchParams, page + 1);
    content = (
      <>
        <Pagination
          onLimitChange={onLimitChange}
          current={page}
          pageSize={perPage}
          total={total}
          left={left}
          right={right}
        />
        <LaureatesList
          laureates={laureates}
          searchParams={searchParams.toString()}
        ></LaureatesList>
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <div className="flex flex-row justify-start p-4">
      <div className="flex flex-col flex-grow mr-4">
        <SearchBar onSearch={onSearch} searchText={searchText} />
        {content}
      </div>
      <div className="h-screen flex flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
}
