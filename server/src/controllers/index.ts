import { Query, Resolver } from 'type-graphql';
import { AuthResolver } from './Auth/resolver';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello world';
  }
}

export const resolvers = [HelloResolver, AuthResolver] as const;
