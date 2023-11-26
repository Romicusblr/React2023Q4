import { Layout } from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { wrapper } from '@/app/store';

export function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
