import type { PrismaClient } from '@prisma/client';

import { AbstractDepsContainer } from './deps-container.abstract.js';
import { Dependencies } from './registry.js';
import { PropertyRepository } from '../../modules/property/repositories/property.repository.js';
import { WeatherService } from '../../modules/weather/services/weather.service.js';
import { PropertyService } from '../../modules/property/services/property.service.js';
import { Configuration } from '../../shared/config/config.js';

export class DepsContainer extends AbstractDepsContainer {
  private static instance: DepsContainer;

  constructor() {
    super();
  }

  static getInstance(): DepsContainer {
    if (!DepsContainer.instance) {
      DepsContainer.instance = new DepsContainer();
    }

    return DepsContainer.instance;
  }

  async init(): Promise<void> {
    const config = new Configuration();
    const prisma = await this.initializeDatabase(config);

    this.registerBaseDependencies(prisma, config);
    this.registerServices(prisma, config);
  }

  private registerServices(prisma: PrismaClient, config: Configuration): void {
    this.registry.register(
      Dependencies.PropertyRepository,
      new PropertyRepository(prisma)
    );

    this.registry.register(
      Dependencies.WeatherService,
      new WeatherService(config.weather)
    );

    this.registry.register(
      Dependencies.PropertyService,
      new PropertyService(
        this.registry.get(Dependencies.PropertyRepository),
        this.registry.get(Dependencies.WeatherService)
      )
    );
  }
}
