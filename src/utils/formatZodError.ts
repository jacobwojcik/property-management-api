import type { ZodError } from 'zod';

export interface ValidationErrorDetail {
  message: string;
  path: string[];
}

export function formatZodError(error: ZodError): ValidationErrorDetail[] {
  return error.errors.map((err) => ({
    message: err.message,
    path: err.path.map(String),
  }));
}
