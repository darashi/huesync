var lastTouched = new Date();

$(function() {
  var socket = io.connect();
  socket.on('color', function (color) {
    $(document.body).css({ backgroundColor: color.code }).hide().fadeIn(300);
  });

  $(document.body).on("click touchstart", function() {
    lastTouched = new Date();
    console.log('touch detected');
  });

  $(document.body).on("touchend", function() {
    if (new Date() - lastTouched > 2000) {
      console.log('judged long touch: emit blink');
      socket.emit('blink');
    } else {
      console.log('judged short touch: emit touch');
      socket.emit('touch');
    }
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
