$(function() {
  var socket = io.connect();
  socket.on('color', function (color) {
    $(document.body).css({ backgroundColor: color.code }).hide().fadeIn(300);
  });

  $(document.body).on("click touchstart", function() {
    console.log('touch detected');
    socket.emit('touch');
  });
});

$(window).on("load resize orientationchange", function() {
  $(document.body).css({
    width:  window.innerWidth,
    height: window.innerHeight
  });

  $("#logo").css({
    marginTop: ((window.innerHeight - $("#logo").height()) / 2)
  });
});
