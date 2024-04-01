import { inject, injectable } from "tsyringe";

import { IConsumersRepository } from "../../repositories/i-consumers-repository";

interface ConsumerRequest {
  page: number;
}

@injectable()
class GetAllConsumersUseCase {
  constructor(
    @inject("ConsumersRepository")
    private consumersRepository: IConsumersRepository,
  ) {}

  async execute({ page }: ConsumerRequest) {
    const consumers = await this.consumersRepository.listConsumers({
      page,
      items_per_page: 10,
    });

    return consumers;
  }
}

export { GetAllConsumersUseCase };
