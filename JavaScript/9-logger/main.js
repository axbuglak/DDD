'use strict';

const config = require('./config.js');
const fsp = require('node:fs').promises;
const path = require('node:path');
const staticServer = require('./static.js');
const db = require('./db.js')(config.pg);
const hash = require('./hash.js')(config.crypto);
const logger = require('./logger.js')(config.logger.type);
const framework = require(`./frameworks/${config.api.framework}`);

const apiPath = path.join(process.cwd(), config.routers.path);
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = require(filePath)(db, hash);
  }

  staticServer(config.static.path, config.static.port);
  framework(config.api.transport, routing, config.api.port, logger);
  // transport(routing, config.api.port, logger);
})();
