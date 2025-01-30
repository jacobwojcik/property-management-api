import type { WeatherData } from '../../../graphql/types';

import {
  WeatherError,
  WeatherErrorType,
} from '../../../shared/errors/weather.error.js';

interface WeatherStackResponse {
  current: {
    temperature: number;
    weather_code: number;
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
    observation_time: string;
  };
  location: {
    lat: string;
    lon: string;
  };
  success?: boolean;
  error?: {
    code: number;
    type: string;
    info: string;
  };
}

interface IWeatherStackConfig {
  apiKey: string;
  baseUrl: string;
}

export class WeatherService {
  constructor(private config: IWeatherStackConfig) {
    if (!config.apiKey || !config.baseUrl) {
      throw new WeatherError(
        WeatherErrorType.CONFIGURATION_ERROR,
        'WeatherStack configuration is missing required values'
      );
    }
  }

  async getWeatherData(address: string): Promise<{
    weatherData: Omit<WeatherData, 'id' | 'propertyId' | 'lastUpdated'>;
    coordinates: { lat: number; long: number };
  }> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/current?access_key=${
          this.config.apiKey
        }&query=${encodeURIComponent(address)}`
      );

      if (!response.ok) {
        throw new WeatherError(
          WeatherErrorType.API_ERROR,
          `Weather API request failed with status: ${response.status}`
        );
      }

      const data = (await response.json()) as WeatherStackResponse;

      if (!data.success && data.error) {
        throw new WeatherError(
          WeatherErrorType.API_ERROR,
          `Weather API error: ${data.error.info} (Code: ${data.error.code})`
        );
      }

      if (!data.current || !data.location) {
        throw new WeatherError(
          WeatherErrorType.INVALID_RESPONSE,
          'Invalid weather data response format'
        );
      }

      return {
        weatherData: {
          temperature: data.current.temperature,
          weatherCode: data.current.weather_code,
          weatherDescriptions: data.current.weather_descriptions,
          windSpeed: data.current.wind_speed,
          windDegree: data.current.wind_degree,
          windDir: data.current.wind_dir,
          pressure: data.current.pressure,
          precip: data.current.precip,
          humidity: data.current.humidity,
          cloudCover: data.current.cloudcover,
          feelsLike: data.current.feelslike,
          uvIndex: data.current.uv_index,
          visibility: data.current.visibility,
          isDay: data.current.is_day,
          observationTime: data.current.observation_time,
        },
        coordinates: {
          lat: parseFloat(data.location.lat),
          long: parseFloat(data.location.lon),
        },
      };
    } catch (error) {
      if (error instanceof WeatherError) {
        throw error;
      }
      throw new WeatherError(
        WeatherErrorType.API_ERROR,
        `Failed to fetch weather data: ${(error as Error).message}`
      );
    }
  }
}
