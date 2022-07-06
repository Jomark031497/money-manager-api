import { Wallet } from '@prisma/client';

const walletsWithTotal = (wallets: Wallet[]) => {
  const total = wallets.reduce((prev, curr) => prev + curr.balance, 0);

  return {
    wallets,
    total,
  };
};

export default walletsWithTotal;
