'use strict';

(function ($) {
  $.wilson = $.wilson || {};
  $.wilson.reporters = $.wilson.reporters || {};
  $.wilson.reporters.memory = memory;

  var graph = new Rickshaw.Graph({
    element: document.getElementById('memory'),
    width: 900,
    height: 500,
    renderer: 'area',
    stroke: true,
    preserve: true,
    series: [
      {
        color: 'steelblue',
        name: 'Heap Used',
        data: []
      },
      {
        color: 'lightblue',
        name: 'RSS',
        data: []
      },
      {
        color: 'lightgreen',
        name: 'Heap Total',
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
    tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
    ticksTreatment: 'glow'
  });
  var legend = new Rickshaw.Graph.Legend({
    element: document.querySelector('#memlegend'),
    graph: graph
  });
  graph.render();

  var updateHeapUsed = function (now, heapUsed) {
    if (graph.series[0].data.length > 50) {
      graph.series[0].data.shift();
    }

    graph.series[0].data.push({
      x: now,
      y: heapUsed
    });
  };

  var updateRss = function (now, rss) {
    if (graph.series[1].data.length > 50) {
      graph.series[1].data.shift();
    }

    graph.series[1].data.push({
      x: now,
      y: rss
    });
  };

  var updateHeapTotal = function (now, heapTotal) {
    if (graph.series[2].data.length > 50) {
      graph.series[2].data.shift();
    }

    graph.series[2].data.push({
      x: now,
      y: heapTotal
    });
  };

  function memory (message) {
    var now = new Date().getTime();
    updateHeapUsed(now, message.data.heapUsed);
    updateHeapTotal(now, message.data.heapTotal);
    updateRss(now, message.data.rss);
    graph.update();
  }
})(jQuery);
