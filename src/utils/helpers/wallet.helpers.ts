import { Transaction, Wallet } from '@prisma/client';

interface WalletWithTransaction extends Wallet {
  transactions: Transaction[];
}

export type WalletWithTotal = {
  total: {
    balance: number;
    income: number;
    expense: number;
  };
} & WalletWithTransaction;

export const walletWithTotal = (wallet: WalletWithTransaction): WalletWithTotal => {
  const expense = wallet.transactions.reduce(
    (prev, curr) => (curr.amount < 0 ? prev + curr.amount : prev),
    0
  );

  const income = wallet.transactions.reduce(
    (prev, curr) => (curr.amount > 0 ? prev + curr.amount : prev),
    0
  );

  const balance = wallet.transactions.reduce((prev, curr) => prev + curr.amount, 0);

  return {
    ...wallet,
    total: {
      balance,
      income,
      expense,
    },
  };
};
