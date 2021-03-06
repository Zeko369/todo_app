import React, { useMemo } from 'react';
import { LinkButton } from 'chakra-next-link';
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
  useDisclosure,
  List,
  ListItem,
  TagRightIcon,
  HStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

import {
  useListQuery,
  useCheckTodoMutation,
  Tag as TagDB,
  useCheckTaskMutation,
} from '../../../../generated/graphql';
import { getId } from '../../../../helpers/getId';
import Nav from '../../../../components/Nav';
import useSaveToggle from '../../../../hooks/useSaveToggle';
import { LIST_QUERY } from '../../graphql/queries';
import { useSelectTags } from '../../../../hooks/useSelectTags';
import { ShareListModal } from '../../components/ShareListModal';
import { useMe } from '../../../Todos/hooks/useListsQuery';

type Tag = Pick<TagDB, 'id' | 'text' | 'color'>;

const refetch = (id: number) => ({
  refetchQueries: [{ query: LIST_QUERY, variables: { id } }],
});

export const ListPage: NextPage = () => {
  const router = useRouter();
  const id = getId(router.query) || -1;

  const modal = useDisclosure();
  const me = useMe();
  const { loading, error, data } = useListQuery({ variables: { id } });

  const [checkTask] = useCheckTaskMutation(refetch(id));
  const [checkTodo] = useCheckTodoMutation(refetch(id));

  const [showAll, toggleAll] = useSaveToggle('lists:all');
  const [showTasks, toggleTasks] = useSaveToggle('lists:tasks');

  const [selectTag, tagIds] = useSelectTags({ href: '/lists/[id]', as: `/lists/${id}` });

  const toggleTask = (taskId: number) => async () => {
    await checkTask({ variables: { id: taskId } });
  };

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

  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <ShareListModal modal={modal} listData={data} />
      <Nav />
      <HStack spacing={3}>
        <Heading>List: {data?.list?.title}</Heading>
        <LinkButton href={`/lists/${id}/edit`} colorScheme="green">
          Edit
        </LinkButton>
        <Button onClick={modal.onOpen}>Share</Button>
        <Button onClick={toggleAll}>{!showAll ? 'Only todo' : 'All'}</Button>
        <Button onClick={toggleTasks}>{!showTasks ? '+' : '-'}tasks</Button>
      </HStack>
      {loading ? (
        <Spinner />
      ) : error || !data || !data.list ? (
        <Heading size="xl">{error?.message}</Heading>
      ) : (
        <>
          {!me ? (
            <Spinner />
          ) : (
            <Stack>
              <Heading size="lg">
                Owner: {data?.list.user?.id === me.id ? 'Me' : data?.list.user?.username}
              </Heading>
              {data?.list.sharedWith.length > 0 && (
                <Stack>
                  <Heading size="md">Shared list</Heading>
                  <List styleType="disc">
                    {data?.list.sharedWith.map((user) => (
                      <ListItem key={user.id}>{user.username}</ListItem>
                    ))}
                  </List>
                </Stack>
              )}
            </Stack>
          )}
          <Heading size="lg">
            Done: {data.list.todos.filter((todo) => todo.checked).length} / {data.list.todos.length}
          </Heading>
          {tags.length > 0 && (
            <Box>
              <Heading size="md" mb={2}>
                Filter by tag:
              </Heading>
              <HStack spacing={2}>
                {tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    size="sm"
                    colorScheme={tag.color || 'blue'}
                    variant={tagIds.includes(tag.id) ? 'solid' : 'subtle'}
                    as="button"
                    onClick={selectTag(tag.id)}
                  >
                    <Flex alignItems="center">
                      <TagLabel>{tag.text}</TagLabel>
                    </Flex>
                  </Tag>
                ))}
                <Tag size="sm" colorScheme="blue" as="button" onClick={selectTag(-1)}>
                  <Flex alignItems="center">
                    <TagLabel>NONE</TagLabel>
                    <TagRightIcon as={CloseIcon} size="12px" />
                  </Flex>
                </Tag>
              </HStack>
            </Box>
          )}
          <Stack mt={3}>
            {data.list?.todos
              .filter((todo) => showAll || !todo.checked)
              .map((todo) => (
                <Box key={todo.id}>
                  <HStack spacing={2} alignItems="center">
                    <Checkbox isChecked={todo.checked} onChange={check(todo.id)}>
                      <Heading size="sm">{todo.title}</Heading>
                    </Checkbox>
                    {todo.tasks.length > 0 && (
                      <Heading size="xs" color="gray.600">
                        {todo.tasks.filter((task) => task.checkedAt).length} / {todo.tasks.length}
                      </Heading>
                    )}
                    {todo.tags.map((tag) => (
                      <Tag
                        key={tag.id}
                        size="sm"
                        colorScheme={tag.color || 'blue'}
                        variant={tagIds.includes(tag.id) ? 'solid' : 'subtle'}
                      >
                        <Flex alignItems="center">
                          <TagLabel>{tag.text}</TagLabel>
                        </Flex>
                      </Tag>
                    ))}
                  </HStack>
                  {showTasks && todo.tasks.length > 0 && (
                    <Stack pl={6}>
                      {todo.tasks.map((task) => (
                        <Checkbox
                          key={task.id}
                          isChecked={Boolean(task.checkedAt)}
                          onChange={toggleTask(task.id)}
                        >
                          <Text textDecoration={task.checkedAt ? 'line-through' : ''}>
                            {task.title}
                          </Text>
                        </Checkbox>
                      ))}
                    </Stack>
                  )}
                </Box>
              ))}
          </Stack>
        </>
      )}
    </Box>
  );
};
