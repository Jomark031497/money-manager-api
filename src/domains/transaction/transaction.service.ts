import { Transaction } from '@prisma/client';
import { APIError } from '../../error/ApiError';
import prisma from '../../utils/prisma';

export const getAllTransactions = async (userId: string): Promise<Transaction[]> => {
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

    return transactions;
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

export const deleteTransaction = async (id: string): Promise<Transaction> => {
  try {
    const transaction = await prisma.transaction.delete({
      where: { id },
    });

    return transaction;
  } catch (error) {
    throw APIError.badRequest(error, 'unable to delete transaction');
  }
};
