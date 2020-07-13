import { PrismaClient } from '@prisma/client';
import { lorem, date } from 'faker';

(async () => {
  const db = new PrismaClient();
  await db.connect();

  for (let i = 0; i < 10; i++) {
    const checked = Math.random() > 0.5;
    await db.todos.create({
      data: {
        title: lorem.words(3),
        description: lorem.paragraph(),
        checked,
        checkedAt: checked ? date.past() : null,
      },
    });
  }

  await db.disconnect();
})().finally(() => console.log('Done'));
