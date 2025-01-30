import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PropertyService } from '../../../src/modules/property/services/property.service';
import { ValidationError } from '../../../src/shared/errors/base.error';
import { mockProperty } from '../../helpers/mocks/property.mock';
import { mockWeatherData } from '../../helpers/mocks/weather.mock';
import { PropertyRepository } from '../../../src/modules/property/repositories/property.repository';
import { WeatherService } from '../../../src/modules/weather/services/weather.service';
import { Mocked } from 'vitest';
import { PropertyNotFoundError } from '../../../src/shared/errors/property.errors.js';

describe('PropertyService', () => {
  let propertyService: PropertyService;
  let mockPropertyRepository: Mocked<PropertyRepository>;
  let mockWeatherService: Mocked<WeatherService>;

  beforeEach(() => {
    mockPropertyRepository = {
      findMany: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    } as unknown as Mocked<PropertyRepository>;

    mockWeatherService = {
      getWeatherData: vi.fn(),
    } as unknown as Mocked<WeatherService>;

    mockWeatherService.getWeatherData = vi.fn();

    propertyService = new PropertyService(
      mockPropertyRepository,
      mockWeatherService
    );
  });

  describe('getProperties', () => {
    it('should return paginated properties', async () => {
      const mockResponse = {
        properties: [mockProperty],
        totalCount: 1,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          currentPage: 1,
          totalPages: 1,
        },
      };

      mockPropertyRepository.findMany.mockResolvedValue(mockResponse);

      const result = await propertyService.getProperties({
        page: 1,
        pageSize: 10,
      });

      expect(result.properties).toHaveLength(1);
      expect(result.totalCount).toBe(1);
      expect(result.pageInfo.currentPage).toBe(1);
      expect(mockPropertyRepository.findMany).toHaveBeenCalledWith(
        undefined,
        undefined,
        undefined,
        1,
        10
      );
    });
    it('should apply filters correctly', async () => {
      mockPropertyRepository.findMany.mockResolvedValue({
        properties: [mockProperty],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          currentPage: 1,
          totalPages: 1,
        },
        totalCount: 1,
      });

      await propertyService.getProperties({
        filter: { city: 'Test City' },
      });

      expect(mockPropertyRepository.findMany).toHaveBeenCalledWith(
        { city: 'Test City' },
        undefined,
        undefined,
        1,
        10
      );
    });
  });

  describe('createProperty', () => {
    it('should create a property with weather data', async () => {
      const input = {
        street: '123 Test St',
        city: 'Test City',
        state: 'NY',
        zipCode: '12345',
      };

      mockWeatherService.getWeatherData.mockResolvedValue(mockWeatherData);
      mockPropertyRepository.create.mockResolvedValue(mockProperty);

      const result = await propertyService.createProperty(input);

      expect(result).toEqual(mockProperty);
      expect(mockWeatherService.getWeatherData).toHaveBeenCalled();
      expect(mockPropertyRepository.create).toHaveBeenCalled();
    });

    it('should throw validation error for invalid input', async () => {
      const invalidInput = {
        street: '',
        city: '',
        state: 'NY',
        zipCode: '123',
      };

      await expect(
        propertyService.createProperty(invalidInput)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('getProperty', () => {
    it('should return property by id', async () => {
      mockPropertyRepository.findById.mockResolvedValue(mockProperty);

      const result = await propertyService.getProperty('1');

      expect(result).toEqual(mockProperty);
      expect(mockPropertyRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw PropertyNotFoundError for non-existent property', async () => {
      mockPropertyRepository.findById.mockResolvedValue(null);

      await expect(propertyService.getProperty('999')).rejects.toThrow(
        PropertyNotFoundError
      );
      expect(mockPropertyRepository.findById).toHaveBeenCalledWith('999');
    });
  });

  describe('deleteProperty', () => {
    it('should delete property successfully', async () => {
      mockPropertyRepository.findById.mockResolvedValue(mockProperty);
      mockPropertyRepository.delete.mockResolvedValue(true);

      const result = await propertyService.deleteProperty('1');

      expect(result).toBe(true);
      expect(mockPropertyRepository.findById).toHaveBeenCalledWith('1');
      expect(mockPropertyRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should return false when property deletion fails', async () => {
      mockPropertyRepository.findById.mockResolvedValue(mockProperty);
      mockPropertyRepository.delete.mockResolvedValue(false);

      const result = await propertyService.deleteProperty('999');

      expect(result).toBe(false);
      expect(mockPropertyRepository.findById).toHaveBeenCalledWith('999');
      expect(mockPropertyRepository.delete).toHaveBeenCalledWith('999');
    });

    it('should throw PropertyNotFoundError when trying to delete non-existent property', async () => {
      mockPropertyRepository.findById.mockResolvedValue(null);

      await expect(propertyService.deleteProperty('999')).rejects.toThrow(
        PropertyNotFoundError
      );
      expect(mockPropertyRepository.findById).toHaveBeenCalledWith('999');
      expect(mockPropertyRepository.delete).not.toHaveBeenCalled();
    });
  });
});
