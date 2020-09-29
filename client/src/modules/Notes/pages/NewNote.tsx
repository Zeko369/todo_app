import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Stack, Button, Heading, Flex, FormControl, FormLabel } from '@chakra-ui/core';
import Editor, { EditorFunctions } from '../components/Editor';
import Input from '../../../components/Input';
import Nav from '../../../components/Nav';
import { useCreateNoteMutation } from '../../../generated/graphql';
import { NOTES_QUERY } from '../graphql/queries';

const initCode = '# Hello world\n\n- foo\n- bar\n\n```javascript\nconsole.log(`Hello world`);\n```';

export const NewNotePage: NextPage = () => {
  const router = useRouter();

  const ref = useRef<EditorFunctions>(null);
  const [title, setTitle] = useState('');
  const [createNote] = useCreateNoteMutation({ refetchQueries: [{ query: NOTES_QUERY }] });

  const onClick = async () => {
    const code = ref.current?.getCode();

    if (!code) return;

    const res = await createNote({ variables: { title, description: code } });
    const id = res.data?.createOneTodo.id;

    if (id) {
      router.push('/notes/[id]', `/notes/${res.data?.createOneTodo.id}`);
    }
  };

  return (
    <Stack w="90%" maxW="1000px" m="0 auto" h="100vh">
      <Nav />
      <Heading>New note</Heading>
      <Flex justify="space-between" alignItems="flex-end">
        <Input
          name="Name"
          outerProps={{ w: '100%', mr: 2 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          value={title}
        />
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
