'use strict';

module.exports = async (transportName, routing, port, logger) =>
  require(`../transport/${transportName}.js`)('pure')(routing, port, logger);

