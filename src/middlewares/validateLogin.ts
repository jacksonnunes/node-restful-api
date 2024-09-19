import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { AppError } from '../errors/AppError';

const loginSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }).min(3, 'Username must be at least 3 characters long'),
  password: z.string({ message: 'Password is required' }),
});

export const validateLogin = (request: Request, _: Response, next: NextFunction) => {
  const validation = loginSchema.safeParse(request.body);

  if (!validation.success) {
    const errorsFormatted = validation.error.format();
    return next(new AppError([ 
      ...(errorsFormatted.username?._errors || []),
      ...(errorsFormatted.password?._errors || []),
    ]));
  }

  next();
}