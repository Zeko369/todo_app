import { schema, use, settings } from 'nexus';
import { intArg } from '@nexus/schema';
import { prisma } from 'nexus-plugin-prisma';

import cors from 'cors';
import { server } from 'nexus';

server.express.use(cors());
settings.change({ server: { port: parseInt(process.env.PORT || '') || 4000 } });

use(prisma({ migrations: true, features: { crud: true } }));

schema.queryType({
  definition(t) {
    t.crud.todo();
    t.crud.todos({ ordering: true });

    t.crud.list();
    t.crud.lists({ filtering: true, ordering: true });
  },
});

schema.mutationType({
  definition(t) {
    t.crud.createOneTodo();
    t.crud.updateOneTodo();
    t.crud.deleteOneTodo();

    t.field('checkTodo', {
      type: 'Todo',
      args: { id: intArg({ required: true }) },
      resolve: async (parent, args, ctx) => {
        const { id } = args;

        const todo = await ctx.db.todo.findOne({ where: { id } });
        if (todo) {
          return ctx.db.todo.update({
            where: { id },
            data: { checked: !todo.checked, checkedAt: todo.checked ? null : new Date() },
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
  name: 'Todo',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();
    t.model.list();
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
    t.model.todos();
    t.model.createdAt();
    t.model.updatedAt();
  },
});
