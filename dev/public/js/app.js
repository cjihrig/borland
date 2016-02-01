'use strict';

(function ($) {
  $.wilson = $.wilson || {};
  $.wilson.reporters = $.wilson.reporters || {};

  var handler = function (message) {
    var reporter = $.wilson.reporters[message.type];
    if (typeof reporter === 'function') {
      reporter(message);
    }
  };

  var client = $.nes();
  client.connect({ auth: { headers: { authorization: 'Basic am9objpzZWNyZXQ=' } } }, function () {
    client.subscribe('/data', handler, function (err) {
      if (err) {
        console.error(err);
      }
    });
  });

  $('#signalBtn').click(function () {
    var payload = {
      command: 'signal-kill',
      options: {
        signal: $('#signal').val()
      }
    };
    client.request({ path: 'command', method: 'POST', payload: payload }, function (err) {
      if (err) {
        console.error(err);
      }
    });
  });
})(jQuery);
