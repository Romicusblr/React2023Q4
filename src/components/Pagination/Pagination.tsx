import React from 'react';
import Arrow from './Arrow';
import LimitSelection from './LimitSelection';

interface PaginationProps {
  onLimitChange: (query: string) => void;
  total: number;
  current: number;
  pageSize: number;
  left: string;
  right: string;
}

const Pagination: React.FC<PaginationProps> = ({
  onLimitChange,
  total,
  current,
  pageSize,
  left,
  right
}) => {

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
      <LimitSelection onChange={onLimitChange} pageSize={pageSize} />
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <Arrow to={left} disabled={current === 1} type={'left'} />
          <span className="relative z-10 inline-flex items-center px-4 py-2 font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {current}
          </span>
          <Arrow to={right} disabled={current === totalPages} type={'right'} />
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
