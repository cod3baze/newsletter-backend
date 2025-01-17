import "@/env";

import "reflect-metadata";
import "express-async-errors";

import "@/shared/container";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import { AppError } from "@/shared/errors/app-error";
import { limiter } from "@/utils/express-limiter";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use("/api", routes);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
