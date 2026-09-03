import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import dotenv from 'dotenv';

dotenv.config();

const app = Fastify({ logger: false });

const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || '0.0.0.0';

async function start() {
  await app.register(cors, {
    origin: true,
  });

  await app.register(websocket);

  app.get('/health', async () => ({
    service: 'api',
    status: 'ok',
    timestamp: new Date().toISOString(),
    mode: 'paper',
  }));

  app.get('/api/health', async () => ({
    service: 'api',
    status: 'ok',
    timestamp: new Date().toISOString(),
    mode: 'paper',
  }));

  app.get('/api/status', async () => ({
    service: 'api',
    status: 'ok',
    mode: 'paper',
    timestamp: new Date().toISOString(),
    capabilities: ['watchlist', 'scanner', 'paper-trading'],
  }));

  app.get('/ws/market', { websocket: true }, (connection) => {
    connection.socket.send(
      JSON.stringify({
        type: 'connected',
        service: 'api',
        mode: 'paper',
        timestamp: new Date().toISOString(),
      }),
    );

    const interval = setInterval(() => {
      connection.socket.send(
        JSON.stringify({
          type: 'tick',
          symbol: 'RELIANCE',
          price: 2894 + Math.random() * 10,
          timestamp: new Date().toISOString(),
        }),
      );
    }, 5000);

    connection.socket.on('close', () => {
      clearInterval(interval);
    });
  });

  await app.listen({ port, host });
  console.log(`TradeLens API listening on http://${host}:${port}`);
}

start().catch((error) => {
  console.error('Failed to start API server', error);
  process.exit(1);
});
