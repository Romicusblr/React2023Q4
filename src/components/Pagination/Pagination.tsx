import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

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
  const linkSearchParams = new URLSearchParams(searchParams);
  linkSearchParams.set('page', (current - 2).toString());
  const left = linkSearchParams.toString();
  linkSearchParams.set('page', (current).toString());
  const right = linkSearchParams.toString();
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
      <div className="flex">
        <label
          htmlFor="onPage"
          className="p-2 whitespace-nowrap block font-medium"
        >
          On page
        </label>
        <select
          id="onPage"
          value={pageSize}
          className="p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleLimitChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <Link
            to={`?${left}`}
            className="rounded-l-md px-2 py-2  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <span
            className="relative z-10 inline-flex items-center px-4 py-2 font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {current}
          </span>
          <Link
            to={`?${right}`}
            className="relative inline-flex items-center rounded-r-md px-2 py-2  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
