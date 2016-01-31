'use strict';

const Auth = require('./auth');
const Package = require('../package.json');
const Routes = require('./routes');


module.exports = function register (server, options, next) {
  server.dependency('nes');

  options.report = options.report || function () {};

  // auth succeeds, we just need credentials object with client Id for the filter later
  server.auth.scheme('custom', Auth);
  server.auth.strategy('default', 'custom');
  server.auth.default('default');
  server.bind(options);

  server.route(Routes);

  server.subscription('/command', { filter: filter });

  next();
};


module.exports.attributes = {
  pkg: Package
};


function filter (path, message, options, next) {
  // match all sockets if no clientIds specified
  if (!message.clientIds || !message.clientIds.length) {
    return next(true);
  }

  return next(message.clientIds.indexOf(options.credentials.clientId) !== -1);
}
