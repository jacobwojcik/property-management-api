import { PrismaClient } from '@prisma/client';

import type { Configuration } from '../../shared/config/config.js';

import { Registry, Dependencies } from './registry.js';

export abstract class AbstractDepsContainer {
  protected registry!: Registry;

  constructor() {
    this.registry = Registry.getInstance();
  }

  abstract init(): Promise<void>;

  get<T>(dependency: symbol): T {
    return this.registry.get<T>(dependency);
  }
  protected async initializeDatabase(
    config: Configuration
  ): Promise<PrismaClient> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: config.databaseUrl,
        },
      },
    });
    await prisma.$connect();

    return prisma;
  }

  protected registerBaseDependencies(
    prisma: PrismaClient,
    config: Configuration
  ): void {
    this.registry.register(Dependencies.PrismaClient, prisma);
    this.registry.register(Dependencies.Config, config);
    this.registry.register(Dependencies.Context, { prisma });
  }

  async disconnect(): Promise<void> {
    const prisma = this.get<PrismaClient>(Dependencies.PrismaClient);
    await prisma.$disconnect();
  }
}
