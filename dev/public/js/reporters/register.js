(function ($) {
  $.wilson = $.wilson || {};
  $.wilson.reporters = $.wilson.reporters || {};
  $.wilson.reporters.register = register;

  function register (message) {
    document.getElementById('page-header').innerHTML = 'Node: ' + message.source;
    document.getElementById('pid').innerHTML = message.data.pid;
    document.getElementById('host').innerHTML = message.data.hostname;
    document.getElementById('version').innerHTML = message.data.version;
    document.getElementById('argv').innerHTML = message.data.argv[1];
  }
})(jQuery);
