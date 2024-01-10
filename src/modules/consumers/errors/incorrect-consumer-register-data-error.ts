export class IncorrectConsumerRegisterDataError extends Error {
  public readonly status: number;

  public readonly message: string;

  constructor() {
    super();

    this.status = 401;
    this.message = "E-mail or data mal formatted.";
    super.message = this.message;
  }
}
