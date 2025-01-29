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

  register<T>(token: symbol, implementation: T): void {
    this.containers.set(token, implementation);
  }

  get<T>(token: symbol): T {
    const implementation = this.containers.get(token);
    if (!implementation) {
      throw new Error(`No implementation found for token: ${token.toString()}`);
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
