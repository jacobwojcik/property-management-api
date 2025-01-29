import { ApplicationError } from './base.error.js';

export class WeatherError extends ApplicationError {
  constructor(message: string) {
    super('WEATHER_ERROR', message, 503);
  }
}
