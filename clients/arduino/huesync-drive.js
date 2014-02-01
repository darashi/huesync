var color = require('onecolor');

var SerialPort = require('serialport').SerialPort;
var io = require('socket.io-client');

var device = '/dev/tty.usbmodem1411'; // TODO configurable
var endpoint = process.env.ENDPOINT || 'http://localhost:3000/';

var serialPort = new SerialPort(device, {
  baudrate: 9600
});

var socket = io.connect(endpoint);

serialPort.on('open', function () {
  console.log('Serial port opened');
  socket.on('connect', function() {
    console.log('Connected to ' + endpoint);
  });

  socket.on('color', function(data) {
    console.log('RECEIVED: %j', data);
    var c = color(data.code);
    var r = Math.floor(c.red() * 0xff);
    var g = Math.floor(c.green() * 0xff);
    var b = Math.floor(c.blue() * 0xff);
    var buffer = new Buffer([r, g, b]);
    serialPort.write(buffer);
  });
});
