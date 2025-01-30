import type { ApolloServerPlugin } from '@apollo/server';

import { logger } from '../../../shared/logger/logger.js';

const MAX_QUERY_LENGTH = 100;

const formatQuery = (
  query: string | undefined,
  operationName: string | undefined
): string | undefined => {
  if (!query) return undefined;
  if (operationName === 'IntrospectionQuery') return undefined;
  if (query.length > MAX_QUERY_LENGTH) {
    return `${query.slice(0, MAX_QUERY_LENGTH)}...`;
  }

  return query;
};

export const loggingPlugin: ApolloServerPlugin = {
  async requestDidStart({ request }) {
    const startTime = Date.now();
    const formattedQuery = formatQuery(request.query, request.operationName);

    logger.info(
      {
        operation: request.operationName,
        ...(formattedQuery && { query: formattedQuery }),
        ...(request.variables &&
          Object.keys(request.variables).length > 0 && {
            variables: request.variables,
          }),
      },
      'GraphQL operation started'
    );

    return {
      async willSendResponse({ response }) {
        const duration = Date.now() - startTime;
        logger.info(
          {
            operation: request.operationName,
            duration,
            ...(response.body.kind === 'single' &&
              response.body.singleResult.errors && {
                errors: response.body.singleResult.errors,
              }),
          },
          'GraphQL operation completed'
        );
      },
    };
  },
};
