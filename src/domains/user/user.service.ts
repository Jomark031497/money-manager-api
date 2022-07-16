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
    throw APIError.internal(error);
  }
};

export const me = async (id: string): Promise<User> => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { id },
    });

    return user;
  } catch (error) {
    throw APIError.notFound('User not found');
  }
};
