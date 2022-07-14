import { Request, Response } from 'express';
import { transactionService } from '.';
import logger from '../../utils/logger';

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getAllTransactions(req.session.userId!);

    return res.status(200).json(transactions);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const getOneTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.getOneTransaction(req.params.id);

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json(error.message);
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.createTransaction(req.body, req.session.userId!);

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};
