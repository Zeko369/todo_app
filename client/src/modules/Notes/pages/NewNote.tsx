import React, { useRef } from 'react';
import { NextPage } from 'next';
import { Stack, Button, Heading, Flex, FormControl, FormLabel } from '@chakra-ui/core';
import Editor, { EditorFunctions } from '../components/Editor';
import Input from '../../../components/Input';
import Nav from '../../../components/Nav';

const initCode = '# Hello world\n\n- foo\n- bar\n\n```javascript\nconsole.log(`Hello world`);\n```';

export const NewNotePage: NextPage = () => {
  const ref = useRef<EditorFunctions>(null);

  const onClick = () => {
    const code = ref.current?.getCode();
    console.log(code);
  };

  return (
    <Stack w="90%" maxW="1000px" m="0 auto" h="100vh">
      <Nav />
      <Heading>New note</Heading>
      <Flex justify="space-between" alignItems="flex-end">
        <Input name="Name" outerProps={{ w: '100%', mr: 2 }} />
        <Button onClick={onClick} variantColor="green">
          Save
        </Button>
      </Flex>

      <FormControl isRequired>
        <FormLabel>Content</FormLabel>
        <Editor ref={ref} initCode={initCode} language="markdown" />
      </FormControl>
    </Stack>
  );
};
