import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  if (!accessToken) return res.status(401).json({ error: 'unauthenticated' });
  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
  if (!decoded) return res.status(403).json({ error: 'invalid token' });
  res.locals.user = decoded;

  return next();
};

export default requireAuth;
