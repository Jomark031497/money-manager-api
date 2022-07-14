import { verify } from 'argon2';
import { Request, Response } from 'express';
import { omitPassword, userSchema, userService } from '.';
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
    req.session.userId = user.id;
    return res.status(200).json(omitPassword(user));
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(400).json({ error: 'invalid username/password' });

  const passwordMatched = await verify(user.password, password);
  if (!passwordMatched) return res.status(400).json({ error: 'invalid username/password' });

  try {
    req.session.userId = user.id;
    return res.status(200).json(omitPassword(user));
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const me = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.status(401).json({ error: 'unauthorized' });

  try {
    const user = await userService.me(req.session.userId);
    if (!user) return res.status(401).json({ error: 'unauthorized' });
    return res.status(200).json(omitPassword(user));
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const logout = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.status(401).json({ error: 'unauthorized' });

  try {
    req.session.destroy((err) => {
      if (err) return res.status(500).json(err);

      return null;
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};