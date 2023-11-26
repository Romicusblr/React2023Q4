import { useRouter } from 'next/router';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useSearchLaureatesQuery } from '@/api/laureates';
import Pagination from '@/components/Pagination/Pagination';
import LaureatesList from './LaureatesList';
import { Loading } from '@/components/Loading';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/config';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setPerPage, setSearchText } from '@/app/laureatesSlice';
import { encode } from 'querystring';

export default function Laureates() {
  const router = useRouter();
  const { query } = router;
  const searchParams = new URLSearchParams(encode(query));
  const dispatch = useAppDispatch();

  const searchText = useAppSelector((state) => state.laureate.searchText);
  const perPage = useAppSelector((state) => state.laureate.perPage);
  const name = (query.search as string) ?? searchText;
  const page = parseInt((query.page as string) ?? '') || DEFAULT_PAGE;
  const limit = parseInt((query.limit as string) ?? '') || DEFAULT_LIMIT;

  const req = { name, page, limit };
  const res = useSearchLaureatesQuery(req);
  const { data, error, isFetching, isSuccess, isError } = res;

  // useEffect(() => {
  //   dispatch(setSearchText(searchTextLS));
  //   dispatch(setPerPage(DEFAULT_LIMIT));
  // }, [searchTextLS, dispatch]);

  const onSearch = (search: string) => {
    query.search = search;
    query.limit = limit.toString();
    query.page = page.toString();
    dispatch(setSearchText(search));
    // Navigate to the updated URL, which will trigger the loader
    router.push(query);
  };

  const onLimitChange = (limit: string) => {
    query.limit = limit;
    query.page = '1';
    dispatch(setPerPage(+limit));

    // Navigate to the updated URL, which will trigger the loader
    router.push(query);
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
          searchParams={query.toString()}
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
      <div className="h-screen flex flex-col justify-center"></div>
    </div>
  );
}
