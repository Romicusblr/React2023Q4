import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useSearchLaureatesQuery } from '@/api/laureates';
import Pagination from '@/components/Pagination/Pagination';
import LaureatesList from './LaureatesList';
import Loading from '@/components/Loading';

export default function Laureates() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';
  const page = parseInt(searchParams.get('page') ?? '') || 1;
  const limit = parseInt(searchParams.get('limit') ?? '') || 5;

  const req = { name, page, limit };
  const res = useSearchLaureatesQuery(req);
  console.log("🚀 ~ file: Laureates.tsx:17 ~ Laureates ~ res:", res)
  const { data, error, isFetching, isSuccess, isError } = res;
  const onSearch = (query: string) => {
    searchParams.set('search', query);
    searchParams.set('limit', limit.toString());
    searchParams.set('page', page.toString());

    // Navigate to the updated URL, which will trigger the loader
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  const onLimitChange = (limit: string) => {
    searchParams.set('limit', limit);
    searchParams.set('page', '1');

    // Navigate to the updated URL, which will trigger the loader
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  let content;

  if (isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    const { total, laureates } = data;
    content = (
      <>
        <Pagination
          onLimitChange={onLimitChange}
          current={page}
          pageSize={limit}
          total={total}
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
