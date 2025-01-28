import { readFileSync } from 'fs';
import { resolve } from 'path';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

import type { Resolvers } from './generated/graphql';

const prisma = new PrismaClient();

const typeDefs = readFileSync(resolve('src/schema/schema.graphql'), 'utf-8');

const resolvers: Resolvers = {
  Query: {},
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({}) => ({ prisma }),
});

console.log(`🚀  Server ready at: ${url}`);
