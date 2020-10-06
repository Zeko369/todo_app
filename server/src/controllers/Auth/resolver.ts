import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resolver, Arg, Mutation, Query, Ctx } from 'type-graphql';
import { User } from '@generated/type-graphql';

import { SignInInput, SignUpInput } from './inputs';
import { hash } from '../../lib/hash';
import { GQLCtx } from '../../ts/gql';

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: GQLCtx) {
    return ctx.user;
  }

  @Mutation(() => User)
  async signUp(@Ctx() ctx: GQLCtx, @Arg('data') data: SignUpInput) {
    const { email, password, username } = data;
    const lowerEmail = email.toLowerCase();
    const hashedPassword = await hash(password);

    let user = await ctx.db.user.findOne({ where: { email: lowerEmail } });
    if (user) {
      throw new Error('EMAIL_IN_USE/Email already in use');
    }

    await ctx.db.user.create({
      data: { email: lowerEmail, password: hashedPassword, username },
    });

    return user;
  }

  @Mutation(() => User)
  async signIn(@Ctx() ctx: GQLCtx, @Arg('data') data: SignInInput) {
    const { email, password } = data;
    const user = await ctx.db.user.findOne({ where: { email } });

    if (!user) {
      throw new Error('EMAIL_NOT_FOUND/Cant find user with that email');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('INVALID_PASSWORD/Incorrect password');
    }

    const token = jwt.sign({ userId: user.id }, 'hello-world');
    ctx.res.cookie('token', token, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 365, // year
    });

    return user;
  }

  @Mutation(() => Boolean)
  async signOut(@Ctx() ctx: GQLCtx) {
    if (ctx.user) {
      ctx.res.clearCookie('token');
      return true;
    }

    return false;
  }
}
