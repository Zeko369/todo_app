import React, { forwardRef } from 'react';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/core';
import { ForwardRefRenderFunction } from 'react';
import capitalize from '../helpers';

interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
  name: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const { name, isInvalid, isRequired, error, label, placeholder } = props;

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label || capitalize(name)}</FormLabel>
      <ChakraInput {...props} id={name} ref={ref} placeholder={placeholder || capitalize(name)} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default forwardRef(Input);
