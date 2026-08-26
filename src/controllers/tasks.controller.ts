import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { TasksService } from "../services/tasks.service.js";
import { AppError } from "../utils/AppError.js";

const tasksService = new TasksService();

export const listTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await tasksService.listTasks();
  res.json(tasks);
});

export const findTaskById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!(typeof id === "string")) {
      throw new AppError("Task ID is required", 400);
    }

    const task = await tasksService.findTaskById(Number(id));

    res.json(task);
  },
);

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, completed } = req.body;

  const newTask = await tasksService.createTask({ title, completed });

  res.status(201).json(newTask);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(typeof id === "string")) {
    throw new AppError("Task ID is required", 400);
  }

  const { title, completed } = req.body;

  const updatedTask = await tasksService.updateTask(Number(id), {
    title,
    completed,
  });

  res.json(updatedTask);
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(typeof id === "string")) {
    throw new AppError("Task ID is required", 400);
  }

  await tasksService.deleteTask(Number(id));

  res.status(204).send();
});
