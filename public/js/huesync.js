$(function() {
  var socket = io.connect();
  socket.on('color', function (data) {
    console.log(data);
    $(document.body).css({ backgroundColor: data.color });
  });

  $(document.body).click(function() {
    console.log('touch detected');
    socket.emit('touch');
  });
});
