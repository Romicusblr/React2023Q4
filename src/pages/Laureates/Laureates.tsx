import {
  LoaderFunction,
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import SearchBar from '@/components/SearchBar/SearchBar';
// import SearchResultList from '@/components/LaureateList';
import { searchLaureates } from '@/api';
import { LaureateDTO } from '@/api/dtos/laureate.dto';
import LaureateItem from './LaureateItem';
import Pagination from '@/components/Pagination/Pagination';
import { Suspense, useEffect } from 'react';
import Loading from '@/components/Loader';
import { useLaureates } from '@/context/LaureateContext';
// import Loader from '@/components/Loader';

interface LoaderDataType {
  laureates: LaureateDTO[];
  total: number;
}

export default function Laureates() {
  const { laureates: loadedLaureates, total: loadedTotal } = useLoaderData() as LoaderDataType;

  const { laureates, total, setLaureates, setTotal } = useLaureates();
  
  // Synchronize context with loaded data
  useEffect(() => {
    setLaureates(loadedLaureates);
    setTotal(loadedTotal);
  }, [loadedLaureates, loadedTotal, setLaureates, setTotal]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '') || 1;
  const limit = parseInt(searchParams.get('limit') ?? '') || 5;

  const onSearch = (query: string) => {
    // Update the URL with the new search term, limit, and offset
    // Retain other query parameters if needed
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

  return (
    <div className="flex flex-row justify-start p-4">
      <div className="flex flex-col flex-grow mr-4">
        <SearchBar onSearch={onSearch} />
        <Pagination
          onLimitChange={onLimitChange}
          current={page}
          pageSize={limit}
          total={total}
        />
        <Suspense fallback={<Loading />}>
          {laureates.map((laureate) => (
            <LaureateItem
              key={laureate.id}
              laureate={laureate}
              to={`${laureate.id.toString()}?${searchParams}`}
            />
          ))}
        </Suspense>
      </div>
      <div className="h-screen flex flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
}

// data loader
export const laureatesLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const searchParams = url.searchParams;

  const search = searchParams.get('search');
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');
  return await searchLaureates(search, { limit, page });
};
