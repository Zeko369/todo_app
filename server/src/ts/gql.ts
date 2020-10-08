import { Request, Response } from './express';
import { PrismaClient, User } from '../db';

export interface GQLCtx {
  user?: User;
  res: Response;
  req: Request;
  prisma: PrismaClient;
}
