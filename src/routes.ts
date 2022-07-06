import { Router } from 'express';
import requireAuth from './middlewares/requireAuth';
import validate from './middlewares/validate';
import { transactionController, transactionSchema } from './domains/transaction';
import { userController, userSchema } from './domains/user';
import { walletController, walletSchema } from './domains/wallet';

const router = Router();

// user routes
router.get('/user/me', requireAuth, userController.me);
router.get('/user/logout', requireAuth, userController.logout);
router.post('/user/login', validate(userSchema.loginSchema), userController.login);
router.post('/user/signUp', validate(userSchema.signUpSchema), userController.signUp);

// wallet routes
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

// transaction routes
router.post(
  '/transaction/create',
  validate(transactionSchema.createTransactionSchema),
  requireAuth,
  transactionController.createTransaction
);

export default router;
