export class Registry {
  private static instance: Registry;
  private containers = new Map<symbol, unknown>();

  private constructor() {}

  static getInstance(): Registry {
    if (!Registry.instance) {
      Registry.instance = new Registry();
    }

    return Registry.instance;
  }

  static clear(): void {
    Registry.instance = new Registry();
  }

  register<T>(deps: symbol, implementation: T): void {
    this.containers.set(deps, implementation);
  }

  get<T>(deps: symbol): T {
    const implementation = this.containers.get(deps);
    if (!implementation) {
      throw new Error(`No implementation found for deps: ${deps.toString()}`);
    }

    return implementation as T;
  }
}

export const Dependencies = {
  PrismaClient: Symbol('PrismaClient'),
  PropertyRepository: Symbol('PropertyRepository'),
  WeatherService: Symbol('WeatherService'),
  PropertyService: Symbol('PropertyService'),
  Context: Symbol('Context'),
  Config: Symbol('Config'),
} as const;
