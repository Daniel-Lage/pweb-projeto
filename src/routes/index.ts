import { Router } from "express";

import tasksRouter from "./tasks.routes.js";

const router = Router();

router.use("/tasks", tasksRouter);

export default router;
