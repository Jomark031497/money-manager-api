import { Request, Response } from 'express';
import { walletWithTotal } from '../utils/helpers/wallet.helpers';
import logger from '../utils/logger';
import prisma from '../utils/prisma';

export const createWalletHandler = async (req: Request, res: Response) => {
  try {
    const wallet = await prisma.wallet.create({
      data: {
        ...req.body,
        userId: req.user!.id,
      },
    });

    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const getWalletHandler = async (req: Request, res: Response) => {
  try {
    const wallet = await prisma.wallet.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
      include: { transactions: true },
    });

    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const getWalletsHandler = async (req: Request, res: Response) => {
  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId: req.user!.id },
      orderBy: { name: 'asc' },
      include: { transactions: true },
    });

    const walletsWithTotal = wallets.map((wallet) => walletWithTotal(wallet));

    const balance = walletsWithTotal.reduce((prev, curr) => prev + curr.total.balance, 0);
    const expense = walletsWithTotal.reduce((prev, curr) => prev + curr.total.expense, 0);
    const income = walletsWithTotal.reduce((prev, curr) => prev + curr.total.income, 0);

    return res.status(200).json({ wallets: walletsWithTotal, balance, expense, income });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const updateWalletHandler = async (req: Request, res: Response) => {
  const { id: walletId } = req.params;

  const walletExists = await prisma.wallet.findFirst({
    where: { id: walletId, userId: req.user!.id },
  });
  if (!walletExists) return res.status(400).json({ error: 'wallet not found' });

  try {
    const wallet = await prisma.wallet.update({
      where: { id: walletId },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const deleteWalletHandler = async (req: Request, res: Response) => {
  const { id: walletId } = req.params;

  const walletExists = await prisma.wallet.findFirst({
    where: { id: walletId, userId: req.user!.id },
  });
  if (!walletExists) return res.status(400).json({ error: 'wallet not found' });

  try {
    await prisma.wallet.delete({
      where: {
        id: walletId,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};
