import type { Resolvers } from '../../../graphql/types';
import type { AbstractDepsContainer } from '../../../infrastructure/deps-manager/deps-container.abstract.js';
import type { PropertyService } from '../services/property.service.js';

import { Dependencies } from '../../../infrastructure/deps-manager/registry.js';

export const createPropertyResolvers = (
  container: AbstractDepsContainer
): Resolvers => {
  const propertyService = container.get<PropertyService>(
    Dependencies.PropertyService
  );

  return {
    Query: {
      getProperties: async (
        _,
        { sortBy, sortOrder, filter, page, pageSize }
      ) => {
        return propertyService.getProperties({
          sortBy: sortBy?.toString(),
          sortOrder: sortOrder?.toLowerCase() as 'asc' | 'desc',
          filter: filter ?? undefined,
          page,
          pageSize,
        });
      },
      getProperty: async (_, { id }) => {
        return propertyService.getProperty(id);
      },
    },
    Mutation: {
      createProperty: async (_, { input }) => {
        return propertyService.createProperty(input);
      },
      deleteProperty: async (_, { id }) => {
        return propertyService.deleteProperty(id);
      },
    },
  };
};
