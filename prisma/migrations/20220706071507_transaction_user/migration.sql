-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
