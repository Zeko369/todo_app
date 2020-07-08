import React from 'react';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

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
      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default MyApp;
