import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

(async () => {
  const todos = await client.todos.findMany();
  console.log(todos);
})().finally(client.disconnect);
