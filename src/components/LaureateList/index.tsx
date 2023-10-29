import React from 'react';
import { LaureateDTO } from '../../api/dtos/laureate.dto';
import LaureateCard from '../LaureateCard';

interface LaureateListProps {
  laureates: LaureateDTO[]; // Adjust this type based on your data
}

const LaureateList: React.FC<LaureateListProps> = ({ laureates }) => {
  return (
    <>
      {laureates.length > 0 ? (
        laureates.map((laureate) => (
          <LaureateCard laureate={laureate} key={laureate.id} />
        ))
      ) : (
        <p>Not found</p>
      )}
    </>
  );
};

export default LaureateList;
