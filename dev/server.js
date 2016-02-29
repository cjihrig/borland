'use strict';

const ChildProcess = require('child_process');
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Nes = require('nes');
const Borland = require('../');


const server = new Hapi.Server({
  debug: { request: ['error' /*, 'response', 'received'*/] },
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

const report = function (source, type, data) {
  server.publish('/data', { source, type, data });
};

server.connection({ port: 5000 });
server.register([Inert, Nes, { register: Borland, options: { report: report } }], (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  });

  server.subscription('/data');

  server.start(function (err) {
    if (err) {
      console.error(`Server failed to start - ${err.message}`);
      process.exit(1);
    }

    console.log(`Server started at ${server.info.uri}`);

    ChildProcess.exec('open http://localhost:' + server.info.port);
  });
});
