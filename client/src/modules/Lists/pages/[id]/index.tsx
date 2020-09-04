import React, { useMemo } from 'react';
import { NextPage } from 'next';
import {
  Heading,
  Spinner,
  Box,
  Tag,
  Flex,
  TagLabel,
  Checkbox,
  Stack,
  Text,
  Button,
  TagIcon,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { useListQuery, useCheckTodoMutation, Tag as TagDB } from '../../../../generated/graphql';
import { getId } from '../../../../helpers/getId';
import Nav from '../../../../components/Nav';
import { TODOS_QUERY } from '../../../Todos/graphql/queries';
import useSaveToggle from '../../../../hooks/useSaveToggle';
import { LinkButton } from '../../../../components/Link';

type Tag = Pick<TagDB, 'id' | 'text' | 'color'>;

const getTagIds = (tagIds: string | string[] | undefined): number[] => {
  if (tagIds && !Array.isArray(tagIds)) {
    return tagIds.split(',').map((id) => parseInt(id));
  }

  return [];
};

export const ListPage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;
  const tagIds: number[] = getTagIds(router.query.tags);

  const { loading, error, data } = useListQuery({ variables: { id } });
  const [checkTodo] = useCheckTodoMutation({
    refetchQueries: [{ query: TODOS_QUERY }],
  });

  const [showAll, toggleAll] = useSaveToggle('lists:all');

  const check = (id: number) => async () => {
    await checkTodo({ variables: { id } });
  };

  const tags = useMemo(() => {
    if (!loading && !error && data && data.list) {
      return data.list.todos.reduce((prev, todo) => {
        const all = [...prev, ...todo.tags];
        const out: Tag[] = [];

        for (let i = 0; i < all.length; i++) {
          if (!out.find((t) => t.id === all[i].id)) {
            out.push(all[i]);
          }
        }

        return out;
      }, [] as Tag[]);
    }

    return [];
  }, [loading, data, error]);

  const selectTag = (tagId: number) => () => {
    if (tagId === -1) {
      return router.replace('/lists/[id]', `/lists/${id}`);
    }

    const newTags = (tagIds.includes(tagId)
      ? tagIds.filter((a) => a !== tagId)
      : [...tagIds, tagId]
    ).join(',');

    router.replace(`/lists/[id]?tags=${newTags}`, `/lists/${id}?tags=${newTags}`);
  };

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav />
      <Stack spacing={3} isInline>
        <Heading>List: {data?.list?.title}</Heading>
        <Button onClick={toggleAll}>{!showAll ? 'Only todo' : 'All'}</Button>
        <LinkButton href="/lists/[id]/edit" as={`/lists/${id}/edit`} variantColor="green">
          Edit
        </LinkButton>
      </Stack>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Heading size="xl">Error :(</Heading>
      ) : (
        <>
          {tags.length > 0 && (
            <Box mb={5}>
              <Heading size="md" mb={2}>
                Filter by tag:
              </Heading>
              <Stack isInline spacing={2}>
                {tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    size="sm"
                    variantColor={tag.color || 'blue'}
                    variant={tagIds.includes(tag.id) ? 'solid' : 'subtle'}
                    as="button"
                    onClick={selectTag(tag.id)}
                  >
                    <Flex alignItems="center">
                      <TagLabel>{tag.text}</TagLabel>
                    </Flex>
                  </Tag>
                ))}
                <Tag size="sm" variantColor="blue" as="button" onClick={selectTag(-1)}>
                  <Flex alignItems="center">
                    <TagLabel>NONE</TagLabel>
                    <TagIcon icon="close" size="12px" />
                  </Flex>
                </Tag>
              </Stack>
            </Box>
          )}
          <Stack>
            {data.list?.todos
              .filter((todo) => showAll || !todo.checked)
              .map((todo) => (
                <Stack key={todo.id} isInline spacing={2} alignItems="center">
                  <Checkbox isChecked={todo.checked} onChange={check(todo.id)} />
                  <Text textDecoration={todo.checked ? 'line-through' : ''}>{todo.title}</Text>
                  {todo.tags.map((tag) => (
                    <Tag
                      key={tag.id}
                      size="sm"
                      variantColor={tag.color || 'blue'}
                      variant={tagIds.includes(tag.id) ? 'solid' : 'subtle'}
                    >
                      <Flex alignItems="center">
                        <TagLabel>{tag.text}</TagLabel>
                      </Flex>
                    </Tag>
                  ))}
                </Stack>
              ))}
          </Stack>
        </>
      )}
    </Box>
  );
};
