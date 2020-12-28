import React, { forwardRef } from 'react';
import { Select as BaseSelect, useColorMode, SelectProps, DefaultTheme } from '@chakra-ui/core';
import styled from '@emotion/styled';

const StyledSelect = styled(BaseSelect)<{ dark: boolean }>`
  option {
    background-color: ${({ dark, theme }) =>
      dark ? (theme as DefaultTheme).colors.gray[700] : 'inherit'};
  }
`;

export const Select: React.FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { colorMode } = useColorMode();

    return <StyledSelect dark={colorMode === 'dark'} {...props} ref={ref} />;
  }
);
