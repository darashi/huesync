var express = require('express')
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

var env = process.env;
var PORT = env.PORT || 3000;

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

server.listen(PORT, function() {
  console.log("huesync listening on " + PORT);
});

app.configure(function() {
  app.use(express.static(__dirname + "/public"));
});

var Color = function(colors) {
  this.colors = colors;
  this.currentIndex = 0;
};

Color.prototype.next = function() {
  this.currentIndex = (this.currentIndex + 1) % this.colors.length;
  return this.current();
};

Color.prototype.current = function() {
  return this.colors[this.currentIndex];
};

var colors = [
  {code: "#aa83ec"},
  {code: "#a87446"},
  {code: "#ea619c"},
  {code: "#53bdee"},
  {code: "#cae943"},
  {code: "#004be5"},
  {code: "#ee8530"},
  {code: "#66b12e"},
  {code: "#d83839"},
  {code: "#f9cd41"}
];
var color = new Color(colors);

io.sockets.on('connection', function (socket) {
  socket.emit('color', { color: color.current().code });
  socket.on('touch', function (data) {
    color.next();
    io.sockets.emit('color', { color: color.current().code });
  });
});
