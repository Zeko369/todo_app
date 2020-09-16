import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button, Heading, Stack } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Input from '../../../components/Input';
import { Card } from '../components/Card';
import { useRegisterMutation } from '../../../generated/graphql';
import Link from '../../../components/Link';

interface FormData {
  username: string;
  email: string;
  password: string;
}

export const RegisterPage: NextPage = () => {
  const router = useRouter();
  const [otherError, setOtherError] = useState<boolean>(false);

  const { register, handleSubmit, formState, errors, setError, clearErrors } = useForm<FormData>();
  const [registerUser] = useRegisterMutation();

  const onSubmit = async (data: FormData) => {
    try {
      clearErrors();
      otherError && setOtherError(false);

      const response = await registerUser({ variables: { ...data } });
      const token = response.data?.register?.token;

      if (token) {
        localStorage.setItem('token', token);
        // router.push('/');
      }
    } catch (err) {
      switch (err.message) {
        case 'WRONG_EMAIL':
          return setError('email', { message: "Can't find user with this email" });
        case 'WRONG_PASSWORD':
          return setError('password', { message: 'Wrong password' });
        default:
          console.error(err.message);
          return setOtherError(true);
      }
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="3">
          <Heading size="lg">Register</Heading>

          {otherError && (
            <Heading size="md" color="red.400">
              Error :(
            </Heading>
          )}

          <Input
            name="username"
            ref={register({ required: true })}
            error={errors.username?.message}
            isRequired
            outerProps={{ mt: '3' }}
          />
          <Input
            name="email"
            ref={register({ required: true })}
            error={errors.email?.message}
            isRequired
          />
          <Input
            name="password"
            ref={register({ required: true })}
            error={errors.password?.message}
            isRequired
          />
          <Link href="/auth/login">Login</Link>
          <Button type="submit" variantColor="blue" isLoading={formState.isSubmitting}>
            Register
          </Button>
        </Stack>
      </form>
    </Card>
  );
};
