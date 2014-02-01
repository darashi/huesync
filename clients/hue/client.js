var hue = require("node-hue-api");
var HueApi = hue.HueApi;

var host = "192.168.2.2", // TODO customizable
  username = "1234567890", // TODO customizable
  api = new HueApi(host, username);

var displayResults = function(result) {
  console.log(JSON.stringify(result, null, 2));
};

api.lights()
  .then(displayResults)
  .done();

var state = hue.lightState.create().off();

api.setLightState(1, state)
  .then(displayResults)
  .done();
