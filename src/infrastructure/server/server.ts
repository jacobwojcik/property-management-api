import { readFileSync } from 'fs';
import { resolve } from 'path';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import type { Context } from '../../types';
import type { Configuration } from '../../shared/config/config.js';
import type { IContainer } from '../deps-manager/container.abstract';

import { createPropertyResolvers } from '../../modules/property/resolvers/property.resolvers.js';
import { Dependencies } from '../deps-manager/registry.js';
import { formatError } from '../../utils/formatError.js';

export class Server {
  private server!: ApolloServer<Context>;
  private container: IContainer;

  constructor(container: IContainer) {
    this.container = container;
  }

  private initServer() {
    const typeDefs = this.loadTypeDefs();
    const resolvers = this.createResolvers();

    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      formatError,
    });
  }

  private loadTypeDefs(): string {
    return readFileSync(resolve('src/graphql/schema.graphql'), 'utf-8');
  }

  private createResolvers() {
    const { Query: propertyQuery, Mutation: propertyMutation } =
      createPropertyResolvers(this.container);

    return {
      Query: {
        ...propertyQuery,
      },
      Mutation: {
        ...propertyMutation,
      },
    };
  }

  get apollo() {
    return this.server;
  }

  async initialize() {
    await this.container.init();
    this.initServer();
  }

  async listen(): Promise<string> {
    await this.container.init();
    this.initServer();

    const { url } = await startStandaloneServer(this.server, {
      context: async () => {
        return this.container.get<Context>(Dependencies.Context);
      },
      listen: {
        port: this.container.get<Configuration>(Dependencies.Config).serverPort,
      },
    });

    return url;
  }

  async shutdown(): Promise<void> {
    await this.container.disconnect();
    await this.server?.stop();
  }
}
