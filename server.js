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
  "#000000",
  "#999999",
  "#ea619c",
  "#53bdee",
  "#cae943",
  "#004be5",
  "#ee8530",
  "#66b12e",
  "#d83839",
  "#f9cd41"
];
var color = new Color(colors);

io.sockets.on('connection', function (socket) {
  socket.emit('color', { color: color.current() });
  socket.on('touch', function (data) {
    color.next();
    io.sockets.emit('color', { color: color.current() });
  });
});
