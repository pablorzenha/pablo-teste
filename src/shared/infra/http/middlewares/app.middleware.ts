import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../../../errors/AppError';

export default class AppMiddleware {
  tokenExists(req: Request, res: Response, next: NextFunction): void {
    let token = req.headers.authorization;
    if (!token) {
      throw new AppError('Token is missing', 401);
    }

    token = token.split(' ')[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error, decoded: any) => {
        if (error) {
          throw new AppError('Invalid token', 401);
        }

        req.user = {
          id: decoded.id,
        };

        next();
      },
    );
  }

 
}
