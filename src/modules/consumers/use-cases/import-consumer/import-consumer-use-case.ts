import { parse } from "csv-parse";
import fs from "node:fs";
import { injectable, inject } from "tsyringe";

import { deleteFile } from "@/utils/delete-file";
import { IConsumersRepository } from "../../repositories/i-consumers-repository";

interface IConsumerEmail {
  email: string;
  country?: string;
}

@injectable()
class ImportConsumerUseCase {
  constructor(
    @inject("ConsumersRepository")
    private consumersRepository: IConsumersRepository,
  ) {}

  loadConsumer(file: Express.Multer.File): Promise<IConsumerEmail[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const consumers: IConsumerEmail[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [email, country] = line;
          consumers.push({
            email,
            country,
          });
        })
        .on("end", () => {
          deleteFile(file.path);
          resolve(consumers);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const consumers = await this.loadConsumer(file);

    consumers.map(async (consumer) => {
      const { email, country } = consumer;

      console.log(consumer);

      const consumerAlreadyExists =
        await this.consumersRepository.findByEmail(email);

      if (!consumerAlreadyExists) {
        await this.consumersRepository.register({ email, country });
      }
    });
  }
}

export { ImportConsumerUseCase };
