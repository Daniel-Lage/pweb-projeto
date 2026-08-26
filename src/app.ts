import express from "express";
import { responseTimeMiddleware } from "./middlewares/responseTime.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(responseTimeMiddleware);
app.use(router);
app.use(errorMiddleware);

export default app;
