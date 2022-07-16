import { Request, Response } from 'express';
import { walletService } from '.';
import logger from '../../utils/logger';

export const createWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.createWallet(req.body, req.session.userId!);

    logger.info('create wallet: success');
    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const getWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await walletService.getWallets(req.session.userId!);

    logger.info('get wallets: success');
    return res.status(200).json(wallets);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const getWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.getWallet(req.params.id, req.session.userId!);

    logger.info('get single wallet: success');
    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json(error.message);
  }
};

export const updateWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.updateWallet(req.params.id, req.body);

    logger.info('update wallet: success');
    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.json({ error: 'something went wrong' });
  }
};

export const deleteWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.deleteWallet(req.params.id);

    logger.info('delete wallet: success');
    return res.status(200).json(wallet);
  } catch (error) {
    logger.error(error);
    return res.status(error.code).json(error.message);
  }
};
