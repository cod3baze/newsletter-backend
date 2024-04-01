export class EmailsPageNotFoundError extends Error {
  public readonly status: number;

  public readonly message: string;

  constructor() {
    super();

    this.status = 404;
    this.message = "Página não encontrada.";
    super.message = this.message;
  }
}
