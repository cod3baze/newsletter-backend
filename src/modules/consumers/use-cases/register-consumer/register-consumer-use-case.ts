import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IConsumersRepository } from "../../repositories/i-consumers-repository";
import { RegisterConsumerDTO } from "../../dtos/register-consumer-dto";

@injectable()
class RegisterConsumerUseCase {
  constructor(
    @inject("ConsumersRepository")
    private consumersRepository: IConsumersRepository,
  ) {}

  async execute(data: RegisterConsumerDTO) {
    if (!data?.id) {
      data.id = uuidV4();
    }

    await this.consumersRepository.register(data);
  }
}

export { RegisterConsumerUseCase };
