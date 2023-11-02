import { FC } from 'react';
import { LaureateDTO } from '../../api/dtos/laureate.dto';
import { Link } from 'react-router-dom';

interface LaureateItemProps {
  laureate: LaureateDTO;
}

const LaureateItem: FC<LaureateItemProps> = ({ laureate }) => {
  return (
    <div
      key={laureate.id}
      className="mb-2 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <Link to={laureate.id.toString()}>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {laureate.knownName?.en}
        </h2>
      </Link>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <strong>Gender:</strong> {laureate.gender}
      </p>
    </div>
  );
};

export default LaureateItem;
