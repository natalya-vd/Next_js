import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import Router from 'next/router';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';

import '../styles/globals.css';

Router.events.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined') {
    ym('hit', url);
  }
});

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return <>
    <Head>
      <title>MyTop - приложение</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
      <meta property='og:local' content="ru_RU" />
    </Head>
    <YMInitializer
      accounts={[]}
      options={{ webvisor: true, defer: true }}
      version="2"
    />
    <Component {...pageProps} />
  </>;
}

export default MyApp;
