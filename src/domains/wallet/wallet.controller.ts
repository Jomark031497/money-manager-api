import { Request, Response } from 'express';
import { walletService } from '.';
import logger from '../../utils/logger';
import prisma from '../../utils/prisma';

export const createWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.createWallet(req.body, req.session.userId!);

    logger.info('create wallet: success');
    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const getWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await walletService.getWallets(req.session.userId!);

    logger.info('get wallets: success');
    return res.status(200).json(wallets);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const getWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.getWallet(req.params.id, req.session.userId!);

    logger.info('get single wallet: success');
    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const updateWallet = async (req: Request, res: Response) => {
  const walletExists = await prisma.wallet.findUnique({
    where: { id: req.params.id },
  });

  if (!walletExists) return res.status(404).json({ error: 'wallet does not exists' });

  try {
    const wallet = await walletService.updateWallet(req.params.id, req.body);

    logger.info('update wallet: success');
    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};

export const deleteWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.deleteWallet(req.params.id);

    logger.info('delete wallet: success');
    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json({ error: error.message });
  }
};
