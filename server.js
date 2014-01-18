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

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
