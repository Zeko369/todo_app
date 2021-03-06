import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  HStack,
  Spinner,
  Button,
  UseDisclosureReturn,
  VStack,
} from '@chakra-ui/react';
import {
  useDisconnectListWithUserMutation,
  useListQuery,
  useShareListWithUserMutation,
  useUsersQuery,
} from '../../../generated/graphql';
import { refetch } from '../pages/[id]/edit';

type useQueryResponse = typeof useListQuery;

interface ShareListModalProps {
  modal: UseDisclosureReturn;
  listData?: ReturnType<useQueryResponse>['data'];
}

interface UserListProps {
  users?: { id: number; username: string }[];
  onClick: (id: number) => () => Promise<any>;
  title: string;
  buttonText: string;
}

const UserList: React.FC<UserListProps> = ({ users, title, onClick, buttonText }) => {
  return (
    <VStack mb="2" spacing="2">
      <Heading size="sm">{title}</Heading>
      <VStack spacing="1">
        {users && users.length > 0 ? (
          users.map((user) => (
            <HStack key={user.id}>
              <Text>{user.username}</Text>
              <Button size="xs" onClick={onClick(user.id)}>
                {buttonText}
              </Button>
            </HStack>
          ))
        ) : (
          <Text color="red.500">No one</Text>
        )}
      </VStack>
    </VStack>
  );
};

export const ShareListModal: React.FC<ShareListModalProps> = ({ modal, listData }) => {
  const listId = listData?.list?.id || -1;

  const { data, loading, error } = useUsersQuery();
  const [shareWithUser] = useShareListWithUserMutation(refetch(listId));
  const [disconnectFromUser] = useDisconnectListWithUserMutation(refetch(listId));

  const onShare = (id: number) => async () => {
    await shareWithUser({ variables: { userId: id, listId } });
  };

  const onDisconnect = (id: number) => async () => {
    await disconnectFromUser({ variables: { userId: id, listId } });
  };

  return (
    <Modal {...modal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Share list with others</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {listData?.list ? (
            <VStack spacing="3">
              <UserList
                title="List is already shared with"
                onClick={onDisconnect}
                users={listData.list.sharedWith}
                buttonText="Remove"
              />
              {loading ? (
                <Spinner />
              ) : error ? (
                <Text>{error}</Text>
              ) : (
                <UserList
                  title="Share list with"
                  onClick={onShare}
                  users={data?.users.filter(
                    (a) =>
                      !(listData.list?.sharedWith || []).find((b) => a.id === b.id) &&
                      a.id !== listData.list?.user?.id
                  )}
                  buttonText="Add"
                />
              )}
            </VStack>
          ) : (
            <Heading color="red.500">Error loading list</Heading>
          )}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
