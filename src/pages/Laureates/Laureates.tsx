import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useSearchLaureatesQuery } from '@/api/laureates';
import Pagination from '@/components/Pagination/Pagination';
import LaureatesList from './LaureatesList';
import Loading from '@/components/Loading';
import {DEFAULT_LIMIT, DEFAULT_PAGE} from "@/config";

export default function Laureates() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('search') ?? '';
  const page = parseInt(searchParams.get('page') ?? '') || DEFAULT_PAGE;
  const limit = parseInt(searchParams.get('limit') ?? '') || DEFAULT_LIMIT;

  const req = { name, page, limit };
  const res = useSearchLaureatesQuery(req);
  const { data, error, isFetching, isSuccess, isError } = res;

  const onSearch = (query: string) => {
    searchParams.set('search', query);
    searchParams.set('limit', limit.toString());
    searchParams.set('page', page.toString());

    // Navigate to the updated URL, which will trigger the loader
    navigate({
      search: searchParams.toString(),
    });
  };

  const onLimitChange = (limit: string) => {
    searchParams.set('limit', limit);
    searchParams.set('page', '1');

    // Navigate to the updated URL, which will trigger the loader
    navigate({
      search: searchParams.toString(),
    });
  };

  let content;

  if (isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    const { total, laureates } = data;
    const left = new URLSearchParams({
      ...searchParams,
      page: (page - 1).toString(),
    }).toString();
    const right = new URLSearchParams({
      ...searchParams,
      page: (page + 1).toString(),
    }).toString();
    content = (
      <>
        <Pagination
          onLimitChange={onLimitChange}
          current={page}
          pageSize={limit}
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
        <SearchBar onSearch={onSearch} />
        {content}
      </div>
      <div className="h-screen flex flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
}
