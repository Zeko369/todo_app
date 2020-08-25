import React from 'react';
import { NextPage } from 'next';
import { Box } from '@chakra-ui/core';
import Nav from '../../components/Nav';
import { LinkButton } from '../../components/Link';

const Tags: NextPage = () => {
  return (
    <Box w="90%" maxW="1000px" m="0 auto">
      <Nav>
        <LinkButton href="/lists/new" variantColor="blue">
          New
        </LinkButton>
      </Nav>
    </Box>
  );
};

export default Tags;
