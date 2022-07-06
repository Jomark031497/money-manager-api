import { Router } from 'express';
import requireAuth from './middlewares/requireAuth';
import validate from './middlewares/validate';
import { userController, userSchema } from './user';
import { walletController, walletSchema } from './wallet';

const router = Router();

// user routes
router.get('/user/protected', requireAuth, userController.protectedRoute); // test route
router.get('/user/me', requireAuth, userController.me);
router.get('/user/logout', requireAuth, userController.logout);
router.post('/user/login', validate(userSchema.loginSchema), userController.login);
router.post('/user/signUp', validate(userSchema.signUpSchema), userController.signUp);

// wallet routes
router.get('/wallet/', requireAuth, walletController.getWallets);
router.post(
  '/wallet/create',
  validate(walletSchema.createWalletSchema),
  requireAuth,
  walletController.createWallet
);

export default router;
