import React from 'react';
import { useGetLaureateDetailsQuery } from '@/api/laureates';
import { Loading } from '@/components/Loading';
import { useRouter } from 'next/router'

export default function LaureateDetails() {
  const router = useRouter()
  const { id } = router.query;
  const res = useGetLaureateDetailsQuery(id as string);

  const { data, error, isLoading, isSuccess, isError } = res;
  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (
      e.target instanceof HTMLElement &&
      (e.target.id === 'modalBackground' ||
        e.target.id === 'modalBackgroundCloseButton')
    ) {
      router.back();
    }
  };

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    const laureate = data;
    content = (
      <>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {laureate.knownName?.en}
        </h2>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <strong>Gender:</strong> {laureate.gender}
        </p>
        <p>
          <strong>Birth Date:</strong> {laureate?.birth?.date}
        </p>
        <p>
          <strong>Birth Place:</strong> {laureate?.birth?.place?.city?.en},{' '}
          {laureate?.birth?.place?.country?.en}
        </p>

        <h3 className="mt-2 text-xl font-bold">Nobel Prizes:</h3>
        {laureate?.nobelPrizes?.map((prize, index) => (
          <div key={index}>
            <p>
              <strong>Award Year:</strong> {prize.awardYear}
            </p>
            <p>
              <strong>Category:</strong> {prize.category?.en}
            </p>
            <p>
              <strong>Motivation:</strong> {prize.motivation?.en}
            </p>
          </div>
        ))}
        <button id="modalBackgroundCloseButton" className="mt-2 btn btn-submit">
          Close
        </button>
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <div
      id="modalBackground"
      className="flex justify-end z-1 fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div className="w-1/3 block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {content}
      </div>
    </div>
  );
}
