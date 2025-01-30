import type { Prisma } from '@prisma/client';
import type { PropertyRepository } from '../repositories/property.repository.js';
import type {
  CreatePropertyInput,
  PropertyFilter,
  Property,
} from '../../../graphql/types';
import type { WeatherService } from '../../weather/services/weather.service.js';

import { PropertyNotFoundError } from '../../../shared/errors/property.errors.js';
import { createPropertySchema } from '../schema/property.schema.js';
import { ValidationError } from '../../../shared/errors/base.error.js';
import { formatZodError } from '../../../utils/formatZodError.js';

export class PropertyService {
  constructor(
    private propertyRepository: PropertyRepository,
    private weatherService: WeatherService
  ) {}

  async getProperties({
    sortBy,
    sortOrder,
    filter,
    page = 1,
    pageSize = 10,
  }: {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: PropertyFilter;
    page?: number;
    pageSize?: number;
  }): Promise<{
    properties: Property[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      currentPage: number;
      totalPages: number;
    };
    totalCount: number;
  }> {
    const { properties, totalCount } = await this.propertyRepository.findMany(
      filter
        ? {
            city: filter.city ?? undefined,
            state: filter.state ?? undefined,
            zipCode: filter.zipCode ?? undefined,
          }
        : undefined,
      sortBy,
      sortOrder,
      page,
      pageSize
    );

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      properties,
      pageInfo: {
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        currentPage: page,
        totalPages,
      },
      totalCount,
    };
  }

  async getProperty(id: string): Promise<Property> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new PropertyNotFoundError(id);
    }

    return property;
  }

  async createProperty(input: CreatePropertyInput): Promise<Property> {
    const validationResult = createPropertySchema.safeParse(input);

    if (!validationResult.success) {
      throw new ValidationError(
        'Invalid property data',
        formatZodError(validationResult.error)
      );
    }

    const address = `${input.street}, ${input.city}, ${input.state} ${input.zipCode}`;
    const { weatherData, coordinates } =
      await this.weatherService.getWeatherData(address);

    const data: Prisma.PropertyCreateInput = {
      ...input,
      lat: coordinates.lat,
      long: coordinates.long,
      weatherData: {
        create: weatherData,
      },
    };

    return this.propertyRepository.create(data);
  }

  async deleteProperty(id: string): Promise<boolean> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new PropertyNotFoundError(id);
    }

    return this.propertyRepository.delete(id);
  }
}
