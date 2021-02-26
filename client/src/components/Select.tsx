import React, { forwardRef } from 'react';
import { Select as BaseSelect, useColorMode, SelectProps, Theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

const StyledSelect = styled(BaseSelect)<{ dark: boolean }>`
  option {
    background-color: ${({ theme, dark }) =>
      dark ? (theme as Theme).colors.gray[700] : 'inherit'};
  }
`;

export const Select: React.FC<SelectProps & { ref?: React.Ref<HTMLSelectElement> }> = forwardRef<
  HTMLSelectElement,
  SelectProps
>((props, ref) => {
  const { colorMode } = useColorMode();
  return <StyledSelect dark={colorMode === 'dark'} {...props} ref={ref} />;
});
