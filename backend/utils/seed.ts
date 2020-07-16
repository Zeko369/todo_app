import { PrismaClient } from '@prisma/client';
import { lorem, date } from 'faker';

(async () => {
  const db = new PrismaClient();
  await db.connect();

  const lists: number[] = [];

  for (let i = 0; i < 3; i++) {
    const list = await db.list.create({
      data: {
        title: lorem.words(3),
      },
    });

    lists.push(list.id);
  }

  const randomListId = () => {
    return lists[Math.floor(lists.length * Math.random())];
  };

  for (let i = 0; i < 10; i++) {
    const checked = Math.random() > 0.5;
    await db.todo.create({
      data: {
        title: lorem.words(3),
        description: lorem.paragraph(),
        checked,
        checkedAt: checked ? date.past() : null,
        list: { connect: { id: randomListId() } },
      },
    });
  }

  await db.disconnect();
})().finally(() => console.log('Done'));
