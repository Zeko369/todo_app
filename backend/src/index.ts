import { schema, use, settings } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { auth } from 'nexus-plugin-jwt-auth';

import cors from 'cors';
import { server } from 'nexus';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

server.express.use(cors());
settings.change({ server: { port: parseInt(process.env.PORT || '') || 4000 } });

const APP_SECRET = 'FOO123';

use(auth({ appSecret: APP_SECRET }));
use(
  prisma({
    migrations: true,
    features: { crud: true },
    client: { options: { log: process.env.LOG ? ['query', 'info', 'warn'] : [] } },
  })
);

schema.queryType({
  definition(t) {
    t.crud.task();
    t.crud.tasks();

    t.crud.user();
    t.crud.users({ ordering: true, filtering: true });

    t.crud.todo();
    t.crud.todos({ ordering: true });

    t.crud.list();
    t.crud.lists({ ordering: true, filtering: true });

    t.crud.tag();
    t.crud.tags({ ordering: true });
  },
});

schema.objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});

schema.mutationType({
  definition(t) {
    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_, { email, password }, ctx) => {
        const user = await ctx.db.user.findOne({ where: { email } });

        if (!user) throw new Error(`No user found for email: ${email}`);

        const passwordValid = await compare(password, user.password);
        if (!passwordValid) throw new Error('Invalid password');

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    t.field('register', {
      type: 'AuthPayload',
      args: {
        username: schema.stringArg({ nullable: false }),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_, { username, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.db.user.create({
          data: { username, email, password: hashedPassword },
        });

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    t.crud.createOneTag();
    t.crud.updateOneTag();
    t.crud.deleteOneTag();

    t.crud.createOneTask();
    t.crud.updateOneTask();
    t.crud.updateManyTask();
    t.crud.deleteOneTask();
    t.crud.deleteManyTask();

    t.field('checkTask', {
      type: 'Task',
      args: { id: schema.intArg({ required: true }) },
      resolve: async (_, args, ctx) => {
        const { id } = args;

        const task = await ctx.db.task.findOne({ where: { id } });
        if (task) {
          const date = new Date();

          if (!task.checkedAt) {
            const remaining = await ctx.db.task.count({
              where: { todoId: task.todoId, checkedAt: { equals: null } },
            });

            if (remaining === 1) {
              await ctx.db.todo.update({
                where: { id: task.todoId },
                data: { checked: { set: true }, checkedAt: { set: date } },
              });
            }
          }

          return ctx.db.task.update({
            where: { id },
            data: { checkedAt: { set: task.checkedAt ? null : date } },
          });
        }

        return null;
      },
    });

    t.crud.createOneTodo();
    t.crud.updateOneTodo();
    t.crud.updateManyTodo();
    t.crud.deleteOneTodo();
    t.crud.deleteManyTodo();

    t.field('checkTodo', {
      type: 'Todo',
      args: { id: schema.intArg({ required: true }) },
      resolve: async (_, args, ctx) => {
        const { id } = args;

        const todo = await ctx.db.todo.findOne({ where: { id }, include: { tasks: true } });
        if (todo) {
          const date = new Date();

          if (!todo.checked) {
            await ctx.db.task.updateMany({
              where: { todoId: id },
              data: { checkedAt: { set: date } },
            });
          }

          return ctx.db.todo.update({
            where: { id },
            data: {
              checked: { set: !todo.checked },
              checkedAt: { set: todo.checked ? null : date },
            },
          });
        }

        return null;
      },
    });

    t.crud.createOneList();
    t.crud.updateOneList();
    t.crud.deleteOneList();
  },
});

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.username();
    t.model.email();
    t.model.password();
    t.model.role();
    t.model.tags();
    t.model.todos();
    t.model.tasks();
    t.model.lists();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

schema.objectType({
  name: 'Tag',
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.color();
    t.model.todos();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

schema.objectType({
  name: 'Task',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.todo();
    t.model.checkedAt();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

schema.objectType({
  name: 'Todo',
  definition(t) {
    t.model.id();
    t.model.pinned();
    t.model.title();
    t.model.description();
    t.model.list();
    t.model.tags({ ordering: true, filtering: true });
    t.model.tasks({ ordering: true, filtering: true });
    t.model.checked();
    t.model.checkedAt();
    t.model.requires();
    t.model.requiredBy();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

schema.objectType({
  name: 'List',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.todos({ ordering: true });
    t.model.archivedAt();
    t.model.createdAt();
    t.model.updatedAt();
  },
});
