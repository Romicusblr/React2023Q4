import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LaureateDetails from './LaureateDetails';
import * as reactRouterDom from 'react-router-dom';
import { LaureateDTO } from '@/api/dtos/laureate.dto';

// Create a type that describes the mocked version of reactRouterDom
type MockedReactRouterDom = typeof reactRouterDom & {
  useNavigate: jest.Mock;
  useLoaderData: jest.Mock;
};

// Then cast reactRouterDom to the mocked version
const mockedReactRouterDom = reactRouterDom as MockedReactRouterDom;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useNavigate: jest.fn(),
  useLoaderData: jest.fn(),
}));

jest.mock('@/api', () => ({
  getLaureateDetails: jest.fn(),
}));

describe('LaureateDetails', () => {
  const mockNavigate = jest.fn();
  const mockLaureate: LaureateDTO = {
    id: '1',
    knownName: { en: 'Test Laureate' },
    gender: 'Female',
    birth: {
      date: '1900-01-01',
      place: { city: { en: 'Test City' }, country: { en: 'Test Country' } },
    },
    nobelPrizes: [
      {
        awardYear: '2020',
        category: { en: 'Physics' },
        motivation: { en: 'For significant contribution' },
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedReactRouterDom.useNavigate.mockImplementation(() => mockNavigate);
    mockedReactRouterDom.useLoaderData.mockImplementation(() => mockLaureate);
  });

  it('renders correctly with laureate details', () => {
    render(<LaureateDetails />);

    expect(screen.getByText('Test Laureate')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('1900-01-01')).toBeInTheDocument();
    expect(screen.getByText('Test City, Test Country')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Physics')).toBeInTheDocument();
    expect(
      screen.getByText('For significant contribution')
    ).toBeInTheDocument();
  });

  it('navigates back when close button is clicked', () => {
    render(<LaureateDetails />);
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('navigates back when modal div is clicked', () => {
    render(<LaureateDetails />);
    const div = document.querySelector('#modalBackground'); // Using standard DOM API
    expect(div).not.toBeNull();
    fireEvent.click(div!);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
