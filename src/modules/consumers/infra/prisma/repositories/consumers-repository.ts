import { prisma } from "@/shared/infra/prisma";
import { IConsumersRepository } from "@/modules/consumers/repositories/i-consumers-repository";
import { RegisterConsumerDTO } from "@/modules/consumers/dtos/register-consumer-dto";

export class PrismaConsumersRepository implements IConsumersRepository {
  async register(data: RegisterConsumerDTO) {
    const consumer = await prisma.consumer.create({
      data,
    });

    return consumer;
  }
}
