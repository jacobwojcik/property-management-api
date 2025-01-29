import { z } from 'zod';

const configSchema = z.object({
  database: z.object({
    url: z.string().url(),
  }),
  server: z.object({
    port: z.number().default(4000),
  }),
  weather: z.object({
    apiKey: z.string().min(1),
    baseUrl: z.string().url().default('http://api.weatherstack.com'),
  }),
  environment: z.enum(['dev', 'test']).default('dev'),
});

export type Config = z.infer<typeof configSchema>;

export class Configuration {
  private readonly config: Config;

  constructor(env = process.env) {
    const environment = env.NODE_ENV || 'dev';
    const databaseUrl =
      environment === 'test' ? env.TEST_DATABASE_URL : env.DATABASE_URL;

    const parsed = configSchema.safeParse({
      database: {
        url: databaseUrl,
      },
      server: {
        port: environment === 'test' ? 4001 : Number(env.PORT) || 4000,
      },
      weather: {
        apiKey: env.WEATHERSTACK_API_KEY,
        baseUrl: env.WEATHERSTACK_API_URL ?? 'http://api.weatherstack.com',
      },
      environment,
    });

    if (!parsed.success) {
      throw new Error(`Configuration error: ${parsed.error.message}`);
    }

    if (environment === 'test' && !databaseUrl?.includes('test')) {
      throw new Error('Test environment must use test database');
    }

    this.config = parsed.data;
  }

  get databaseUrl(): string {
    return this.config.database.url;
  }

  get serverPort(): number {
    return this.config.server.port;
  }

  get weather() {
    return {
      apiKey: this.config.weather.apiKey,
      baseUrl: this.config.weather.baseUrl,
    };
  }

  get environment(): string {
    return this.config.environment;
  }

  isTest(): boolean {
    return this.config.environment === 'test';
  }
}
