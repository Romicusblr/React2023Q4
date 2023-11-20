import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LaureatesList from './LaureatesList';
import { LaureateDTO } from '@/api/dtos/laureate.dto';
import { MemoryRouter as Router } from 'react-router-dom';

describe('LaureatesList Component', () => {
  const mockLaureates: LaureateDTO[] = [
    { id: '1', knownName: { en: 'Marie Curie' } },
    { id: '2', knownName: { en: 'Albert Einstein' } },
  ];

  it('renders laureates correctly', () => {
    render(
      <Router>
        <LaureatesList laureates={mockLaureates} />
      </Router>
    );

    mockLaureates.forEach((laureate) => {
      expect(
        screen.getByText(laureate.knownName.en as string)
      ).toBeInTheDocument();
    });
  });

  it('displays no data message when there are no laureates', () => {
    render(
      <Router>
        <LaureatesList laureates={[]} />
      </Router>
    );

    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
