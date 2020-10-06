import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello world';
  }
}

export const resolvers = [HelloResolver] as const;
