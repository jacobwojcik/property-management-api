import type { PrismaClient, Prisma } from '@prisma/client';
import type { PropertyFilter } from '../schema/property.schema';
import type { IPropertyRepository } from './property.repository.interface';
import type { Property } from '../../../graphql/types';

export class PropertyRepository implements IPropertyRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(
    filter?: PropertyFilter,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
    page = 1,
    pageSize = 10
  ): Promise<{
    properties: Property[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      currentPage: number;
      totalPages: number;
    };
    totalCount: number;
  }> {
    const where: Prisma.PropertyWhereInput = {
      ...(filter?.city != null && { city: filter.city }),
      ...(filter?.state != null && { state: filter.state }),
      ...(filter?.zipCode != null && { zipCode: filter.zipCode }),
    };

    const [items, totalCount] = await Promise.all([
      this.prisma.property.findMany({
        where,
        orderBy: sortBy === 'CREATED_AT' ? { createdAt: sortOrder } : undefined,
        include: { weatherData: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.property.count({ where }),
    ]);

    const pageInfo = {
      hasNextPage: page * pageSize < totalCount,
      hasPreviousPage: page > 1,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
    };

    return { properties: items, pageInfo, totalCount };
  }

  async findById(id: string): Promise<Property | null> {
    return this.prisma.property.findUnique({
      where: { id },
      include: { weatherData: true },
    });
  }

  async create(data: Prisma.PropertyCreateInput): Promise<Property> {
    return this.prisma.property.create({
      data,
      include: { weatherData: true },
    });
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.property.delete({ where: { id } });

      return true;
    } catch {
      return false;
    }
  }
}
