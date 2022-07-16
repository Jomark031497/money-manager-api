import { Router } from 'express';
import userRoute from './domains/user/user.route';
import walletRoute from './domains/wallet/wallet.route';
import transactionRoute from './domains/transaction/transaction.route';

const router = Router();

router.use(userRoute);
router.use(walletRoute);
router.use(transactionRoute);

export default router;
