import jwt from 'jsonwebtoken';
import { db } from '../db';
import { Request, Response, NextFunction } from '../ts/express';

// get userID from jwt in cookie
export const UserIDMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { token } = req.cookies;

  if (token) {
    let data: object | string;
    try {
      data = jwt.verify(token, 'hello-world');
      if (typeof data !== 'string') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        req.userId = (data as any).userId;
      }
    } catch (error) {
      if (error.name !== 'JsonWebTokenError') {
        console.error(error);
      }
      res.clearCookie('token');
    }
  }

  next();
};

// get current_user from db
export const UserMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req;

  if (!userId) {
    return next();
  }

  const user = await db.user.findOne({ where: { id: userId } });

  // eslint-disable-next-line require-atomic-updates
  req.user = user || undefined;

  next();
};
