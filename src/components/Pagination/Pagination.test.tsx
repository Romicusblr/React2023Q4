import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';
import { MemoryRouter } from 'react-router-dom';

describe('Pagination', () => {
  // const mockSearchParams = jest.fn();
  const mockOnLimitChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // mockedReactRouterDom.useSearchParams.mockImplementation(() => mockSearchParams);
  });

  it('renders the component correctly', () => {
    render(
      <MemoryRouter>
        <Pagination
          onLimitChange={mockOnLimitChange}
          total={100}
          current={1}
          pageSize={10}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText('1', { selector: 'span' })).toBeInTheDocument(); // current page number
  });

  it('calls onLimitChange when a new limit is selected', () => {
    render(
      <MemoryRouter>
        <Pagination
          onLimitChange={mockOnLimitChange}
          total={100}
          current={1}
          pageSize={10}
        />
      </MemoryRouter>
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '5' } });
    expect(mockOnLimitChange).toHaveBeenCalledWith('5');
  });

  it('disables the left arrow when on the first page', () => {
    render(
      <MemoryRouter>
        <Pagination
          onLimitChange={mockOnLimitChange}
          total={100}
          current={1}
          pageSize={10}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Previous').parentNode).toHaveClass('disabled-link');
  });

  it('disables the right arrow when on the last page', () => {
    render(
      <MemoryRouter>
        <Pagination
          onLimitChange={mockOnLimitChange}
          total={100}
          current={10}
          pageSize={10}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Next').parentNode).toHaveClass('disabled-link');
  });

  it('enables both arrows on a middle page', () => {
    render(
      <MemoryRouter>
        <Pagination
          onLimitChange={mockOnLimitChange}
          total={100}
          current={5}
          pageSize={10}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Previous').parentNode).not.toHaveClass('disabled-link');
    expect(screen.getByText('Next').parentNode).not.toHaveClass('disabled-link');
  });

  it('change searchParams on arrow click', () => {
    render(
      <MemoryRouter>
        <Pagination
          onLimitChange={mockOnLimitChange}
          total={100}
          current={5}
          pageSize={10}
        />
      </MemoryRouter>
    );
  });
});
