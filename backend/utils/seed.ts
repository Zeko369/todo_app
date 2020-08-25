import { PrismaClient, Todo } from '@prisma/client';
import { lorem, date } from 'faker';

(async () => {
  const db = new PrismaClient();
  await db.$connect();

  const tags: number[] = [];
  for (let i = 0; i < 3; i++) {
    const tag = await db.tag.create({ data: { text: lorem.word() } });
    tags.push(tag.id);
  }

  const lists: number[] = [];
  for (let i = 0; i < 3; i++) {
    const list = await db.list.create({
      data: {
        title: lorem.words(3),
      },
    });

    lists.push(list.id);
  }

  const random = <T>(arr: T[]): T => {
    return arr[Math.floor(arr.length * Math.random())];
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
        list: { connect: { id: random(lists) } },
        tags: { connect: { id: random(tags) } },
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
