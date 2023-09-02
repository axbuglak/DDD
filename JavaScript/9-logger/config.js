'use strict';

module.exports = {
  api: {
    port: 8001,
    transport: 'ws'
  },
  routers: {
    path: './api'
  },
  static: {
    port: 8000,
    path: './static'
  },
  pg: {
    host: '127.0.0.1',
    port: 5432,
    database: 'example',
    user: 'marcus',
    password: 'marcus',
  },
  sandbox: {
    timeout: 5000,
    displayErrors: false
  },
  crypto: {
    salt: 16,
    keylen: 64
  }
};
