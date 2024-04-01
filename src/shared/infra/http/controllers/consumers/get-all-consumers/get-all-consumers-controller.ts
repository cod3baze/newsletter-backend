import { Request, Response } from "express";
import { container } from "tsyringe";
import { ZodError, z } from "zod";

import { GetAllConsumersUseCase } from "@/modules/consumers/use-cases/get-all-consumers/get-all-consumers-use-case";

const listConsumerQuerySchema = z.object({
  page: z.coerce.number(),
});

class GetAllConsumersController {
  async handle(request: Request, response: Response) {
    const getAllConsumersUseCase = container.resolve(GetAllConsumersUseCase);

    try {
      const { page } = listConsumerQuerySchema.parse(request.query);

      const consumers = await getAllConsumersUseCase.execute({ page });

      return response.json(consumers);
    } catch (e: any) {
      if (e instanceof ZodError) {
        response.json({ message: "Invalid query parameters." });
      }

      return response.status(e.status || e.statusCode).json({
        message: e.message,
      });
    }
  }
}

export { GetAllConsumersController };
