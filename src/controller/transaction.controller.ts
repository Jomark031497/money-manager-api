import { Request, Response } from 'express';
import logger from '../utils/logger';
import prisma from '../utils/prisma';

export const createTransactionHandler = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        ...req.body,
        userId: req.user!.id,
      },
    });

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const getTransactionHandler = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
    });

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const getTransactionsHandler = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) * 5 || undefined;
  const take = Number(req.query.take) || undefined;

  try {
    const transaction = await prisma.transaction.findMany({
      where: { userId: req.user!.id },
      include: {
        Wallet: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const updateTransactionHandler = async (req: Request, res: Response) => {
  const transactionExists = await prisma.transaction.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!transactionExists) return res.status(400).json({ error: 'transaction not found' });

  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const deleteTransactionHandler = async (req: Request, res: Response) => {
  const transactionExists = await prisma.transaction.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!transactionExists) return res.status(400).json({ error: 'transaction not found' });

  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json(transaction);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};
