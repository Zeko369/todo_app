import React, { forwardRef } from 'react';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormControlProps,
} from '@chakra-ui/react';
import { ForwardRefRenderFunction } from 'react';
import capitalize from '../helpers';

interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
  name: string;
  outerProps?: FormControlProps;
  noLabel?: boolean;
}

const resoleType = (name: string): string | undefined => {
  switch (name.toLowerCase()) {
    case 'email':
      return 'email';
    case 'password':
      return 'password';
    case 'confirm password':
      return 'confirm_password';
    default:
      return undefined;
  }
};

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const {
    name,
    isInvalid,
    noLabel,
    isRequired,
    error,
    label,
    placeholder,
    outerProps,
    ...rest
  } = props;

  return (
    <FormControl isInvalid={isInvalid || !!error} isRequired={isRequired} {...outerProps}>
      {!noLabel && <FormLabel htmlFor={name}>{label || capitalize(name)}</FormLabel>}
      <ChakraInput
        type={resoleType(name)}
        id={name}
        name={name}
        ref={ref}
        placeholder={placeholder || capitalize(name)}
        {...rest}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default forwardRef(Input);
