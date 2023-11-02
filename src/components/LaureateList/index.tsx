import React from 'react';
import { LaureateDTO } from '../../api/dtos/laureate.dto';
import LaureateCard from '../LaureateCard';

interface LaureateListProps {
  laureates: LaureateDTO[];
}

const LaureateList: React.FC<LaureateListProps> = ({ laureates }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {laureates.length > 0 ? (
        laureates.map((laureate) => (
          <LaureateCard laureate={laureate} key={laureate.id} />
        ))
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
};

export default LaureateList;
