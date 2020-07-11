import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

const fetcher = (url: RequestInfo, args?: RequestInit) =>
  fetch(url, args).then((res) => res.json());

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        suspense: true,
      }}
    >
      <ThemeProvider>
        <Head>
          <title>Todo app</title>
        </Head>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
};

export default MyApp;
