import { Resolver, Arg, Query, Ctx, Int, Info } from 'type-graphql';
import {
  Todo,
  TodoWhereUniqueInput,
  TodoWhereInput,
  TodoOrderByInput,
  TodoRelationFilter,
} from '@generated/type-graphql';

import { GQLCtx } from '../../ts/gql';

@Resolver()
export class TodoResolver {
  @Query(() => Todo, { nullable: true })
  async todo(@Ctx() ctx: GQLCtx, @Arg('where', { nullable: true }) where: TodoWhereUniqueInput) {
    return ctx.prisma.todo.findOne({ where });
  }

  @Query(() => [Todo], { nullable: true })
  async todos(
    @Ctx() ctx: GQLCtx,
    @Arg('take', () => Int, { nullable: true }) take: number,
    @Arg('orderBy', () => [TodoOrderByInput], { nullable: true }) orderBy: [TodoOrderByInput],
    @Arg('where', () => TodoWhereInput, { nullable: true }) where: TodoWhereInput,
    @Info() info: ParameterDecorator
  ) {
    console.log(info);
    return ctx.prisma.todo.findMany({ where, orderBy, take });
  }
}
