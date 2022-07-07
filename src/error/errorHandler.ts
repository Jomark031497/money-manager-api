import { Request, Response } from 'express';
import logger from '../utils/logger';
import { APIError } from './ApiError';

export const errorHandler = (err: TypeError | APIError, _req: Request, res: Response) => {
  if (err instanceof APIError) {
    logger.info('its true!');
    return res.status(err.statusCode).send(err.message);
  }

  return res.status(500).json({ error: 'something went wrong' });
};
