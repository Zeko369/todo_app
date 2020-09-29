import React from 'react';
import { Global, css } from '@emotion/core';
import { githubDark, githubLight } from './prism';
import { useColorMode, useTheme } from '@chakra-ui/core';

export const GlobalStyles = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Global
      styles={css`
        html,
        body,
        #__next {
          min-height: 100vh;
        }

        ${colorMode === 'dark' ? githubDark : githubLight}

        .remark-code-title {
          padding: 6px 12px;

          background-color: ${theme.colors.blue['400']};
          color: white;
          font-size: 1em;
          font-weight: bold;

          border-top-left-radius: 6px;
          border-top-right-radius: 6px;

          + code[class*='language-'],
          + pre[class*='language-'] {
            margin-top: 0;

            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
        }
      `}
    />
  );
};
