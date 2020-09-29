import React from 'react';
import { Global, css } from '@emotion/core';

const globalStyles = css`
  html,
  body,
  #__next {
    min-height: 100vh;
  }
`;

export const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};
