import { z } from 'zod';

export const createWalletSchema = z.object({
  name: z.string().min(2).max(60),
  balance: z.number().nonnegative(),
  color: z.string().nullish(),
});
