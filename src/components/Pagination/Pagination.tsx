import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Arrow from './Arrow';
import LimitSelection from './LimitSelection';

interface PaginationProps {
  onLimitChange: (query: string) => void;
  total: number;
  current: number;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onLimitChange,
  total,
  current,
  pageSize,
}) => {
  const [searchParams] = useSearchParams();
  
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    onLimitChange(newLimit);
  };

  const left = new URLSearchParams({...searchParams, page: (current - 1).toString()});
  const right = new URLSearchParams({...searchParams, page: (current + 1).toString()});
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="text-gray-100 text-sm sm:flex sm:flex-1 sm:items-center sm:justify-between mb-4">
      <div>
        <p>
          Showing
          <b className="mx-0.5">{pageSize * (current - 1) + 1}</b>
          to
          <b className="mx-0.5">{pageSize * current}</b>
          of
          <b className="mx-0.5">{total}</b>
          results
        </p>
      </div>
      <LimitSelection onChange={handleLimitChange} pageSize={pageSize} />
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <Arrow to={left.toString()} disabled={current === 1} type={'left'} />
          <span className="relative z-10 inline-flex items-center px-4 py-2 font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {current}
          </span>
          <Arrow to={right.toString()} disabled={current === totalPages} type={'right'} />
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
