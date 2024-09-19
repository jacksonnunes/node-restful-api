import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';

import { RoleEnum } from '../enums/RoleEnum';
import { AppError } from '../errors/AppError';
import { ITokenPayload } from '../types/ITokenPayload';

export const isAdmin = (request: Request, response: Response, next: NextFunction) => {
  const bearerToken = request.header('Authorization');

  if (!bearerToken) {
    return next(new AppError('Forbbiden: Token not provided', 403));
  }

  const token = bearerToken.split(' ')[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET as Secret) as ITokenPayload;
    
    const { roles } = decoded;

    if (!roles.includes(RoleEnum.ADMIN)) {
      return next(new AppError('Access denied: Insufficient permissions', 401));
    }

    next();
  } catch (error) {
    return next(new AppError('Access denied: Invalid token', 401));
  }
}