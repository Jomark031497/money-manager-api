import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z, ZodError } from 'zod';
import logger from '../utils/logger';

type ActionErrors<T> = Partial<Record<keyof T, string>>;

const validate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      logger.error(error);
      if (error instanceof ZodError) {
        const errors = error as ZodError<z.TypeOf<typeof schema>>;

        // tom's version
        const tomErrors = errors.issues.reduce(
          (acc: ActionErrors<z.TypeOf<typeof schema>>, curr) => {
            const key = curr.path[0] as keyof z.TypeOf<typeof schema>;
            acc[key] = curr.message;

            return acc;
          },
          {}
        );

        return res.status(400).json(tomErrors);
      }
      return res.status(500).json({ error: 'something went wrong' });
    }
  };

export default validate;
