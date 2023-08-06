export interface CustomErrorOptions {
  id?: string;
}

export class CustomError extends Error {
  public readonly id?: string;

  constructor(message: string, { id }: CustomErrorOptions = {}) {
    super(message);
    this.id = id;
  }
}
