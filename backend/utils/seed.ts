import { PrismaClient, TaskCreateArgs } from '@prisma/client';
import { hash } from 'bcryptjs';
import { lorem, date } from 'faker';

import { random, randomMany, repeat } from './helpers';

(async () => {
  const db = new PrismaClient();
  await db.$connect();

  const password = await hash('foobar', 12);
  const admin = await db.user.create({
    data: { email: 'foo@bar.com', password, username: 'foo', role: 'ADMIN' },
  });
  await db.user.create({
    data: { email: 'bar@bar.com', password, username: 'bar', role: 'USER' },
  });

  const tags = await Promise.all(
    repeat(4, () =>
      db.tag.create({ data: { text: lorem.word(), user: { connect: { id: admin.id } } } })
    )
  );

  const lists = await Promise.all(
    repeat(3, () =>
      db.list.create({ data: { title: lorem.words(3), user: { connect: { id: admin.id } } } })
    )
  );

  const genTasks = () => {
    return Array.from(new Array(Math.ceil(Math.random() * 7) + 1), () => ({
      title: lorem.words(3),
      checkedAt: Math.random() > 0.5 ? new Date() : null,
      user: { connect: { id: admin.id } },
    }));
  };

  const todos = await Promise.all(
    repeat(10, () => {
      const checked = Math.random() > 0.5;
      return db.todo.create({
        data: {
          title: lorem.words(3),
          description: lorem.paragraph(),
          checked,
          checkedAt: checked ? date.past() : null,
          list: { connect: { id: random(lists).id } },
          tags: { connect: randomMany(tags, 0.3).map(({ id }) => ({ id })) },
          tasks: {
            create: genTasks(),
          },
          user: { connect: { id: admin.id } },
        },
      });
    })
  );

  const [todo, ...rest] = todos;

  await db.todo.update({
    where: { id: todo.id },
    data: { requires: { connect: rest.slice(0, rest.length / 2).map(({ id }) => ({ id })) } },
  });

  await db.$disconnect();
})().finally(() => console.log('Done'));
