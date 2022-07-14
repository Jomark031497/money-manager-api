import { Transaction } from '@prisma/client';

export type TransactionWithSummary = {
  transactions: Transaction[];
  expense: number;
  income: number;
};

export const transactionWithSummary = (transactions: Transaction[]): TransactionWithSummary => {
  const expenses = transactions.filter((x) => x.type === 'expense');
  const incomes = transactions.filter((x) => x.type === 'income');

  return {
    transactions,
    expense: expenses.reduce((prev, curr) => prev + curr.amount, 0),
    income: incomes.reduce((prev, curr) => prev + curr.amount, 0),
  };
};
