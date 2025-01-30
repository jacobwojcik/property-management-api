import type { ValidationErrorDetail } from '../../utils/formatZodError.js';

export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  WEATHER_ERROR = 'WEATHER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export class ApplicationError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public status: number = 400,
    public details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      status: this.status,
      details: this.details,
    };
  }
}

export class ValidationError extends ApplicationError {
  constructor(
    message: string,
    public details: ValidationErrorDetail[]
  ) {
    super(ErrorCode.VALIDATION_ERROR, message, 400, details);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
