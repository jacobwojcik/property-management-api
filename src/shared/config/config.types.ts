export interface IConfig {
  readonly databaseUrl: string;
  readonly serverPort: number;
  readonly weatherstack: {
    readonly apiKey: string;
    readonly baseUrl: string;
  };
}
