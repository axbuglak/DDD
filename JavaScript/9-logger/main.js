'use strict';

const config = require('./config.js');
const fsp = require('node:fs').promises;
const path = require('node:path');
const server = require('./ws.js');
const staticServer = require('./static.js');
const load = require('./load.js')(config.sandbox);
const db = require('./db.js')(config.pg);
const hash = require('./hash.js')(config.crypto);
const logger = require('./logger.js');
const http = require('./http.js');

const sandbox = {
  console: Object.freeze(logger),
  db: Object.freeze(db),
  common: { hash },
};

const apiPath = path.join(process.cwd(), config.routers.path);
const routing = {};
const transport = {
  ws: (routing, config) => server(routing, config),
  http: (routing, config) => http(routing, config)
};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = await load(filePath, sandbox);
  }

  staticServer(config.static.path, config.static.port);
  if (transport[config.api.transport])
    transport[config.api.transport](routing, config.api.port);
})();
