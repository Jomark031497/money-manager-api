import { Transaction } from '@prisma/client';
import prisma from '../utils/prisma';

export const getWalletTransactions = async () => {
  try {
    const transactions = await prisma.transaction.findMany();

    return transactions;
  } catch (error) {
    throw new Error(error);
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
