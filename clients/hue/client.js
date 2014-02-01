var hue = require("node-hue-api");
var io = require('socket.io-client');
var color = require('onecolor');
var _ = require('lodash');

var HueApi = hue.HueApi;

var endpoint = process.env.ENDPOINT || 'http://localhost:3000/';
console.log("Endpoint: %s", endpoint);

var host = "192.168.2.2", // TODO customizable
  username = "1234567890", // TODO customizable
  api = new HueApi(host, username);

var displayResults = function(result) {
  console.log(JSON.stringify(result, null, 2));
};

api.lights()
  .then(displayResults)
  .done();

var lightIds = [1, 2, 3]; // TODO configurable

var socket = io.connect(endpoint);
socket.on('connect', function() {
  console.log('Connected to ' + endpoint);
});

function setLightsState(state) {
  _.forEach(lightIds, function(lightId) {
    api.setLightState(lightId, state)
      .then(displayResults)
      .fail(function(err) { console.log(err); })
      .done();
  });
};

socket.on('color', function(data) {
  console.log('RECEIVED: %j', data);
  var c = color(data.code);

  var h = Math.floor(c.hue() * 360);
  var s = 100;
  var l = 100;

  console.log("HSL: ", h, s, l);

  var state = hue.lightState.create()
    .on()
    .hsl(h, s, l)
    .transition(0)
    .effect('none');

  setLightsState(state);
});

socket.on('blink', function() {
  console.log('RECEIVED: blink');
  var state = hue.lightState.create().alert();
  setLightsState(state);
});
