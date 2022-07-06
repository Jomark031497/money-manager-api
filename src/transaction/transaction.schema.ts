import { z } from 'zod';

export const createTransactionSchema = z.object({
  name: z.string().min(1).max(60),
  transactionType: z.string().min(1).max(60),
  amount: z.number().nonnegative(),
  category: z.string().min(1).max(60),
  paymentMethod: z.string().min(1).max(60),
});
