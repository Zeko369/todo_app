import React, { useRef, useState } from 'react';
import {
  Stack,
  Heading,
  Box,
  Flex,
  Input,
  Textarea,
  Button,
  Text,
  IconButton,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import capitalize from '../../../helpers';
import { Comment } from '../ts/todo';
import useToggle from '../../../hooks/useToggle';
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../../generated/graphql';
import { refetchTodo } from './Todo';

interface CommentsProps {
  comments: Comment[];
  todoId: number;
}

interface CommentFormData {
  title: string;
  content?: string;
}

export const Comments: React.FC<CommentsProps> = ({ comments, todoId }) => {
  const [updateId, setUpdateId] = useState<number>(-1);

  const [showForm, , setShowForm] = useToggle();
  const { register, watch, handleSubmit, reset, setValue } = useForm<CommentFormData>();
  const title = watch('title');
  const titleRef = useRef<HTMLInputElement | null>(null);

  const [addComment] = useAddCommentMutation(refetchTodo(todoId));
  const [updateComment] = useUpdateCommentMutation(refetchTodo(todoId));
  const [deleteComment] = useDeleteCommentMutation(refetchTodo(todoId));

  const onUpdate = (comment: Comment) => () => {
    if (updateId === comment.id) {
      setUpdateId(-1);
      reset();
      setShowForm(false);
      return;
    }

    setUpdateId(comment.id);
    setShowForm(true);

    setValue('title', comment.title);
    setTimeout(() => {
      setValue('content', comment.content || '');
    }, 100);

    if (titleRef.current) {
      titleRef.current.focus();
    }
  };

  const onDelete = (id: number) => async () => {
    await deleteComment({
      variables: { id },
    });
  };

  const onSubmit = async (data: CommentFormData) => {
    if (updateId === -1) {
      await addComment({ variables: { todoId, ...data } });
    } else {
      await updateComment({ variables: { id: updateId, ...data } });
      setUpdateId(-1);
    }

    reset();
    setShowForm(false);
  };

  return (
    <Stack>
      <Heading size="sm">Comments: </Heading>
      {comments.length === 0 ? (
        <Text>No comments</Text>
      ) : (
        <Stack>
          {comments.map((comment) => (
            <Flex
              justify="space-between"
              pos="relative"
              key={comment.id}
              p="2"
              shadow="md"
              borderWidth="1px"
              bg={updateId === comment.id ? 'green.100' : undefined}
            >
              <Box mr="4" w="100%">
                <Flex justify="space-between">
                  <Text fontWeight="bold">{comment.title}</Text>
                  <Text>
                    {`${new Date(comment.createdAt).toLocaleString()} by
                          ${capitalize(comment.user.username)}`}
                  </Text>
                </Flex>
                <Text>{comment.content}</Text>
              </Box>
              <Stack>
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon="delete"
                  variantColor="red"
                  aria-label="Delete"
                  onClick={onDelete(comment.id)}
                />
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon="edit"
                  variantColor="green"
                  aria-label="Update"
                  onClick={onUpdate(comment)}
                />
              </Stack>
            </Flex>
          ))}
        </Stack>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={2} shadow="md" borderWidth="1px">
          <Heading size="sm">{updateId !== -1 ? 'Update ' : 'Add new '}comment</Heading>
          <Input
            name="title"
            ref={(ref: HTMLInputElement) => {
              titleRef.current = ref;
              register(ref, { required: true });
            }}
            isRequired
            onClick={() => !showForm && setShowForm(true)}
            onBlur={() => title.trim().length === 0 && setShowForm(false)}
          />
          {showForm && (
            <Stack>
              <Textarea name="content" ref={register()} />
              <Flex justifyContent="flex-end">
                <Button variantColor="green" type="submit">
                  {updateId === -1 ? 'Comment' : 'Update'}
                </Button>
              </Flex>
            </Stack>
          )}
        </Stack>
      </form>
    </Stack>
  );
};
