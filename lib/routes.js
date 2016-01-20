'use strict';

const Joi = require('joi');

const registered = {};

module.exports = [
  {
    method: 'POST',
    path: '/register',
    config: {
      id: 'register',
      validate: {
        payload: {
          info: Joi.object().description('information about process'),
          commands: Joi.array().description('commands the toolbox can perform')
        }
      },
      handler: function (request, reply) {
        registered[request.auth.credentials.clientId] = {
          info: request.payload.info,
          commands: request.payload.commands
        };

        reply({ clientId: request.connection.clientId });
      }
    }
  },
  {
    method: 'POST',
    path: '/report',
    config: {
      id: 'report',
      handler: function (request, reply) {
        // TODO: Process client data in request.payload
        if (request.payload.type !== 'stats') {
          console.log(request.payload);
        }

        reply();
      }
    }
  },
  {
    method: 'GET',
    path: '/clients',
    config: {
      id: 'clients',
      auth: false,
      handler: function (request, reply) {
        reply(registered);
      }
    }
  },
  {
    method: 'POST',
    path: '/command',
    config: {
      id: 'command',
      auth: false,
      validate: {
        payload: {
          command: Joi.string().required().description('command to send to clients'),
          options: Joi.object().optional().description('any command arguments'),
          clientIds: Joi.array().optional().description('list of clientIds to command')
        }
      },
      handler: function (request, reply) {
        request.server.publish('/command', request.payload);
        return reply();
      }
    }
  }
];
