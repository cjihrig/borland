'use strict';

const Hapi = require('hapi');
const Influx = require('influx');
const Nes = require('nes');
const Borland = require('./');


const server = new Hapi.Server({
  debug: { request: ['error' /*, 'response', 'received'*/] }
});

const influx = Influx({
  host: 'localhost',
  username: 'borland',
  password: 'borland',
  database: 'borland_report'
});

const noop = function () {};
const report = function (type, data, tags) {
  const point = { value: JSON.stringify(data), time: Date.now() };
  influx.writePoint(type, point, tags || null, noop);
};

server.connection({ port: 5000 });
server.register([Nes, { register: Borland, options: { report: report } }], function (err) {
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
