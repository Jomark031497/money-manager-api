import { Router } from 'express';
import requireAuth from './middlewares/requireAuth';
import validate from './middlewares/validate';
import { taskController, taskSchema } from './task';
import { userController, userSchema } from './user';

const router = Router();

// user routes
router.get('/user/protected', requireAuth, userController.protectedRoute); // test route
router.get('/user/me', requireAuth, userController.me);
router.get('/user/logout', requireAuth, userController.logout);
router.post('/user/login', validate(userSchema.loginSchema), userController.login);
router.post('/user/signUp', validate(userSchema.signUpSchema), userController.signUp);

// task routes
router.get('/task/', requireAuth, taskController.getAllTasks);
router.post(
  '/task/create',
  validate(taskSchema.taskSchema),
  requireAuth,
  taskController.createTask
);
router.put('/task/:id', validate(taskSchema.taskSchema), requireAuth, taskController.updateTask);
router.delete('/task/:id', requireAuth, taskController.deleteTask);

export default router;
