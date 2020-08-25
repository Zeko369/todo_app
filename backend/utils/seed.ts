import { PrismaClient, Todo } from '@prisma/client';
import { lorem, date } from 'faker';

(async () => {
  const db = new PrismaClient();
  await db.$connect();

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

  const ids: number[] = [];
  let firstId: number = 1;

  for (let i = 0; i < 10; i++) {
    const checked = Math.random() > 0.5;
    const todo = await db.todo.create({
      data: {
        title: lorem.words(3),
        description: lorem.paragraph(),
        checked,
        checkedAt: checked ? date.past() : null,
        list: { connect: { id: randomListId() } },
      },
    });

    if (i === 0) {
      firstId = todo.id;
    }

    ids.push(todo.id);
  }

  const requirements = ids.slice(1, 3);

  await db.todo.update({
    where: { id: firstId },
    data: { requires: { connect: requirements.map((id) => ({ id })) } },
  });

  await db.$disconnect();
})().finally(() => console.log('Done'));
