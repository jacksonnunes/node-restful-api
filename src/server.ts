import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

import { AppError } from './errors/AppError';
import { routes } from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);
app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      messages: error.messages,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred',
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}

export default app;