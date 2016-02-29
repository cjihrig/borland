'use strict';

const BorlandCommander = require('toolbag/plugins/borland_commander');
const Getfile = require('toolbag/plugins/getfile');
const Heapdump = require('toolbag/plugins/heapdump');
const HttpReporter = require('toolbag/plugins/http_reporter');
const Policy = require('toolbag/plugins/policy');
const ProcessReporter = require('toolbag/plugins/process_reporter');
const Profiler = require('toolbag/plugins/profiler');
const SharedSymbol = require('toolbag/plugins/shared_symbol');
const StatsCollector = require('toolbag/plugins/stats_collector');
const Signal = require('toolbag/plugins/signal');
const UdpReporter = require('toolbag/plugins/udp_reporter');


module.exports = function config (defaults, callback) {
  callback(null, {
    errors: {
      policy: 'log'
    },
    plugins: [
      {
        plugin: BorlandCommander,
        options: {
          host: 'http://localhost:5000'
        }
      },
      {
        plugin: HttpReporter,
        options: {
          id: 'http reporter',
          method: 'POST',
          url: 'http://localhost:5000/report',
          options: {}
        }
      },
      {
        plugin: ProcessReporter
      },
      {
        plugin: Getfile,
        options: defaults.data
      },
      {
        plugin: Heapdump,
        options: defaults.data
      },
      {
        plugin: Profiler,
        options: defaults.data
      },
      { plugin: SharedSymbol },
      { plugin: Signal },
      {
        plugin: StatsCollector,
        options: {
          enabled: true,
          period: 1000,
          eventLoopLimit: 30,
          features: {
            process: true,
            system: true,
            cpu: true,
            memory: true,
            gc: true,
            handles: true,
            requests: true,
            eventLoop: true,
            meta: {
              tags: ['api']
            }
          }
        }
      }
    ]
  });
};
