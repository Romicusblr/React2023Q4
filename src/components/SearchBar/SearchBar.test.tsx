import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar'; // Adjust the import path as needed

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  it('renders with initial searchText', () => {
    render(<SearchBar onSearch={mockOnSearch} searchText="initial" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });

  it('updates input value on user typing', () => {
    render(<SearchBar onSearch={mockOnSearch} searchText="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input.value).toBe('hello');
  });

  it('calls onSearch when form is submitted', () => {
    render(<SearchBar onSearch={mockOnSearch} searchText="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('updates input value when defaultSearchText prop changes', () => {
    const { rerender } = render(<SearchBar onSearch={mockOnSearch} searchText="initial" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('initial');

    rerender(<SearchBar onSearch={mockOnSearch} searchText="updated" />);
    expect(input.value).toBe('updated');
  });
});
