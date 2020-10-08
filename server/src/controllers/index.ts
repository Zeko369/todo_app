import { Query, Resolver } from 'type-graphql';
import { AuthResolver } from './Auth/resolver';
import { TodoResolver } from './Todo/resolver';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello world';
  }
}

export const resolvers = [HelloResolver, AuthResolver, TodoResolver] as const;
