import { container } from "tsyringe";

import { PrismaConsumersRepository } from "@/modules/consumers/infra/prisma/repositories/consumers-repository";
import { IConsumersRepository } from "@/modules/consumers/repositories/i-consumers-repository";

/**
 * onde for usada as injeções, ela faz todas as instâncias
 * necessárias para usar a class
 */
container.registerSingleton<IConsumersRepository>(
  "ConsumersRepository",
  PrismaConsumersRepository,
);
