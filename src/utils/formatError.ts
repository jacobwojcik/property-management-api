import type { GraphQLFormattedError } from 'graphql';

import { ApplicationError } from '../shared/errors/base.error.js';

export function formatError(
  formattedError: GraphQLFormattedError,
  error: unknown
): GraphQLFormattedError {
  if (error instanceof ApplicationError) {
    return {
      message: error.message,
      extensions: {
        code: error.code,
        status: error.status,
      },
    };
  }

  return formattedError;
}
