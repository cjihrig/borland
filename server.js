'use strict';

const Hapi = require('hapi');
const Nes = require('nes');
const Borland = require('./');


const server = new Hapi.Server({
  debug: { request: ['error' /*, 'response', 'received'*/] }
});

server.connection({ port: 5000 });
server.register([Nes, Borland], function (err) {
  if (err) {
    throw err;
  }

  server.start(function (err) {
    if (err) {
      console.error(`Server failed to start - ${err.message}`);
      process.exit(1);
    }

    console.log(`Server started at ${server.info.uri}`);
  });
});
