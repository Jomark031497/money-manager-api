import { Wallet } from '@prisma/client';

export type WalletWithTotal = {
  wallets: Wallet[];
  total: number;
};

const walletsWithTotal = (wallets: Wallet[]): WalletWithTotal => {
  const total = wallets.reduce((prev, curr) => prev + curr.balance, 0);

  return {
    wallets,
    total,
  };
};

export default walletsWithTotal;
