import pino from 'pino';

export class Logger {
  private static instance: pino.Logger;

  private static getLoggerConfig(): pino.LoggerOptions {
    return {
      level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'UTC:yyyy-mm-dd HH:MM:ss',
          messageFormat: '{msg}',
          ignore: 'pid,hostname',
          singleLine: true,
          hideObject: false,
        },
      },
    };
  }

  static getInstance(): pino.Logger {
    if (!this.instance) {
      const loggerConfig = this.getLoggerConfig();
      this.instance = pino(loggerConfig);
    }

    return this.instance;
  }
}

export const logger = Logger.getInstance();
