'use strict';

const crypto = require('node:crypto');

const hash = (config) => (password) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(config.salt).toString('base64');
  crypto.scrypt(password, salt, config.keylen, (err, result) => {
    if (err) reject(err);
    resolve(salt + ':' + result.toString('base64'));
  });
});

module.exports = (config) => hash(config);
