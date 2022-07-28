import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'unauthorized' });

  logger.info('user is authenticated');
  return next();
};

export default requireAuth;
