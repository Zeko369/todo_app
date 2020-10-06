import { InputType, Field } from 'type-graphql';

@InputType()
export class SignUpInput {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class SignInInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
