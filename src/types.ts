import type {
  PrismaClient,
  Property as PrismaProperty,
  WeatherData as PrismaWeatherData,
} from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
}

export type { PrismaProperty, PrismaWeatherData };
