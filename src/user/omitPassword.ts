import { User } from '@prisma/client';

const omitPassword = (user: User) => {
  const { password, ...rest } = user;

  return rest;
};

export default omitPassword;
