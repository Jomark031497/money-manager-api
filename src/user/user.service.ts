import { User } from '@prisma/client';
import { hash } from 'argon2';
import prisma from '../utils/prisma';

export const createUser = async (input: User) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...input,
        password: await hash(input.password),
      },
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const me = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
