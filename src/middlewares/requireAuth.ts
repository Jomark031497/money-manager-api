import { NextFunction, Request, Response } from 'express';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Authorization denied. unauthenticated' });
  }

  return next();
};

export default requireAuth;
