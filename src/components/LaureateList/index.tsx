import React from 'react';
import { LaureateDTO } from '../../api/dtos/laureate.dto';
import LaureateCard from '../LaureateCard';

interface LaureateListProps {
  laureates: LaureateDTO[];
}

class LaureateList extends React.Component<LaureateListProps> {
  render() {
    const { laureates } = this.props;

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
  }
}

export default LaureateList;
