import React, { useRef, useState } from 'react';
import { Stack, Flex, Button, FormControl, FormLabel, Spinner, Box } from '@chakra-ui/react';
import Nav from '../../../components/Nav';
import Editor, { EditorFunctions } from './Editor';
import Input from '../../../components/Input';

interface NoteForm {
  onClick: (title: string, code: string) => Promise<void>;
  initValues?: {
    title: string;
    code?: string;
  } | null;
  saving?: boolean;
}

const initCode = 'Hello';

export const NoteForm: React.FC<NoteForm> = (props) => {
  const ref = useRef<EditorFunctions>(null);
  const [title, setTitle] = useState(props.initValues?.title || '');

  const onClick = async () => {
    const code = ref.current?.getCode();

    if (code) {
      await props.onClick(title, code);
    }
  };

  return (
    <Stack w="90%" maxW="1000px" m="0 auto" h="100vh">
      <Nav />
      {props.children}
      {props.initValues === null ? (
        <Spinner />
      ) : (
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          <Flex justify="space-between" alignItems="flex-end">
            <Input
              name="Name"
              outerProps={{ w: '100%', mr: 2 }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              isRequired
              value={title}
            />
            <Button onClick={onClick} colorScheme="green" isLoading={props.saving}>
              Save
            </Button>
          </Flex>
        </Box>
      )}

      {props.initValues === null ? (
        <Spinner />
      ) : (
        <FormControl isRequired>
          <FormLabel>Content</FormLabel>
          <Editor ref={ref} initCode={props.initValues?.code || initCode} />
        </FormControl>
      )}
    </Stack>
  );
};
