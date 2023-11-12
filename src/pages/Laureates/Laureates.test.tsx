import { render } from '@testing-library/react';
import Laureates from './Laureates';
import * as reactRouterDom from 'react-router-dom';
import { LaureateDTO } from '@/api/dtos/laureate.dto';
import { useLaureates } from '@/context/LaureateContext';
import { MemoryRouter } from 'react-router-dom';

type MockedReactRouterDom = typeof reactRouterDom & {
  useNavigate: jest.Mock;
  useLoaderData: jest.Mock;
  useSearchParams: jest.Mock;
};
type mockedUseLaureates = jest.Mock;

const mockedReactRouterDom = reactRouterDom as MockedReactRouterDom;
const mockedUseLaureates = useLaureates as mockedUseLaureates;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLoaderData: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/context/LaureateContext', () => ({
  useLaureates: jest.fn(),
}));

jest.mock('@/api', () => ({
  searchLaureates: jest.fn(),
}));

describe('Laureates Component Tests', () => {
  const mockLaureates: LaureateDTO[] = [
    { id: '1', knownName: { en: 'Marie Curie' } },
    { id: '2', knownName: { en: 'Albert Einstein' } },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseLaureates.mockReturnValue({
      laureates: mockLaureates,
      setLaureates: jest.fn(),
      total: 2,
      setTotal: jest.fn(),
      searchText: '',
      setSearchText: jest.fn(),
    });
    mockedReactRouterDom.useLoaderData.mockReturnValue({
      laureates: mockLaureates,
      total: 2,
    });
    mockedReactRouterDom.useSearchParams.mockReturnValue([
      { get: jest.fn(), set: jest.fn() },
      jest.fn(),
    ]);
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Laureates />
      </MemoryRouter>
    );
  });
});
