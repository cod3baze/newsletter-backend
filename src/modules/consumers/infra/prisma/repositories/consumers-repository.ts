import { prisma } from "@/shared/infra/prisma";
import {
  IConsumersRepository,
  ListConsumersType,
} from "@/modules/consumers/repositories/i-consumers-repository";
import { RegisterConsumerDTO } from "@/modules/consumers/dtos/register-consumer-dto";

export class PrismaConsumersRepository implements IConsumersRepository {
  async register(data: RegisterConsumerDTO) {
    await prisma.consumer.create({
      data,
    });
  }

  async findByEmail(email: string) {
    const consumer = await prisma.consumer.findUnique({
      where: { email },
    });

    return consumer;
  }

  async listConsumers({ page, items_per_page }: ListConsumersType) {
    const totalEmails = await prisma.consumer.count();
    const totalPages = Math.ceil(totalEmails / items_per_page);

    if (page > totalPages) {
      return [];
    }
    if (page === 0) page = 1;

    const consumer = await prisma.consumer.findMany({
      take: items_per_page,
      skip: (page - 1) * items_per_page,
      orderBy: { id: "asc" },
    });

    return consumer;
  }
}
