export class ApplicationError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number = 400
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends ApplicationError {
  constructor(
    message: string,
    public details: unknown[]
  ) {
    super('VALIDATION_ERROR', message, 400);
    this.details = details;
  }
}
