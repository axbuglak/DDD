'use strict';

const { Server } = require('ws');

const wsMessageGetFunction = async (routing, connection,  ip, message) => {
  const obj = JSON.parse(message);
  const { name, method, args = [] } = obj;
  const entity = routing[name];
  if (!entity) {
    connection.send('"Not found"', { binary: false });
    return;
  }
  const handler = entity[method];
  if (!handler) {
    connection.send('"Not found"', { binary: false });
    return;
  }
  const json = JSON.stringify(args);
  const parameters = json.substring(1, json.length - 1);
  console.log(`${ip} ${name}.${method}(${parameters})`);
  try {
    const result = await handler(...args);
    connection.send(JSON.stringify(result.rows), { binary: false });
  } catch (err) {
    console.error(err);
    connection.send('"Server error"', { binary: false });
  }
};

const wsServer = {
  pure: (routing, port, console) => {
    const ws = new Server({ port });

    ws.on('connection', (connection, req) => {
      const ip = req.socket.remoteAddress;
      connection.on('message', async (message) => {
        wsMessageGetFunction(routing, connection, ip, message);
      });
    });

    console.log(`API on port ${port}`);
  },
  fastify: (server, routing, PORT) => {
    const websocket = require('@fastify/websocket');
    server.register(websocket);
    server.register(async (server) => {
      server.get('/', { websocket: true },
        (connection, req /* SocketStream */ /* req: FastifyRequest */) => {
          const ip = req.socket.remoteAddress;
          connection.socket.on('message', async (message) => {
            wsMessageGetFunction(routing, connection.socket, ip, message);
          });
        },
      );
    });
    server.listen({ port: PORT }, (err) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
    });
    console.dir(`Fistify serve run on ${PORT}`);
  }
};

module.exports = (framework) => wsServer[framework];
