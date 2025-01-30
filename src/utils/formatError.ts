import type { GraphQLFormattedError } from 'graphql';

import {
  ApplicationError,
  ValidationError,
} from '../shared/errors/base.error.js';
import { logger } from '../shared/logger/logger.js';

interface GraphQLErrorWithOriginal {
  originalError?: Error;
}

export function formatError(
  formattedError: GraphQLFormattedError,
  error: unknown
): GraphQLFormattedError {
  const originalError = (error as GraphQLErrorWithOriginal)?.originalError;

  if (originalError instanceof ValidationError) {
    logger.warn(
      {
        code: originalError.code,
        message: originalError.message,
        details: originalError.details,
      },
      'Validation error occurred'
    );

    return {
      message: originalError.message,
      extensions: {
        code: originalError.code,
        status: originalError.status,
        validationErrors: originalError.details,
      },
    };
  }

  if (originalError instanceof ApplicationError) {
    logger.error(
      {
        code: originalError.code,
        message: originalError.message,
        details: originalError.details,
      },
      'Application error occurred'
    );

    return {
      message: originalError.message,
      extensions: {
        code: originalError.code,
        status: originalError.status,
        details: originalError.details,
      },
    };
  }

  logger.error(
    {
      message: formattedError.message,
      extensions: formattedError.extensions,
      error: error instanceof Error ? error.stack : error,
    },
    'Unexpected error occurred'
  );

  return {
    message: formattedError.message,
    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
      ...formattedError.extensions,
    },
  };
}
