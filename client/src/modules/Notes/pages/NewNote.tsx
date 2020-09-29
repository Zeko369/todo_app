import React, { forwardRef, useRef } from 'react';
import { NextPage } from 'next';
import { Button, Flex } from '@chakra-ui/core';
import Editor, { EditorFunctions } from '../components/Editor';

const initCode = '# Hello world\n\n- foo\n- bar\n\n```javascript\nconsole.log(`Hello world`);\n```';

export const NewNotePage: NextPage = () => {
  const ref = useRef<EditorFunctions>(null);

  const onClick = () => {
    const code = ref.current?.getCode();
    console.log(code);
  };

  return (
    <Flex minH="100vh" h="100vh" flexDir="column">
      <Button onClick={onClick}>Click</Button>
      <Editor ref={ref} initCode={initCode} language="markdown" />
    </Flex>
  );
};
