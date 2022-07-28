import { hash } from 'argon2';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { omitPassword } from '../utils/helpers/user.helpers';
import logger from '../utils/logger';
import prisma from '../utils/prisma';

type ErrorType = {
  username?: string;
  email?: string;
  password?: string;
};

export const createUserHandler = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const errors: ErrorType = {};

  const usernameExists = await prisma.user.findUnique({ where: { username } });
  const emailExists = await prisma.user.findUnique({ where: { email } });

  if (usernameExists) errors.username = 'username is already taken';
  if (emailExists) errors.email = 'email is already taken';

  if (Object.keys(errors).length) return res.status(400).json(errors);

  try {
    const hashedPassword = await hash(password);

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });
    logger.info('register successful');
    return res.status(200).json(omitPassword(user));
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', async (err, user) => {
    try {
      if (err) return next(err);
      if (!user) return res.status(404).json({ error: 'invalid username/password' });

      return req.logIn(user, (error: Error) => {
        if (error) return next(error);

        res.status(200).json(omitPassword(user));
        return next();
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: 'something went wrong' });
    }
  })(req, res, next);
};

export const currentUserHandler = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(omitPassword(req.user!));
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logOut((err) => {
      if (err) return res.status(400).json({ error: 'unable to logout' });
      return next();
    });

    return res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};
