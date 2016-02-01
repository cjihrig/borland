'use strict';

(function ($) {
  $.wilson = $.wilson || {};
  $.wilson.reporters = $.wilson.reporters || {};
  $.wilson.reporters.handles = handles;

  var palette = new Rickshaw.Color.Palette();
  var graph = new Rickshaw.Graph({
    element: document.getElementById('handles'),
    width: 900,
    height: 500,
    renderer: 'area',
    stroke: true,
    preserve: true,
    series: [
      {
        color: palette.color(),
        name: 'setInterval',
        data: []
      },
      {
        color: palette.color(),
        name: 'net client connection',
        data: []
      },
      {
        color: palette.color(),
        name: 'setTimeout',
        data: []
      }
    ]
  });
  var xAxis = new Rickshaw.Graph.Axis.Time({
    graph: graph,
    ticksTreatment: 'glow',
    timeFixture: new Rickshaw.Fixtures.Time.Local()
  });
  var yAxis = new Rickshaw.Graph.Axis.Y({
    graph: graph,
    ticksTreatment: 'glow'
  });
  var legend = new Rickshaw.Graph.Legend({
    element: document.querySelector('#handleslegend'),
    graph: graph
  });
  graph.render();


  function handles (message) {
    var now = new Date().getTime();
    var results = {};
    message.data.forEach(function (handle) {
      results[handle.type] = results[handle.type] || 0;
      results[handle.type]++;
    });

    var keys = Object.keys(results);
    keys.forEach(function (key) {
      for (var i = 0, il = graph.series.length; i < il; ++i) {
        var series = graph.series[i];
        if (series.name === key) {
          series.data.push({
            x: now,
            y: results[key]
          });
        }

        if (series.data.length > 50) {
          series.data.shift();
        }
      }
    });
    graph.update();
  }
})(jQuery);
