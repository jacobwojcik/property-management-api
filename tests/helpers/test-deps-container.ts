import { AbstractDepsContainer } from '../../src/infrastructure/deps-manager/deps-container.abstract';
import {
  Registry,
  Dependencies,
} from '../../src/infrastructure/deps-manager/registry';
import { Configuration } from '../../src/shared/config/config';
import { PropertyRepository } from '../../src/modules/property/repositories/property.repository';
import { WeatherService } from '../../src/modules/weather/services/weather.service';
import { PropertyService } from '../../src/modules/property/services/property.service';
import { mockWeatherData } from './mocks/weather.mock';
import { PrismaClient } from '@prisma/client';

export class TestDepsContainer extends AbstractDepsContainer {
  private static testInstance: TestDepsContainer;

  static getTestInstance(): TestDepsContainer {
    if (!TestDepsContainer.testInstance) {
      TestDepsContainer.testInstance = new TestDepsContainer();
    }
    return TestDepsContainer.testInstance;
  }

  async init(): Promise<void> {
    const config = new Configuration();

    if (!config.isTest()) {
      throw new Error(
        'TestDepsContainer must be initialized with NODE_ENV=test'
      );
    }

    const prisma = await this.initializeDatabase(config);

    this.registerBaseDependencies(prisma, config);
    this.registerTestServices(prisma);
  }

  private registerTestServices(prisma: PrismaClient): void {
    this.registry.register(
      Dependencies.PropertyRepository,
      new PropertyRepository(prisma)
    );

    const mockWeatherService: WeatherService = {
      getWeatherData: async () => mockWeatherData,
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
}
