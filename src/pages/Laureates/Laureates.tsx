import {
  LoaderFunction,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
// import SearchResultList from '../../components/LaureateList';
import { searchLaureates } from '../../api';
import { LaureateDTO } from '../../api/dtos/laureate.dto';
import LaureateItem from './LaureateItem';
// import Loader from '../../components/Loader';

interface LoaderDataType {
  laureates: LaureateDTO[];
  search: string;
  limit: string;
  offset: string;
}

export default function Laureates() {
  const { laureates } = useLoaderData() as LoaderDataType;

  const navigate = useNavigate();
  const location = useLocation();
  console.log("🚀 ~ file: Laureates.tsx:27 ~ Laureates ~ location:", location)
  const search = location.search; // This holds the current search parameters like '?search=123&limit=5&offset=0'

  const onSearch = (query: string) => {
    // Update the URL with the new search term, limit, and offset
    // Retain other query parameters if needed
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('search', query);
    // searchParams.set('limit', '5'); // Set your desired limit
    // searchParams.set('offset', '0'); // Reset offset to 0 for a new search

    // Navigate to the updated URL, which will trigger the loader
    navigate({
      pathname: "/",
      search: searchParams.toString(),
    });
  };

  return (
    <div className="flex flex-row justify-start p-4">
      <div className="flex flex-col flex-grow mr-4">
        <SearchBar onSearch={onSearch} />
        {laureates.map((laureate) => (
          <LaureateItem key={laureate.id} laureate={laureate} to={`${laureate.id.toString()}${search}`}/>
        ))}
      </div>
      <div className="w-1/3 h-screen flex flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
}

// data loader
export const laureatesLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const searchParams = url.searchParams;

  const search = searchParams.get('search') ?? '';
  const limit = searchParams.get('limit') ?? '';
  const offset = searchParams.get('offset') ?? '';

  const laureates = await searchLaureates(search, { limit, offset });

  return {
    laureates,
    search,
    limit,
    offset,
  };
};
