import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';
import logger from '../utils/logger';

const validate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      logger.error(error);
      if (error instanceof ZodError) {
        return res.status(400).json(
          error.flatten((issue: ZodIssue) => ({
            message: issue.message,
            errorCode: issue.code,
          })).fieldErrors
        );
      }
      return res.status(500).json({ error: 'something went wrong' });
    }
  };

export default validate;
