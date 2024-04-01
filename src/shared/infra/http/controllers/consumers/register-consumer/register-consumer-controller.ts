import { Request, Response } from "express";
import { container } from "tsyringe";
import { ZodError, z } from "zod";

import { RegisterConsumerUseCase } from "@/modules/consumers/use-cases/register-consumer/register-consumer-use-case";
import { IncorrectConsumerRegisterDataError } from "@/modules/consumers/errors/incorrect-consumer-register-data-error";

const registerConsumerBodySchema = z.object({
  email: z.string().email({ message: "E-mail mal formatado." }),
});

class RegisterConsumerController {
  async handle(request: Request, response: Response) {
    const registerConsumerUseCase = container.resolve(RegisterConsumerUseCase);

    try {
      const { email } = registerConsumerBodySchema.parse(request.body);

      await registerConsumerUseCase.execute({ email });

      return response.status(201).json({
        message: "Consumer added successfully.",
      });
    } catch (e: any) {
      if (e instanceof ZodError) {
        throw new IncorrectConsumerRegisterDataError();
      }

      return response.status(e.status || e.statusCode).json({
        message: e.message,
      });
    }
  }
}

export { RegisterConsumerController };
