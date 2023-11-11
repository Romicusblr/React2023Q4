import { API_CONFIG } from '../config';
import { LaureateDTO } from './dtos/laureate.dto';
import { SearchLaureatesDTO } from './dtos/search-laureates.dto';

interface SearchOptions {
  limit: string | null;
  page: string | null;
}

interface SearchLaureatesResponce {
  laureates: LaureateDTO[];
  total: number;
}

export const searchLaureates = async (
  name: string | null,
  options?: SearchOptions
): Promise<SearchLaureatesResponce> => {
  // Destructure and set default values for options
  const { limit, page } = options || {};

  const pageNumber = parseInt(page ?? '') || 1;
  const limitNumber = parseInt(limit ?? '') || 5;
  if (!name) name = '';
  let offset = limitNumber * (pageNumber - 1);
  
  if (offset < 0) {
    offset = 0
  }
  
  // Construct the URL with parameters
  const url = new URL(`${API_CONFIG.baseUrl}/laureates`);
  url.searchParams.append('name', name);
  url.searchParams.append('limit', limitNumber.toString());
  url.searchParams.append('offset', offset.toString());

  const response = await fetch(url.toString(), {
    method: 'GET',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok'); // Consider more detailed error handling
  }

  const data: SearchLaureatesDTO = await response.json();
  return {
    laureates: data.laureates,
    total: data.meta.count,
  };
};

export const getLaureateDetails = async (id?: string): Promise<LaureateDTO> => {
  // Construct the URL with parameters
  const url = new URL(`${API_CONFIG.baseUrl}/laureate/${id}`);

  const response = await fetch(url.toString(), {
    method: 'GET',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok'); // Consider more detailed error handling
  }

  const data: LaureateDTO[] = await response.json();
  console.log('🚀 ~ file: index.ts:57 ~ data:', data);
  return data[0]; // Adjust based on your API's response structure
};
