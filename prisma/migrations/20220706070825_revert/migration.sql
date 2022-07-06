/*
  Warnings:

  - You are about to drop the column `userId` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_userId_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "userId";
