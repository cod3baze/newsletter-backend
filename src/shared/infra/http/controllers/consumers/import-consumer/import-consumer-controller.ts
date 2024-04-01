import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportConsumerUseCase } from "@/modules/consumers/use-cases/import-consumer/import-consumer-use-case";

class ImportConsumerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importConsumerUseCase = container.resolve(ImportConsumerUseCase);

    try {
      const { file } = request;

      await importConsumerUseCase.execute(file!);

      return response.status(201).json(file);
    } catch (e: any) {
      return response.status(e.status || e.statusCode).json({
        message: e.message,
      });
    }
  }
}

export { ImportConsumerController };
