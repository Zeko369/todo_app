import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GlobalStyles } from '../styles/GlobalStyles';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Head>
          <title>Todo app</title>
        </Head>
        <ColorModeProvider>
          <GlobalStyles />
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
