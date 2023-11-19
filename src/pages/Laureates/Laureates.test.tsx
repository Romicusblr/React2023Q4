import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Laureates from './Laureates';
import mockStore from '@/utils/mockStore';
import { laureatesApi, useSearchLaureatesQuery } from '@/api/laureates'; // Adjust this import based on your actual API file structure
import { DEFAULT_LIMIT } from '@/config';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

jest.mock('@/api/laureates', () => ({
  ...jest.requireActual('@/api/laureates'),
  useSearchLaureatesQuery: jest.fn(),
}));

jest.mock('@/app/hooks/useLocalStorage');

const store = mockStore({
  laureate: {
    searchText: '',
    perPage: DEFAULT_LIMIT,
    // other necessary initial state values
  },
  [laureatesApi.reducerPath]: laureatesApi.middleware,
  // any other slices or initial state
});

describe('<Laureates />', () => {
  const useSearchLaureatesQueryMock = jest.fn();

  beforeEach(() => {
    (useSearchLaureatesQuery as jest.Mock).mockImplementation(
      () => useSearchLaureatesQueryMock
    );
    (useLocalStorage as jest.Mock).mockImplementation(() => [
      'test',
      jest.fn(),
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Example test: Component renders successfully
  it('renders without crashing', () => {
    const mockData = {
      laureates: [
        {
          knownName: { en: 'John Doe' },
          gender: 'Male',
          birth: {
            date: '1990-01-01',
            place: { city: { en: 'City' }, country: { en: 'Country' } },
          },
          nobelPrizes: [
            {
              awardYear: '2020',
              category: { en: 'Peace' },
              motivation: { en: 'For peace' },
            },
          ],
        },
      ],
      total: 10,
    };

    useSearchLaureatesQueryMock.mockReturnValue({
      data: mockData, // Replace with your mock data
      error: null,
      isLoading: false,
      isSuccess: true,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Laureates />
        </Provider>
      </MemoryRouter>
    );
  });
});
