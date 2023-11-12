import React from 'react';

interface LimitSelectionProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pageSize: number;
}

const LimitSelection: React.FC<LimitSelectionProps> = ({
  onChange,
  pageSize,
}) => {
  return (
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
          onChange={onChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      
  );
};

export default LimitSelection;
