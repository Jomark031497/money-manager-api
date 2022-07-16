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
    throw APIError.internal('Unable to create wallet');
  }
};

export const getWallets = async (userId: string): Promise<WalletWithTotal> => {
  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId },
      orderBy: {
        name: 'asc',
      },
    });

    return walletsWithTotal(wallets);
  } catch (error) {
    throw APIError.internal('Unable to get all wallets');
  }
};

export const getWallet = async (id: string, userId: string): Promise<Wallet> => {
  try {
    const wallet = await prisma.wallet.findFirstOrThrow({
      where: { id, userId },
    });

    return wallet;
  } catch (error) {
    throw APIError.notFound('wallet not found');
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

export const deleteWallet = async (id: string) => {
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
