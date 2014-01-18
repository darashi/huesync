$(function() {
  var socket = io.connect('http://localhost');
  socket.on('color', function (data) {
    console.log(data);
    $(document.body).css({ backgroundColor: data.color });
  });

  $(document.body).click(function() {
    socket.emit('touch');
  });
});
