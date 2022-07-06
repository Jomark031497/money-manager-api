import { Wallet } from '@prisma/client';
import prisma from '../utils/prisma';
import walletsWithTotal, { WalletWithTotal } from './helpers/walletsWithTotal';

export const createWallet = async (inputs: Wallet, userId: string): Promise<Wallet> => {
  try {
    const wallet = await prisma.wallet.create({
      data: { ...inputs, userId },
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
    throw new Error(error);
  }
};

export const updateWallet = async (id: string, inputs: Wallet): Promise<Wallet> => {
  try {
    const wallet = await prisma.wallet.update({
      where: { id },
      data: { ...inputs },
    });

    return wallet;
  } catch (error) {
    throw new Error(error);
  }
};
