import React from 'react';
import { LaureateDTO } from '../../api/dtos/laureate.dto';

// Define the props type using the provided DTOs
interface LaureateCardProps {
  laureate: LaureateDTO;
}

class LaureateCard extends React.Component<LaureateCardProps> {
  render() {
    const { laureate } = this.props;

    return (
      <div className="laureate-card">
        <h2>{laureate.knownName?.en}</h2>
        <p><strong>Gender:</strong> {laureate.gender}</p>
        <p><strong>Birth Date:</strong> {laureate.birth.date}</p>
        <p><strong>Birth Place:</strong> {laureate.birth.place.city?.en}, {laureate.birth.place.country?.en}</p>
        
        <h3>Nobel Prizes:</h3>
        {laureate.nobelPrizes.map((prize, index) => (
          <div key={index}>
            <p><strong>Award Year:</strong> {prize.awardYear}</p>
            <p><strong>Category:</strong> {prize.category?.en}</p>
            <p><strong>Motivation:</strong> {prize.motivation?.en}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default LaureateCard;
