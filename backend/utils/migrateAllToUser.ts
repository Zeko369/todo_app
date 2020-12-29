import { PrismaClient } from '@prisma/client';

const keys = ['todo', 'list', 'comment', 'tag', 'task'] as const;

const update = async (db: PrismaClient, key: typeof keys[number]) => {
  // @ts-ignore
  const items = await db[key].findMany();
  await Promise.all(
    items.map((item: any) => {
      // @ts-ignore
      db[key].update({ data: { user: { connect: { id: 1 } } }, where: { id: item.id } });
    })
  );
};

(async () => {
  const db = new PrismaClient();
  await db.$connect();

  for (const key of keys) {
    await update(db, key);
  }

  await db.$disconnect();
})();
