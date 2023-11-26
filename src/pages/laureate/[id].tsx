import { getLaureateDetails, getRunningQueriesThunk } from '@/api/laureates';
import { wrapper } from '@/app/store';
import { LaureateDetails, Laureates } from '@/components/Laureates';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id as string;
    if (isNaN(parseInt(id))) {
      store.dispatch(getLaureateDetails.initiate(id));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default function LaureateDetailsPage() {
  return (
    <>
      <Laureates />
      <LaureateDetails />
    </>
  );
}
