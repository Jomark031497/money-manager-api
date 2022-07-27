import { Router } from 'express';
import {
  createUserHandler,
  currentUserHandler,
  loginUserHandler,
  logoutHandler,
} from '../controller/user.controller';
import requireAuth from '../middlewares/requireAuth';
import validate from '../middlewares/validate';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';

const router = Router();

router.get('/me', requireAuth, currentUserHandler);
router.get('/logout', requireAuth, logoutHandler);
router.post('/create', validate(createUserSchema), createUserHandler);
router.post('/login', validate(loginUserSchema), loginUserHandler);

export default router;
