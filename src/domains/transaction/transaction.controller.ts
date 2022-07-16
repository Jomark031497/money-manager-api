import { Request, Response } from 'express';
import { transactionService } from '.';
import logger from '../../utils/logger';
import prisma from '../../utils/prisma';

export const getAllTransactions = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) * 5 || undefined;
  const take = Number(req.query.take) || undefined;

  try {
    const transactions = await transactionService.getAllTransactions(
      req.session.userId!,
      take,
      skip
    );

    logger.info('get transactions: success');
    return res.status(200).json(transactions);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const getOneTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.getOneTransaction(req.params.id);

    logger.info('get one transaction: success');
    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.createTransaction(req.body, req.session.userId!);

    logger.info('create transaction: success');
    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res
      .status(error.code)
      .json({ error: error.message, helperMessage: error.helperMessage });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const transactionExists = await prisma.transaction.findUnique({
    where: { id: req.params.id },
  });
  if (!transactionExists) return res.status(404).json({ error: 'transaction not found' });

  try {
    const transaction = await transactionService.updateTransaction(req.params.id, req.body);

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res
      .status(error.code)
      .json({ error: error.message, helperMessage: error.helperMessage });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const transactionExists = await prisma.transaction.findUnique({
    where: { id: req.params.id },
  });
  if (!transactionExists) return res.status(404).json({ error: 'transaction not found' });

  try {
    const transaction = await transactionService.deleteTransaction(req.params.id);

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res
      .status(error.code)
      .json({ error: error.message, helperMessage: error.helperMessage });
  }
};
