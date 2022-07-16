import { Wallet } from '@prisma/client';
import { APIError } from '../../error/ApiError';
import prisma from '../../utils/prisma';
import { WalletWithTotal, walletWithTotal } from './helpers/WalletWithTotal';

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
    throw APIError.internal('Unable to create wallet');
  }
};

export const getWallet = async (id: string, userId: string): Promise<WalletWithTotal> => {
  try {
    const wallet = await prisma.wallet.findFirstOrThrow({
      where: { id, userId },
      include: {
        transactions: true,
      },
    });

    return walletWithTotal(wallet);
  } catch (error) {
    throw APIError.notFound('wallet not found');
  }
};

export const getWallets = async (userId: string): Promise<WalletWithTotal[]> => {
  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
      include: { transactions: true },
    });

    const walletsWithTotal = wallets.map((wallet) => walletWithTotal(wallet));

    return walletsWithTotal;
  } catch (error) {
    throw APIError.internal('Unable to get all wallets');
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
    throw APIError.badRequest(error);
  }
};

export const deleteWallet = async (id: string): Promise<Wallet> => {
  try {
    const wallet = await prisma.wallet.delete({
      where: {
        id,
      },
    });

    return wallet;
  } catch (error) {
    throw APIError.badRequest(error);
  }
};
