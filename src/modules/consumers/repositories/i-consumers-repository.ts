import { RegisterConsumerDTO } from "../dtos/register-consumer-dto";

export interface IConsumersRepository {
  register: (data: RegisterConsumerDTO) => Promise<void>;
}
