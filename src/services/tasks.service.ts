import { AppError } from "../utils/AppError.js";

type TaskObject = {
  id: number;
} & TaskPayload;

type TaskPayload = {
  title: string;
  completed: boolean;
};

const tasks: TaskObject[] = [];

export class TasksService {
  async listTasks() {
    return tasks;
  }

  async findTaskById(id: number) {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return task;
  }

  async createTask(payload: TaskPayload) {
    const newTask = { id: tasks.length, ...payload };

    tasks.push(newTask);

    return newTask as TaskObject;
  }

  async updateTask(id: number, changes: Partial<TaskPayload>) {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new AppError("Task not found", 404);
    }
    const task = tasks[index]!;

    const definedChanges = Object.fromEntries(
      Object.entries(changes).filter(([_, value]) => value !== undefined),
    ) as Partial<TaskPayload>;

    const newTask = {
      ...task,
      ...definedChanges,
    };

    tasks[index] = newTask;

    return newTask;
  }

  async deleteTask(id: number) {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new AppError("Task not found", 404);
    }

    tasks.splice(index, 1);

    return true;
  }
}
