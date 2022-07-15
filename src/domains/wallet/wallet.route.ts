import { Router } from 'express';
import { walletController, walletSchema } from '.';
import requireAuth from '../../middlewares/requireAuth';
import validate from '../../middlewares/validate';

const router = Router();

router.get('/wallet/', requireAuth, walletController.getWallets);
router.get('/wallet/:id', requireAuth, walletController.getWallet);
router.put(
  '/wallet/:id',
  validate(walletSchema.updateWalletSchema),
  requireAuth,
  walletController.updateWallet
);
router.post(
  '/wallet/create',
  validate(walletSchema.createWalletSchema),
  requireAuth,
  walletController.createWallet
);
router.delete('/wallet/:id', requireAuth, walletController.deleteWallet);

export default router;
