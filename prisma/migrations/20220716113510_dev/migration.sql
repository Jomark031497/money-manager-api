/*
  Warnings:

  - Added the required column `date` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL;
