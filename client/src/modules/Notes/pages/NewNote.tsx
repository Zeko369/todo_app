import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useCreateNoteMutation } from '../../../generated/graphql';
import { NOTES_QUERY } from '../graphql/queries';
import { NoteForm } from '../components/NoteForm';

export const NewNotePage: NextPage = () => {
  const router = useRouter();
  const [createNote] = useCreateNoteMutation({ refetchQueries: [{ query: NOTES_QUERY }] });

  const onClick = async (title: string, code: string) => {
    if (!code) return;

    const res = await createNote({ variables: { title, description: code } });
    const id = res.data?.createOneTodo.id;

    if (id) {
      router.push('/notes/[id]', `/notes/${res.data?.createOneTodo.id}`);
    }
  };

  return <NoteForm onClick={onClick} />;
};
