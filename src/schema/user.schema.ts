import z from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(4, 'username must be at least 4 characters long').max(255),
  email: z.string().min(4, 'email must be at least 4 characters long').max(255).email(),
  password: z
    .string()
    .min(6, 'password must be at least 6 characters long')
    .max(60, 'password must not exceed 60 characters long'),
});

export const loginUserSchema = z.object({
  username: z.string().min(4, 'username must be at least 4 characters long').max(255),
  password: z
    .string()
    .min(6, 'password must be at least 6 characters long')
    .max(60, 'password must not exceed 60 characters long'),
});
