import { Wallet } from '@prisma/client';
import { APIError } from '../../error/ApiError';
import prisma from '../../utils/prisma';
import walletsWithTotal, { WalletWithTotal } from './helpers/walletsWithTotal';

export const createWallet = async (body: Wallet, userId: string): Promise<Wallet> => {
  try {
    const wallet = await prisma.wallet.create({
      data: {
        ...body,
        userId,
      },
    });
    return wallet;
  } catch (error) {
    throw new Error(error);
  }
};

export const getWallets = async (userId: string): Promise<WalletWithTotal> => {
  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId },
    });

    return walletsWithTotal(wallets);
  } catch (error) {
    throw new Error(error);
  }
};

export const getWallet = async (id: string, userId: string): Promise<Wallet> => {
  try {
    const wallet = await prisma.wallet.findFirstOrThrow({
      where: { id, userId },
    });

    return wallet;
  } catch (error) {
    throw APIError.notFound('Wallet not found');
  }
};

export const updateWallet = async (id: string, body: Wallet): Promise<Wallet> => {
  try {
    const wallet = await prisma.wallet.update({
      where: { id },
      data: { ...body },
    });
    return wallet;
  } catch (error) {
    throw new Error(error);
  }
};
