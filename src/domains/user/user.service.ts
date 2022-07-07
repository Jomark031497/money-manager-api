import { User } from '@prisma/client';
import { hash } from 'argon2';
import prisma from '../../utils/prisma';

export const signUp = async (body: User): Promise<User> => {
  try {
    const user = await prisma.user.create({
      data: {
        ...body,
        password: await hash(body.password),
      },
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const me = async (id: string): Promise<User> => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      const error = new Error('User not found');
      throw error;
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
