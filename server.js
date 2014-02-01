var fs = require('fs');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var Color = require('./lib/color');

var env = process.env;
var PORT = env.PORT || 3000;

server.listen(PORT, function() {
  console.log("huesync listening on " + PORT);
});

app.configure(function() {
  app.use(express.static(__dirname + "/public"));
});

var colors = JSON.parse(fs.readFileSync(__dirname + '/colors.json'));
var color = new Color(colors);

io.configure(function () {
  if (process.env.NODE_ENV == 'production') {
    io.set('log level', 1);
    io.enable('browser client minification');
    io.enable('browser client etag');
    io.enable('browser client gzip');
  } else {
    io.set('log level', 2);
    io.set('log colors', true);
  }
});

io.sockets.on('connection', function (socket) {
  socket.emit('color', color.current());
  socket.on('touch', function (data) {
    color.next();
    io.sockets.emit('color', color.current());
  });

  socket.on('blink', function(data) {
    io.sockets.emit('blink');
  });
});

app.get('/colors/:id', function(req, res) {
  var id = req.params.id;
  var result = color.set(id);
  if (result) {
    io.sockets.emit('color', color.current());
    res.send(200, 'OK').end();
  } else {
    res.send(404, 'Color not found').end();
  }
});
