import pino from 'pino';

import type { Configuration } from '../config/config';

export class Logger {
  private static instance: pino.Logger;

  private static getLoggerConfig(config?: Configuration): pino.LoggerOptions {
    const isTestEnv = config?.isTest() ?? false;

    return {
      level: isTestEnv ? 'silent' : 'info',
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

  static getInstance(config?: Configuration): pino.Logger {
    if (!this.instance) {
      const loggerConfig = this.getLoggerConfig(config);
      this.instance = pino(loggerConfig);
    }

    return this.instance;
  }
}

export const logger = Logger.getInstance();
