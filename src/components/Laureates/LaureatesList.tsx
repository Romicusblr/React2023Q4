import { FC } from 'react';
import { LaureateDTO } from '@/api/dtos/laureate.dto';
import LaureateItem from './LaureateItem';

interface LaureatesListProps {
  laureates: LaureateDTO[];
  searchParams?: string;
}

const LaureatesList: FC<LaureatesListProps> = ({ laureates, searchParams }) => {
  return (
    <>
      {laureates.length ? (
        laureates.map((laureate) => (
          <LaureateItem
            key={laureate.id}
            laureate={laureate}
            to={`laureate/${laureate.id}?${searchParams}`}
          />
        ))
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default LaureatesList;
