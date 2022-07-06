import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string({
      required_error: 'Please enter a valid username',
    })
    .min(4, 'username must be at least 4 characters long')
    .max(255),
  email: z
    .string({
      required_error: 'Please enter a valid email address',
    })
    .min(4, 'email must be at least 4 characters long')
    .max(255)
    .email(),
  password: z
    .string({
      required_error: 'Please enter a valid password',
    })
    .min(6, 'password must be at least 6 characters long')
    .max(60, 'password must not exceed 60 characters long'),
});

export const loginSchema = z.object({
  username: z
    .string({
      required_error: 'Please enter a valid username',
    })
    .min(4, 'username must be at least 4 characters long')
    .max(255),
  password: z
    .string({
      required_error: 'Please enter a valid password',
    })
    .min(6, 'password must be at least 6 characters long')
    .max(60, 'password must not exceed 60 characters long'),
});
