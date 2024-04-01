import { Prisma } from "@prisma/client";
import { RegisterConsumerDTO } from "../dtos/register-consumer-dto";

export type ListConsumersType = {
  page: number;
  items_per_page: number;
};

export interface IConsumersRepository {
  register: (data: RegisterConsumerDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<Prisma.ConsumerCreateInput | null>;
  listConsumers: (
    data: ListConsumersType,
  ) => Promise<Prisma.ConsumerCreateInput[] | null>;
}
