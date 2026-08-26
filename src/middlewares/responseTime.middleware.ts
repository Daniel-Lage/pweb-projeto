import type { NextFunction, Request, Response } from "express";

export function responseTimeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = process.hrtime();
  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    console.log(`Tempo de resposta: ${seconds}s ${nanoseconds / 1000000}ms`);
  });
  next();
}
