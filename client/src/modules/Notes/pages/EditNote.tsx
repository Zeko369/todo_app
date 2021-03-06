import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Heading } from '@chakra-ui/react';
import { NOTES_QUERY, NOTE_QUERY } from '../graphql/queries';
import { NoteForm } from '../components/NoteForm';
import { getId } from '../../../helpers/getId';
import { useNoteQuery, useUpdateNoteMutation } from '../../../generated/graphql';

export const EditNotePage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;

  const [saving, setSaving] = useState<boolean>(false);
  const { loading, error, data } = useNoteQuery({ variables: { id } });
  const [updateNote] = useUpdateNoteMutation({
    refetchQueries: [{ query: NOTES_QUERY }, { query: NOTE_QUERY, variables: { id } }],
  });

  if (!id) {
    return <h1>No id</h1>;
  }

  const onClick = async (title: string, code: string) => {
    setSaving(true);
    await updateNote({ variables: { id, title, description: code } });
    setSaving(false);
  };

  return (
    <NoteForm
      onClick={onClick}
      initValues={
        !loading && !error && data?.todo
          ? { title: data.todo.title || '', code: data.todo.description || undefined }
          : null
      }
      saving={saving}
    >
      <Heading>Edit note</Heading>
    </NoteForm>
  );
};
