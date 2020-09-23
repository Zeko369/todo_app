import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button, Heading, Stack } from '@chakra-ui/core';
import { Link } from 'chakra-next-link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Input from '../../../components/Input';
import { AuthLayout } from '../components/AuthLayout';
import { useLoginMutation } from '../../../generated/graphql';

interface FormData {
  email: string;
  password: string;
}

export const LoginPage: NextPage = () => {
  const router = useRouter();
  const [otherError, setOtherError] = useState<boolean>(false);

  const { register, handleSubmit, formState, errors, setError, clearErrors } = useForm<FormData>();
  const [login] = useLoginMutation();

  const onSubmit = async (data: FormData) => {
    try {
      clearErrors();
      otherError && setOtherError(false);

      const response = await login({ variables: { ...data } });
      const token = response.data?.login?.token;

      if (token) {
        localStorage.setItem('token', token);
        router.push('/');
      }
    } catch (err) {
      switch (err.message) {
        case 'WRONG_EMAIL':
          return setError('email', { message: "Can't find user with this email" });
        case 'WRONG_PASSWORD':
          return setError('password', { message: 'Wrong password' });
        default:
          return setOtherError(true);
      }
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="3">
          <Heading size="lg">Login</Heading>

          {otherError && (
            <Heading size="md" color="red.600">
              Error :(
            </Heading>
          )}

          <Input
            name="email"
            ref={register({ required: true })}
            error={errors.email?.message}
            isRequired
            outerProps={{ mt: '3' }}
          />
          <Input
            name="password"
            ref={register({ required: true })}
            error={errors.password?.message}
            isRequired
          />
          <Link href="/auth/register">Register</Link>
          <Button type="submit" variantColor="blue" isLoading={formState.isSubmitting}>
            Login
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
};
