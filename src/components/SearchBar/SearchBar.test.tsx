import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import { LaureateProvider } from '@/context/LaureateContext';

const mockOnSearch = jest.fn();
const mockSetItem = jest.fn();
const mockGetItem = jest.fn();

describe('SearchBar component', () => {
  beforeEach(() => {
    Storage.prototype.setItem = mockSetItem;
    Storage.prototype.getItem = mockGetItem;
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('saves search query to local storage on submit', () => {
    const screen = render(
      <LaureateProvider>
        <SearchBar onSearch={mockOnSearch} />
      </LaureateProvider>
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Simulate user typing and submitting
    fireEvent.change(input, { target: { value: 'Nobel' } });
    fireEvent.click(submitButton);

    // Assert local storage usage
    expect(mockSetItem).toHaveBeenCalledWith('searchQuery', 'Nobel');
  });

  it('reads search query from local storage on mount', () => {
    // Mock the return value of getItem
    mockGetItem.mockReturnValue('Einstein');
    const { getByDisplayValue } = render(
      <LaureateProvider>
        <SearchBar onSearch={mockOnSearch} />
      </LaureateProvider>
    );

    // Assert that the input value is set from local storage
    expect(getByDisplayValue('Einstein')).toBeInTheDocument();
  });
});
