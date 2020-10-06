import { Request as req, Response as res, NextFunction } from 'express';
import { User } from '../db';

export interface Request extends req {
  userId?: number;
  user?: User;
}

export type Response = res;

export type ExpCtx = { req: Request; res: Response };

export { NextFunction };
