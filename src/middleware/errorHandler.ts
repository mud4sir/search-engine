import logger from '@/utils/logger';
import { Request, Response, NextFunction } from 'express';


interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Error: ${message}, Status: ${statusCode}`);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
