'use strict';

const fastify =  require('fastify');



module.exports = async (transportName, routing, port) => {
  const transport = require(`../transport/${transportName}.js`)('fastify');

  const server = fastify();

  transport(server, routing, port);
};
