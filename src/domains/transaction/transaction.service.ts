import { Transaction } from '@prisma/client';
import { APIError } from '../../error/ApiError';
import prisma from '../../utils/prisma';
import { transactionWithSummary } from './helpers/transactionsWithSummary';

export const getAllTransactions = async (userId: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        Wallet: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return transactionWithSummary(transactions);
  } catch (error) {
    throw APIError.badRequest(error);
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

export const createTransaction = async (inputs: Transaction, userId: string) => {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        name: inputs.name,
        category: inputs.category,
        type: inputs.type.toLocaleLowerCase(),
        amount: inputs.amount,
        paymentMethod: inputs.paymentMethod,
        walletId: inputs.walletId,
        userId,
      },
    });

    const wallet = await prisma.wallet.findUniqueOrThrow({
      where: {
        id: transaction.walletId,
      },
    });

    await prisma.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        balance:
          transaction.type === 'expense'
            ? wallet.balance - transaction.amount
            : wallet.balance + transaction.amount,
      },
    });

    return transaction;
  } catch (error) {
    throw new Error(error);
  }
};
