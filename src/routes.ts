import { Router } from 'express';
import requireAuth from './middlewares/requireAuth';
import validate from './middlewares/validate';
import { userController, userSchema } from './user';

const router = Router();

// user routes
router.get('/user/protected', requireAuth, userController.protectedRoute); // test route
router.get('/user/me', requireAuth, userController.me);
router.get('/user/logout', requireAuth, userController.logout);
router.post('/user/login', validate(userSchema.loginSchema), userController.login);
router.post('/user/signUp', validate(userSchema.signUpSchema), userController.signUp);

export default router;
