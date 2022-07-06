/*
  Warnings:

  - Made the column `walletId` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_walletId_fkey";

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "walletId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
