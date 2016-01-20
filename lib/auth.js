'use strict';

const Uuid = require('node-uuid');


module.exports = function (server, options) {
  return {
    authenticate: function (request, reply) {
      request.connection.clientId = request.connection.clientId || Uuid.v4();
      reply.continue({ credentials: { clientId: request.connection.clientId } });
    }
  };
};
