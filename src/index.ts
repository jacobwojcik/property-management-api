import { Server } from './infrastructure/server/server.js';
import { Container } from './infrastructure/deps-manager/container.js';

const container = Container.getInstance();
const server = new Server(container);

server
  .listen()
  .then((url) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });
