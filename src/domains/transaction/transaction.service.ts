import { Transaction } from '@prisma/client';
import { APIError } from '../../error/ApiError';
import prisma from '../../utils/prisma';
import { TransactionWithSummary, transactionWithSummary } from './helpers/transactionsWithSummary';

export const getAllTransactions = async (userId: string): Promise<TransactionWithSummary> => {
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

export const getOneTransaction = async (id: string): Promise<Transaction> => {
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

export const createTransaction = async (
  body: Transaction,
  userId: string
): Promise<Transaction> => {
  try {
    const transaction = await prisma.transaction.create({
      data: { ...body, userId },
    });

    const wallet = await prisma.wallet.findUniqueOrThrow({
      where: { id: transaction.walletId },
    });

    await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance:
          transaction.type === 'expense'
            ? wallet.balance - transaction.amount
            : wallet.balance + transaction.amount,
      },
    });

    return transaction;
  } catch (error) {
    throw APIError.badRequest(error, 'no wallet id found');
  }
};

export const updateTransaction = async (id: string, body: Transaction): Promise<Transaction> => {
  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        ...body,
      },
    });
    return transaction;
  } catch (error) {
    throw APIError.badRequest(error, 'unable to create transaction');
  }
};
