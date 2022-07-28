import { z } from 'zod';

export const createWalletSchema = z.object({
  name: z.string().min(2).max(60),
  color: z.string().optional(),
});

export const updateWalletSchema = z.object({
  name: z.string().min(2).max(60).optional(),
  color: z.string().optional(),
});
