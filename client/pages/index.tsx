import React, { Suspense } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import config from '../config';
import { Todo } from '../ts/api';

const isServer = typeof window === 'undefined';

const Todos: React.FC = () => {
  const { data } = useSWR<Todo[]>(config.apiUrl('/todos'));

  return data ? (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  ) : (
    <h1>No data :(</h1>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <h1>Hello world</h1>
      {!isServer && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Todos />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
