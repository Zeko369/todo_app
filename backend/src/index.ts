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

const getUser = async (ctx: NexusContext) => {
  try {
    // @ts-ignore
    const userId = ctx.token.userId;
    if (!userId) {
      throw new Error('INVALID_TOKEN');
    }

    return ctx.db.user.findOne({ where: { id: parseInt(userId) } });
  } catch (err) {
    return null;
  }
};

const scopeToUser = async (root: any, args: any, ctx: any, info: any, originalResolve: any) => {
  const user = await getUser(ctx);

  if (!user) {
    return [];
  }

  const newArgs = { ...args, where: { ...args.where, userId: { equals: user.id } } };
  const res = await originalResolve(root, newArgs, ctx, info);

  return res;
};

const connectToUserMutation = async (
  root: any,
  args: any,
  ctx: any,
  info: any,
  originalMutation: any
) => {
  const user = await getUser(ctx);

  if (!user) {
    throw new Error('Not logged in');
  }

  const res = originalMutation(
    root,
    { data: { ...args.data, user: { connect: { id: user.id } } } },
    ctx,
    info
  );
  return res;
};

schema.queryType({
  definition(t) {
    t.crud.task();
    // t.crud.tasks({ resolve: scopeToUser });

    t.crud.user();
    t.crud.users({ ordering: true, filtering: true });

    t.crud.todo();
    t.crud.todos({
      ordering: true,
      filtering: true,
      resolve: async (root, args, ctx, info, originalResolve) => {
        const user = await getUser(ctx);

        if (!user) {
          return [];
        }

        const res = await originalResolve(
          root,
          {
            ...args,
            where: {
              AND: [
                { ...args.where },
                {
                  OR: [
                    { userId: { equals: user.id } },
                    {
                      list: {
                        sharedWith: {
                          some: {
                            id: {
                              equals: user.id,
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          },
          ctx,
          info
        );

        return res;
      },
    });

    t.crud.list({
      resolve: async (a, b, c, d, e) => {
        const user = await getUser(c);

        if (!user) {
          return null;
        }

        const list = await c.db.list.findOne({
          where: { id: b.where.id || -1 },
          select: { sharedWith: { select: { id: true } }, userId: true },
        });

        if (list?.userId === user.id || list?.sharedWith.some((a) => a.id === user.id)) {
          const res = await e(a, b, c, d);
          return res;
        }

        return null;
      },
    });
    t.crud.lists({
      ordering: true,
      filtering: true,
      resolve: async (root, args, ctx, info, originalResolve) => {
        const user = await getUser(ctx);

        if (!user) {
          return [];
        }

        const res = await originalResolve(
          root,
          {
            ...args,
            where: {
              AND: [
                { ...args.where },
                {
                  OR: [
                    { userId: { equals: user.id } },
                    {
                      sharedWith: {
                        some: {
                          id: {
                            equals: user.id,
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          },
          ctx,
          info
        );

        return res;
      },
    });

    t.crud.tag();
    t.crud.tags({ ordering: true, resolve: scopeToUser });

    t.crud.comment();
    // t.crud.comments({ ordering: true });

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        if (!ctx.token) {
          throw new Error('TOKEN_MISSING');
        }

        return getUser(ctx);
      },
    });
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

        if (!user) throw new Error(`WRONG_EMAIL`);

        const passwordValid = await compare(password, user.password);
        if (!passwordValid) throw new Error('WRONG_PASSWORD');

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

    t.crud.createOneComment({ resolve: connectToUserMutation });
    t.crud.updateOneComment();
    t.crud.deleteOneComment();

    t.crud.createOneTag({ resolve: connectToUserMutation });
    t.crud.updateOneTag();
    t.crud.deleteOneTag();

    t.crud.createOneTask({ resolve: connectToUserMutation });
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

    t.crud.createOneTodo({ resolve: connectToUserMutation });
    t.crud.updateOneTodo({
      resolve: async (a, b, c, d, e) => {
        console.log(b.data.list);

        const res = await e(a, b, c, d);

        if (!res) {
          throw new Error('hello');
        }

        return res;
      },
    });
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

    t.crud.createOneList({ resolve: connectToUserMutation });
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
  name: 'Comment',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.user();
    t.model.todo();
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
    t.model.comments({ ordering: true, filtering: true });
    t.field('commentsCount', {
      type: 'Int',
      resolve: (todo, _args, ctx) => ctx.db.comment.count({ where: { todoId: todo.id } }),
    });
    t.model.tags({ ordering: true, filtering: true });
    t.model.tasks({ ordering: true, filtering: true });
    t.model.checked();
    t.model.checkedAt();
    t.model.type();
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
    t.model.sharedWith({ ordering: true, filtering: true });
    t.model.user();
    t.model.archivedAt();
    t.model.createdAt();
    t.model.updatedAt();
  },
});
