import { Task } from '@prisma/client';
import prisma from '../utils/prisma';

export const createTask = async (input: Task, userId: number) => {
  try {
    const task = await prisma.task.create({
      data: {
        ...input,
        userId,
      },
    });

    return task;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllTasks = async (userId: number) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return tasks;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTask = async (id: number, input: Task) => {
  try {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        name: input.name,
        isCompleted: input.isCompleted,
      },
    });

    return task;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const task = await prisma.task.delete({ where: { id } });

    return task;
  } catch (error) {
    throw new Error(error);
  }
};
