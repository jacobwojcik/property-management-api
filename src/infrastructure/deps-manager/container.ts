import { PrismaClient } from '@prisma/client';

import { AbstractContainer } from './container.abstract.js';
import { Registry, Dependencies } from './registry.js';
import { PropertyRepository } from '../../modules/property/repositories/property.repository.js';
import { WeatherService } from '../../modules/weather/services/weather.service.js';
import { PropertyService } from '../../modules/property/services/property.service.js';
import { Configuration } from '../../shared/config/config.js';

export class Container extends AbstractContainer {
  private static instance: Container;

  constructor() {
    super();
    this.registry = Registry.getInstance();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }

    return Container.instance;
  }

  async init(): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.$connect();

    const config = new Configuration();

    this.registry.register(Dependencies.PrismaClient, prisma);
    this.registry.register(Dependencies.Config, config);
    this.registry.register(Dependencies.Context, { prisma });

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

  get<T>(token: symbol): T {
    return this.registry.get<T>(token);
  }

  async disconnect(): Promise<void> {
    const prisma = this.get<PrismaClient>(Dependencies.PrismaClient);
    await prisma.$disconnect();
  }
}
