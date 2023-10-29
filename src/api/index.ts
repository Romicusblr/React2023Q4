import { API_CONFIG } from '../config';
import { LaureateDTO } from './dtos/laureate.dto';
import { SearchLaureatesDTO } from './dtos/search-laureates.dto';

interface SearchOptions {
  limit?: number;
  offset?: number;
}

export const searchLaureat = async (
  name: string,
  options?: SearchOptions
): Promise<LaureateDTO[]> => {
  // Destructure and set default values for options
  const { limit = 10, offset = 1 } = options || {};

  // Construct the URL with parameters
  const url = new URL(`${API_CONFIG.baseUrl}/laureates`);
  url.searchParams.append('name', name);
  url.searchParams.append('limit', String(limit));
  url.searchParams.append('offset', String(offset));

  const response = await fetch(url.toString(), {
    method: 'GET',
    mode: 'cors',
  });

  if (!response.ok) {
    console.log('🚀 ~ file: index.ts:28 ~ response:', response);
    throw new Error('Network response was not ok'); // Consider more detailed error handling
  }

  const data: SearchLaureatesDTO = await response.json();
  return data.laureates; // Adjust based on your API's response structure
};
