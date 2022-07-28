import { Router } from 'express';
import {
  createTransactionHandler,
  deleteTransactionHandler,
  getTransactionHandler,
  getTransactionsHandler,
  updateTransactionHandler,
} from '../controller/transaction.controller';
import requireAuth from '../middlewares/requireAuth';
import validate from '../middlewares/validate';
import { createTransactionSchema } from '../schema/transaction.schema';

const router = Router();

router.get('/', requireAuth, getTransactionsHandler);
router.get('/:id', requireAuth, getTransactionHandler);
router.post('/create', requireAuth, validate(createTransactionSchema), createTransactionHandler);
router.put('/:id', requireAuth, updateTransactionHandler);
router.delete('/:id', requireAuth, deleteTransactionHandler);

export default router;
