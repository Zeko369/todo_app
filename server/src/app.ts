import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { db } from './db';
import { resolvers } from './controllers';
import { UserIDMiddleware, UserMiddleware } from './middleware/Users';
import { ExpCtx } from './ts/express';
import { GQLCtx } from './ts/gql';

async function main() {
  await db.$connect();
  const app = express();

  app.use(cors({ credentials: true, origin: true }));

  const schema = await buildSchema({ resolvers, validate: false });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }: ExpCtx): GQLCtx => ({ req, res, user: req.user, db }),
  });

  app.use(cookieParser());
  app.use(UserIDMiddleware);
  app.use(UserMiddleware);

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('Listening on http://localhost:4000');
  });
}

main();
