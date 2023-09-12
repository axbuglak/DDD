'use strict';

const http = require('node:http');

const HEADERS = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=UTF-8',
};

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

const httpServer = {
  pure: (routing, port, console) => {
    http.createServer(async (req, res) => {
      res.writeHead(200, HEADERS);
      const { url, socket } = req;
      const [name, method, id] = url.substring(1).split('/');
      const entity = routing[name];
      if (!entity) return void res.end('Not found');
      const handler = entity[method];
      if (!handler) return void res.end('Not found');
      const src = handler.toString();
      const signature = src.substring(0, src.indexOf(')'));
      const args = [];
      if (signature.includes('(id')) args.push(id);
      if (signature.includes('{')) args.push(await receiveArgs(req));
      console.log(`${socket.remoteAddress} ${method} ${url}`);
      const result = await handler(...args);
      res.end(JSON.stringify(result.rows));
    }).listen(port);

    console.log(`API on port ${port}`);
  },
  fastify: (server, routing, PORT) => {
    for (const [name, methods] of Object.entries(routing)) {
      for (const [method, handler] of Object.entries(methods)) {
        if (handler && typeof handler !== 'function') {
          continue;
        }

        server.post(`/${name}/${method}/:id`, async (req, res) => {
          const { url, socket } = req;
          const src = handler.toString();
          const signature = src.substring(0, src.indexOf(')'));
          const args = [];
          if (signature.includes('(id')) args.push(req.params.id);
          if (signature.includes('{') && !req.body) return void res.send('You should send params');
          args.push(req.body);
          console.log(`${socket.remoteAddress} ${method} ${url}`);
          const result = await handler(...args);
          res.send(result.rows);
        });
      }
    }
    server.listen({ port: PORT }, (err) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
    });
    console.log(`Fastify HTTP run on ${PORT}`);
  }
};

module.exports = (framework) => httpServer[framework];
