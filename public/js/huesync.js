$(function() {
  var socket = io.connect();
  socket.on('color', function (data) {
    console.log(data);
    $(document.body).css({ backgroundColor: data.color });
  });

  $(document.body).on("click touchstart", function() {
    console.log('touch detected');
    socket.emit('touch');
  });
});

$(window).on("load resize", function() {
  $(document.body).css({
    width:  window.innerWidth,
    height: window.innerHeight
  });

  $("#logo").css({
    marginTop: ((window.innerHeight - $("#logo").height()) / 2)
  });
});
