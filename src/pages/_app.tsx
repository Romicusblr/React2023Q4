import '@/styles/globals.css';
import { Layout } from '@/components/Layout';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/app/store';

export function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default wrapper.withRedux(App);
