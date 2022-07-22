import { Router } from 'express';
import { userController, userSchema } from '.';
import requireAuth from '../../middlewares/requireAuth';
import validate from '../../middlewares/validate';

const router = Router();

router.get('/user/me', requireAuth, userController.meHandler);
router.get('/user/logout', requireAuth, userController.logoutHandler);
router.post('/user/login', validate(userSchema.loginSchema), userController.loginHandler);
router.post('/user/signUp', validate(userSchema.signUpSchema), userController.registerHandler);

export default router;
