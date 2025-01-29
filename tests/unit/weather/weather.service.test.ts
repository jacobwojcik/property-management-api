import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WeatherService } from '../../../src/modules/weather/services/weather.service';
import { WeatherError } from '../../../src/shared/errors/weather.error';
import { mockWeatherData } from '../../helpers/mocks/weather.mock';
import { createMockWeatherApi, createMockWeatherResponse } from '../../helpers/mocks/weather.mock';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let mockWeatherApi: ReturnType<typeof createMockWeatherApi>;

  beforeEach(() => {
    mockWeatherApi = createMockWeatherApi();
    weatherService = new WeatherService(mockWeatherApi);
    
    vi.resetModules();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getWeatherData', () => {
    const mockAddress = '123 Test St, Test City, NY 12345';

    it('should return weather data for valid address', async () => {
      global.fetch = vi.fn().mockResolvedValue(createMockWeatherResponse());

      const result = await weatherService.getWeatherData(mockAddress);

      expect(result).toEqual(mockWeatherData);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(encodeURIComponent(mockAddress))
      );
    });

    it('should throw WeatherError when API request fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(weatherService.getWeatherData(mockAddress))
        .rejects.toThrow(WeatherError);
    });

    it('should throw WeatherError when API returns error response', async () => {
      global.fetch = vi.fn().mockResolvedValue(createMockWeatherResponse({
        success: false,
        error: {
          code: 101,
          type: 'invalid_access_key',
          info: 'Invalid API key',
        }
      }));

      await expect(weatherService.getWeatherData(mockAddress))
        .rejects.toThrow(WeatherError);
    });

    it('should throw WeatherError when response format is invalid', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await expect(weatherService.getWeatherData(mockAddress))
        .rejects.toThrow(WeatherError);
    });
  });
}); 