import React from 'react';
import { Link } from 'react-router-dom';

interface ArrowProps {
  to: string;
  disabled: boolean;
  type: 'left' | 'right';
}

const leftClasses =
  'rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
const rightClasses =
  'relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ';

const leftSvg =
  'M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z';
const rightSvg =
  'M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z';

const Arrow: React.FC<ArrowProps> = ({ to, disabled, type }) => {
  return (
    <Link
      to={`?${to}`}
      className={
        (type === 'left' ? leftClasses : rightClasses) +
        (disabled ? ' disabled-link' : '')
      }
    >
      <span className="sr-only">{type === 'left' ? 'Previous' : 'Next'}</span>
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d={type === 'left' ? leftSvg : rightSvg}
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
};

export default Arrow;
