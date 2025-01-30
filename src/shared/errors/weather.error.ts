import { ApplicationError, ErrorCode } from './base.error.js';

export enum WeatherErrorType {
  API_ERROR = 'API_ERROR',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
  RATE_LIMIT = 'RATE_LIMIT',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',
}

export class WeatherError extends ApplicationError {
  constructor(type: WeatherErrorType, message: string, details?: unknown) {
    super(ErrorCode.WEATHER_ERROR, message, 503, { type, details });
  }
}
