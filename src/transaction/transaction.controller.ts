import { Request, Response } from 'express';
import { transactionService } from '.';
import logger from '../utils/logger';

export const getWalletTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getWalletTransactions();

    return res.status(200).json(transactions);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};
