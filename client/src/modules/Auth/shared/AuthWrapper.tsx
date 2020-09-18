import { Heading, Spinner } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useMeQuery } from '../../../generated/graphql';

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
      return <Heading>We're sorry, but an error occurred while logging you in</Heading>;
  }
};
