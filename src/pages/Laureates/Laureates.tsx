// import React, { useState, useEffect } from 'react';
import { LoaderFunction, Outlet, useLoaderData } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
// import SearchResultList from '../../components/LaureateList';
// import { searchLaureat } from '../../api';
import { LaureateDTO } from '../../api/dtos/laureate.dto';
// import ErrorBoundary from '../../components/ErrorBoundary';
// import Loader from '../../components/Loader';
// import { Link, LoaderFunction, useLoaderData } from "react-router-dom"

export default function Laureates() {
  const laureates = useLoaderData() as LaureateDTO[];

  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const savedQuery = localStorage.getItem('searchQuery') || '';
  //   handleSearch(savedQuery);
  // }, []); // Empty dependency array to run only on mount

  // const handleSearch = async (query: string) => {
  //   setIsLoading(true);
  //   try {
  //     const data = await searchLaureat(query);
  //     setLaureates(data);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-row justify-start p-4">
      <div className="flex flex-col flex-grow mr-4">
        <SearchBar onSearch={console.log} />
        {laureates.map((laureate) => (
          <div
            key={laureate.id}
            className="mb-2 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {laureate.knownName?.en}
            </h2>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <strong>Gender:</strong> {laureate.gender}
            </p>
          </div>
        ))}
      </div>
      <div className='h-screen flex flex-col justify-center' >
        <Outlet />
      </div>
    </div>
  );
}

// data loader
export const laureatesLoader: LoaderFunction<LaureateDTO[]> = async ({}) => {
  const laureates = [
    {
      id: 'undefined',
      knownName: { en: 'knownName' },
      gender: 'gender',
      nobelPrizes: [],
    },
  ];
  return laureates;
};
