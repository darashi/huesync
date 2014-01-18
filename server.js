var express = require('express')
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

var env = process.env;
var PORT = env.PORT || 3000;

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

var color = new Color(["#c00", "#0c0", "#00c"]);

io.sockets.on('connection', function (socket) {
  socket.emit('color', { color: color.current() });
  socket.on('touch', function (data) {
    color.next();
    io.sockets.emit('color', { color: color.current() });
  });
});
