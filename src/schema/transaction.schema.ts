import { z } from 'zod';

export const createTransactionSchema = z.object({
  name: z.string().min(1).max(60),
  type: z.string().min(1).max(60),
  amount: z.number(),
  category: z.string().min(1).max(60),
  paymentMethod: z.string().min(1).max(60),
  date: z.string(),
  note: z.string().optional(),
});
