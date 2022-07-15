import { Router } from 'express';
import { transactionSchema, transactionController } from '.';
import requireAuth from '../../middlewares/requireAuth';
import validate from '../../middlewares/validate';

const router = Router();
router.post(
  '/transaction/create',
  validate(transactionSchema.createTransactionSchema),
  requireAuth,
  transactionController.createTransaction
);
router.get('/transaction/', requireAuth, transactionController.getAllTransactions);
router.get('/transaction/:id', requireAuth, transactionController.getOneTransaction);

export default router;
