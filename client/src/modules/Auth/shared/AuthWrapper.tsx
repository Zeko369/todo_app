import React from 'react';
import { Heading, Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useMeQuery } from '../../../generated/graphql';
import { LinkButton } from 'chakra-next-link';

export const AuthWrapper: React.FC = ({ children }) => {
  const { loading, error, data } = useMeQuery();
  const router = useRouter();

  const invalidToken = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  if (loading) {
    return <Spinner />;
  }

  if (data?.me) {
    return <>{children}</>;
  }

  switch (error?.message || '') {
    case 'INVALID_TOKEN':
    case 'TOKEN_MISSING':
      invalidToken();
      return null;
    default:
      return (
        <Stack justifyContent="center" p="10">
          <Heading>We're sorry, but an error occurred while logging you in</Heading>;
          <LinkButton href="/auth/login">Login</LinkButton>
        </Stack>
      );
  }
};
