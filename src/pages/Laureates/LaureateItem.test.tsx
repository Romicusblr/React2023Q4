import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LaureateItem from './LaureateItem';
import { LaureateDTO } from '@/api/dtos/laureate.dto';
import { MemoryRouter as Router } from 'react-router-dom';

describe('LaureateItem Component', () => {
  const mockLaureate: LaureateDTO = {
    id: '1',
    knownName: { en: 'Marie Curie' },
    nobelPrizes: [{ awardYear: '1903' }, { awardYear: '1911' }],
  };

  it('renders correctly with laureate data', () => {
    render(
      <Router>
        <LaureateItem
          laureate={mockLaureate}
          to={`/laureates/${mockLaureate.id}`}
        />
      </Router>
    );

    // Check if the name and award years are rendered
    expect(screen.getByText('Marie Curie')).toBeInTheDocument();
    expect(screen.getByText('1903, 1911')).toBeInTheDocument();
  });
});
