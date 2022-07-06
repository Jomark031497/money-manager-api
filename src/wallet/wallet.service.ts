import { Wallet } from '@prisma/client';
import prisma from '../utils/prisma';
import walletsWithTotal from './helpers/walletsWithTotal';

export const createWallet = async (inputs: Wallet, userId: string) => {
  try {
    const wallet = await prisma.wallet.create({ data: { ...inputs, userId } });
    return wallet;
  } catch (error) {
    throw new Error(error);
  }
};

export const getWallets = async (userId: string) => {
  try {
    const wallets = await prisma.wallet.findMany({ where: { userId } });

    return walletsWithTotal(wallets);
  } catch (error) {
    throw new Error(error);
  }
};

export const getWallet = async (id: string) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: {
        id,
      },
    });

    return wallet;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateWallet = async (id: string, inputs: Wallet) => {
  try {
    const wallet = await prisma.wallet.update({
      where: {
        id,
      },
      data: {
        ...inputs,
      },
    });

    return wallet;
  } catch (error) {
    throw new Error(error);
  }
};
