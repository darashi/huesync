var express = require('express')
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var _ = require('lodash');

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

Color.prototype.set = function(id) {
  var index = _.findLastIndex(this.colors, { 'id': id });
  this.currentIndex = index;
  return this.current();
};

var colors = [
  {id: "purple", code: "#aa83ec"},
  {id: "brown", code: "#a87446"},
  {id: "pink", code: "#ea619c"},
  {id: "water", code: "#53bdee"},
  {id: "lightgreen", code: "#cae943"},
  {id: "blue", code: "#004be5"},
  {id: "orange", code: "#ee8530"},
  {id: "green", code: "#66b12e"},
  {id: "red", code: "#d83839"},
  {id: "yellow", code: "#f9cd41"}
];
var color = new Color(colors);

io.sockets.on('connection', function (socket) {
  socket.emit('color', { color: color.current().code });
  socket.on('touch', function (data) {
    color.next();
    io.sockets.emit('color', { color: color.current().code });
  });
});

app.get('/colors/:id', function(req, res) {
  var id = req.params.id;
  result = color.set(id);
  console.log(id);
  if (result) {
    io.sockets.emit('color', { color: color.current().code });
    res.send(200, 'OK').end();
  } else {
    res.send(404, 'Color not found').end();
  }
});
