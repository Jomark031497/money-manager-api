import { Router } from 'express';
import {
  createWalletHandler,
  deleteWalletHandler,
  getWalletHandler,
  getWalletsHandler,
  updateWalletHandler,
} from '../controller/wallets.controller';
import requireAuth from '../middlewares/requireAuth';
import validate from '../middlewares/validate';
import { createWalletSchema, updateWalletSchema } from '../schema/wallet.schema';

const router = Router();

router.get('/', requireAuth, getWalletsHandler);
router.get('/:id', requireAuth, getWalletHandler);
router.post('/create', requireAuth, validate(createWalletSchema), createWalletHandler);
router.put('/:id', requireAuth, validate(updateWalletSchema), updateWalletHandler);
router.delete('/:id', requireAuth, deleteWalletHandler);

export default router;
