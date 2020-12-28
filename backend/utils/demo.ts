import { PrismaClient } from '@prisma/client';

(async () => {
  const db = new PrismaClient();
  await db.$connect();

  await db.list.update({
    where: {
      id: 4,
    },
    data: {
      sharedWith: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await db.$disconnect();
})();
