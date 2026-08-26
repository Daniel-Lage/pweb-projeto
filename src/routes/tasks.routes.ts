import { Router } from "express";
import {
  createTask,
  deleteTask,
  findTaskById,
  listTasks,
  updateTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/", listTasks);

router.get("/:id", findTaskById);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
