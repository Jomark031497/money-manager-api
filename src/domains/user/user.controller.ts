import { Request, Response } from 'express';
import { userSchema, userService } from '.';
import logger from '../../utils/logger';
import prisma from '../../utils/prisma';
import { zParse } from '../../utils/zParse';

type Error = {
  username?: string;
  email?: string;
  password?: string;
};

export const signUp = async (req: Request, res: Response) => {
  const { username, email } = await zParse(userSchema.signUpSchema, req.body);
  const errors: Error = {};

  const usernameExists = await prisma.user.findUnique({ where: { username } });
  const emailExists = await prisma.user.findUnique({ where: { email } });

  if (usernameExists) errors.username = 'Username is already taken';
  if (emailExists) errors.email = 'Username is already taken';
  if (Object.keys(errors).length) return res.status(400).json(errors);

  try {
    const user = await userService.signUp(req.body);

    logger.info('sign up: success');
    return res.status(200).json(user);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'unauthenticated' });

    logger.info('user: authenticated');
    return res.status(200).json(req.user);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    req.logout((err) => {
      if (err) return res.status(400).json(err);

      return null;
    });
    logger.info('logout: success');
    return res.status(200).json({ success: true });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};
