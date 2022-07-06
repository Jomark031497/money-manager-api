import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) return res.status(401).json({ error: 'unauthorized' });
  try {
    return next();
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export default requireAuth;
