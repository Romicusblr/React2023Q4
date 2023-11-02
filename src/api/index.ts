import { API_CONFIG } from '../config';
import { LaureateDTO } from './dtos/laureate.dto';
import { SearchLaureatesDTO } from './dtos/search-laureates.dto';

interface SearchOptions {
  limit?: string;
  offset?: string;
}

export const searchLaureates = async (
  name?: string,
  options?: SearchOptions
): Promise<LaureateDTO[]> => {
  // Destructure and set default values for options
  let { limit, offset } = options || {};

  if (!limit) limit = '5';
  if (!offset) offset = '0';
  if (!name) name = '';

  // Construct the URL with parameters
  const url = new URL(`${API_CONFIG.baseUrl}/laureates`);
  url.searchParams.append('name', name);
  url.searchParams.append('limit', limit);
  url.searchParams.append('offset', offset);

  const response = await fetch(url.toString(), {
    method: 'GET',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok'); // Consider more detailed error handling
  }

  const data: SearchLaureatesDTO = await response.json();
  return data.laureates; // Adjust based on your API's response structure
};

export const getLaureateDetails = async (
  id?: string
): Promise<LaureateDTO> => {
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
  console.log("🚀 ~ file: index.ts:57 ~ data:", data)
  return data[0]; // Adjust based on your API's response structure
};
