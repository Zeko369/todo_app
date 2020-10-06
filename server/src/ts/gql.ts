import { Request, Response } from './express';
import { User } from '../db';

export interface GQLCtx {
  user?: User;
  res: Response;
  req: Request;
}
