import { User } from '@prisma/client';
import { hash } from 'argon2';
import { APIError } from '../../error/ApiError';
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
    const user = await prisma.user.findFirstOrThrow({
      where: { id },
      include: {
        wallets: true,
        transactions: true,
      },
    });

    return user;
  } catch (error) {
    throw APIError.notFound('User not found');
  }
};
