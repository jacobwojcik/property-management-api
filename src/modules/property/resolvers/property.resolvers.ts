import type { Resolvers } from '../../../graphql/graphql';
import type { AbstractContainer } from '../../../infrastructure/deps-manager/container.abstract.js';
import type { PropertyService } from '../services/property.service.js';

import { Dependencies } from '../../../infrastructure/deps-manager/registry.js';

export const createPropertyResolvers = (
  container: AbstractContainer
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
