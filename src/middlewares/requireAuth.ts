import { NextFunction, Request, Response } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'unauthorized' });

  return next();
};

export default requireAuth;
