import type { Prisma } from '@prisma/client';
import type { PropertyFilter } from '../schema/property.schema';
import type { Property } from '../../../graphql/types';

export interface IPropertyRepository {
  findMany(
    filter?: PropertyFilter,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
    page?: number,
    pageSize?: number
  ): Promise<{
    properties: Property[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      currentPage: number;
      totalPages: number;
    };
    totalCount: number;
  }>;
  findById(id: string): Promise<Property | null>;
  create(data: Prisma.PropertyCreateInput): Promise<Property>;
}
