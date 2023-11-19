import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LaureateDetails from './LaureateDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLaureateDetailsQuery } from '@/api/laureates';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('@/api/laureates', () => ({
  useGetLaureateDetailsQuery: jest.fn(),
}));

describe('<LaureateDetails />', () => {
  const mockNavigate = jest.fn();
  const mockId = '123';

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (useParams as jest.Mock).mockImplementation(() => ({ id: mockId }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading component when data is being fetched', () => {
    (useGetLaureateDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    render(<LaureateDetails />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display laureate details when data fetch is successful', () => {
    const mockData = {
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
    };

    (useGetLaureateDetailsQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      data: mockData,
    });
    render(<LaureateDetails />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
  });

  it('should display error message when there is an error', () => {
    const mockError = new Error('Fetch error');
    (useGetLaureateDetailsQuery as jest.Mock).mockReturnValue({
      isError: true,
      error: mockError,
    });
    render(<LaureateDetails />);
    expect(screen.getByText(/Fetch error/)).toBeInTheDocument();
  });

  it('should navigate back on close button click', () => {
    (useGetLaureateDetailsQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      data: {},
    });
    render(<LaureateDetails />);
    fireEvent.click(screen.getByText('Close'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
