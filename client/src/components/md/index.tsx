import React from 'react';
import { Code, Divider, Heading, Image, ListItem, List, Text, Kbd } from '@chakra-ui/core';
import { Link } from 'chakra-next-link';
import { BaseComponents } from './types';

type Components = BaseComponents<'kbd'>;

export const components: Components = {
  a: (props) => <Link {...props} />,
  blockquote: (props) => <blockquote {...props} />,
  code: (props) => <code {...props} />,
  pre: (props) => <pre {...props} />,
  inlineCode: (props) => <Code color="green.500" {...props} />,
  del: (props) => <Text as="del" textDecor="line-through" {...props} />,
  em: (props) => <Text as="em" fontStyle="italic" {...props} />,
  kbd: (props) => <Kbd {...props} />,
  h1: (props) => <Heading as="h1" size="2xl" {...props} />,
  h2: (props) => <Heading as="h2" size="xl" {...props} />,
  h3: (props) => <Heading as="h3" size="lg" {...props} />,
  h4: (props) => <Heading as="h4" size="md" {...props} />,
  h5: (props) => <Heading as="h5" size="sm" {...props} />,
  h6: (props) => <Heading as="h6" fontSize="xs" {...props} />,
  hr: (props) => <Divider {...props} />,
  img: (props) => <Image {...props} />,
  ul: (props) => <List as="ul" {...props} />,
  ol: (props) => <List as="ol" {...props} />,
  li: (props) => <ListItem {...props} />,
  p: (props) => <Text {...props} />,
  strong: (props) => <Text as="strong" fontWeight="bold" {...props} />,
  table: (props) => <table {...props} />,
  tbody: (props) => <tbody {...props} />,
  thead: (props) => <thead {...props} />,
  tr: (props) => <tr {...props} />,
  td: (props) => <td {...props} />,
  thematicBreak: (props) => <Divider color="red" {...props} />,
};
