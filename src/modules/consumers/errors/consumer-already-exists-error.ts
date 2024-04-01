export class ConsumerAlreadyExistsError extends Error {
  public readonly status: number;

  public readonly message: string;

  constructor() {
    super();

    this.status = 401;
    this.message = "E-mail already registered.";
    super.message = this.message;
  }
}
