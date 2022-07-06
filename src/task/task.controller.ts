import { Request, Response } from 'express';
import { taskService } from '.';
import logger from '../utils/logger';
import prisma from '../utils/prisma';

export const getAllTasks = async (req: Request, res: Response) => {
  const { userId } = req.session;
  try {
    const tasks = await taskService.getAllTasks(userId!);

    return res.status(200).json(tasks);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(req.body, req.session.userId!);

    return res.status(200).json(task);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const taskExists = await prisma.task.findUnique({ where: { id: Number(id) } });
  if (!taskExists) return res.status(404).json({ error: "task id doesn't exists" });

  try {
    const task = await taskService.updateTask(Number(id), req.body);

    return res.status(200).json(task);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const taskExists = await prisma.task.findUnique({ where: { id: Number(id) } });
  if (!taskExists) return res.status(404).json({ error: "task id doesn't exists" });

  try {
    await taskService.deleteTask(Number(id));

    return res.status(200).json({ message: 'task successfully deleted', success: true });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};
