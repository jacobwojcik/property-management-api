import { Server } from './infrastructure/server/server.js';
import { DepsContainer } from './infrastructure/deps-manager/deps-container.js';

const container = DepsContainer.getInstance();
const server = new Server(container);

server
  .listen()
  .then((url) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });
