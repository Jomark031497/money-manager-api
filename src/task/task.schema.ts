import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string().min(1).max(60),
  isCompleted: z.boolean().optional(),
});
