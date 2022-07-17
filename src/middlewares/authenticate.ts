import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', async (error, user) => {
    if (error) return next(error);

    if (!user) return res.status(404).json({ error: 'user not found' });

    return req.logIn(user, () => {
      res.status(200).json(user);
      next();
    });
  })(req, res, next);
};

export default authenticate;
