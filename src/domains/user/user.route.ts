import { Router } from 'express';
import { userController, userSchema } from '.';
import authenticate from '../../middlewares/authenticate';
import requireAuth from '../../middlewares/requireAuth';
import validate from '../../middlewares/validate';

const router = Router();

router.get('/user/me', requireAuth, userController.me);
router.get('/user/logout', requireAuth, userController.logout);
router.post('/user/login', validate(userSchema.loginSchema), authenticate);
router.post('/user/signUp', validate(userSchema.signUpSchema), userController.signUp);

export default router;
