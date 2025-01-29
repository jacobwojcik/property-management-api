import { vi } from 'vitest';

export const mockWeatherData = {
    weatherData: {
      temperature: 20,
      weatherCode: 113,
      weatherDescriptions: ['Sunny'],
      windSpeed: 5,
      windDegree: 180,
      windDir: 'S',
      pressure: 1012,
      precip: 0,
      humidity: 50,
      cloudCover: 0,
      feelsLike: 21,
      uvIndex: 5,
      visibility: 10,
      isDay: 'yes',
      observationTime: '12:00 PM'
    },
    coordinates: {
      lat: 40.7128,
      long: -74.0060
    }
  };


export const createMockWeatherApi = () => ({
  apiKey: 'test-api-key',
  baseUrl: 'https://api.weatherstack.com',
  getCurrentWeather: vi.fn(),
  geocodeAddress: vi.fn(),
});

export const createMockWeatherResponse = (override = {}) => ({
  ok: true,
  json: () => Promise.resolve({
    current: {
      temperature: mockWeatherData.weatherData.temperature,
      weather_code: mockWeatherData.weatherData.weatherCode,
      weather_descriptions: mockWeatherData.weatherData.weatherDescriptions,
      wind_speed: mockWeatherData.weatherData.windSpeed,
      wind_degree: mockWeatherData.weatherData.windDegree,
      wind_dir: mockWeatherData.weatherData.windDir,
      pressure: mockWeatherData.weatherData.pressure,
      precip: mockWeatherData.weatherData.precip,
      humidity: mockWeatherData.weatherData.humidity,
      cloudcover: mockWeatherData.weatherData.cloudCover,
      feelslike: mockWeatherData.weatherData.feelsLike,
      uv_index: mockWeatherData.weatherData.uvIndex,
      visibility: mockWeatherData.weatherData.visibility,
      is_day: mockWeatherData.weatherData.isDay,
      observation_time: mockWeatherData.weatherData.observationTime
    },
    location: {
      lat: mockWeatherData.coordinates.lat.toString(),
      lon: mockWeatherData.coordinates.long.toString(),
    },
    ...override
  }),
});
