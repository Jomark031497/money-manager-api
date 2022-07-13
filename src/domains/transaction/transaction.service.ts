import { Transaction } from '@prisma/client';
import { APIError } from '../../error/ApiError';
import prisma from '../../utils/prisma';

export const getAllTransactions = async () => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        Wallet: {
          select: {
            name: true,
          },
        },
      },
    });

    return transactions;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOneTransaction = async (id: string) => {
  try {
    const transaction = await prisma.transaction.findFirstOrThrow({
      where: {
        id,
      },
    });

    return transaction;
  } catch (error) {
    throw APIError.notFound('Transaction not found');
  }
};

export const createTransaction = async (inputs: Transaction) => {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        name: inputs.name,
        category: inputs.category,
        type: inputs.type,
        amount: inputs.amount,
        paymentMethod: inputs.paymentMethod,
        walletId: inputs.walletId,
      },
    });

    return transaction;
  } catch (error) {
    throw new Error(error);
  }
};
