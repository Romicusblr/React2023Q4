import { API_CONFIG } from '@/config';
import { LaureateDTO } from './dtos/laureate.dto';
import { SearchLaureatesDTO } from './dtos/search-laureates.dto';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

interface SearchLaureatesResponce {
  laureates: LaureateDTO[];
  total: number;
}

export const laureatesApi = createApi({
  reducerPath: 'laureatesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_CONFIG.baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    searchLaureates: builder.query<
      SearchLaureatesResponce,
      { name: string; page: number; limit: number }
    >({
      query: ({ name, page, limit }) => {
        const limitNumber = limit?.toString() || '5';
        const pageNumber = page?.toString() || '1';
        let offset = parseInt(limitNumber) * (parseInt(pageNumber) - 1);
        offset = Math.max(offset, 0); // Ensure offset is not negative

        const params = new URLSearchParams({
          name: name || '',
          limit: limitNumber,
          offset: offset.toString(),
        });

        return {
          url: `/laureates?${params}`,
          method: 'GET',
        };
      },
      transformResponse: (
        response: SearchLaureatesDTO
      ): SearchLaureatesResponce => {
        return {
          laureates: response.laureates,
          total: response.meta.count,
        };
      },
    }),
    getLaureateDetails: builder.query<LaureateDTO, string>({
      query: (id) => `/laureate/${id}`,
      transformResponse: (response: LaureateDTO[]): LaureateDTO => {
        return response[0];
      },
    }),
  }),
});

export const {
  useSearchLaureatesQuery,
  useGetLaureateDetailsQuery,
  util: { getRunningQueriesThunk },
} = laureatesApi;

// export endpoints for use in SSR
export const { searchLaureates, getLaureateDetails } = laureatesApi.endpoints;
