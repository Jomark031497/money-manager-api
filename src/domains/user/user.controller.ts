import { verify } from 'argon2';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { omitPassword, userSchema, userService } from '.';
import logger from '../../utils/logger';
import prisma from '../../utils/prisma';
import { zParse } from '../../utils/zParse';

type Error = {
  username?: string;
  email?: string;
  password?: string;
};

export const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = await zParse(userSchema.loginSchema, req.body);

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) return res.status(404).json({ error: 'invalid username/password' });

  try {
    const verified = await verify(user.password, password);

    if (!verified) return res.status(400).json({ error: 'invalid username/password ' });

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);

    res.cookie('accessToken', accessToken, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'lax',
      secure: false,
    });

    return res.status(200).json(omitPassword(user));
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const registerHandler = async (req: Request, res: Response) => {
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
    return res.status(200).json(omitPassword(user));
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const meHandler = async (_req: Request, res: Response) => {
  try {
    return res.status(200).json(omitPassword(res.locals.user));
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const logoutHandler = async (_req: Request, res: Response) => {
  try {
    if (!res.locals.user) return res.status(401).json({ error: 'unauthorized' });

    res.cookie('accessToken', null, {
      maxAge: 0,
      httpOnly: true,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};
