import { PrismaClient } from '@prisma/client';
import { Registry, Dependencies } from '../../src/infrastructure/deps-manager/registry';
import { Configuration } from '../../src/shared/config/config';
import { PropertyRepository } from '../../src/modules/property/repositories/property.repository';
import { WeatherService } from '../../src/modules/weather/services/weather.service';
import { PropertyService } from '../../src/modules/property/services/property.service';
import  { AbstractContainer } from '../../src/infrastructure/deps-manager/container.abstract';
import { mockWeatherData } from './mocks/weather.mock';

export class TestContainer extends AbstractContainer {
  private static testInstance: TestContainer;
  protected registry: Registry;

  private constructor() {
    super();
    this.registry = Registry.getInstance();
  }

  static getTestInstance(): TestContainer {
    if (!TestContainer.testInstance) {
      TestContainer.testInstance = new TestContainer();
    }
    return TestContainer.testInstance;
  }

  get<T>(token: symbol): T {
    return this.registry.get<T>(token);
  }

  async init(): Promise<void> {
    const config = new Configuration();

    if (!config.isTest()) {
      throw new Error('TestContainer must be initialized with NODE_ENV=test');
    }

    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: config.databaseUrl,
        },
      },
    });
    await prisma.$connect();

    this.registry.register(Dependencies.PrismaClient, prisma);
    this.registry.register(Dependencies.Config, config);
    this.registry.register(Dependencies.Context, { prisma });

    this.registry.register(
      Dependencies.PropertyRepository,
      new PropertyRepository(prisma)
    );

    const mockWeatherService: WeatherService = {
      getWeatherData: async () => mockWeatherData
    } as unknown as WeatherService;
    
    this.registry.register(Dependencies.WeatherService, mockWeatherService);
    
    this.registry.register(
      Dependencies.PropertyService,
      new PropertyService(
        this.registry.get(Dependencies.PropertyRepository),
        this.registry.get(Dependencies.WeatherService)
      )
    );
  }

  async cleanup(): Promise<void> {
    const prisma = this.get<PrismaClient>(Dependencies.PrismaClient);
    
    await prisma.$transaction([
      prisma.weatherData.deleteMany(),
      prisma.property.deleteMany(),
    ]);
  }

  async reset(): Promise<void> {
    await this.cleanup();
    this.registry = Registry.getInstance();
    await this.init();
  }

  async disconnect(): Promise<void> {
    const prisma = this.get<PrismaClient>(Dependencies.PrismaClient);
    await prisma.$disconnect();
  }
} 