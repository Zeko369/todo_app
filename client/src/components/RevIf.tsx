import React from 'react';
import { Stack } from '@chakra-ui/core';

export const RevIf: React.FC<{ cond: boolean; one: React.ReactNode }> = ({
  children,
  cond,
  one,
}) => {
  if (cond) {
    return (
      <Stack spacing={3} isInline={!cond}>
        {one}
        {children}
      </Stack>
    );
  }

  return (
    <Stack spacing={3} isInline={!cond}>
      {children}
      {one}
    </Stack>
  );
};
