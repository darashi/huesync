$(function() {
  var timer;

  var socket = io.connect();
  socket.on('color', function (color) {
    $(document.body).css({ backgroundColor: color.code }).hide().fadeIn(300);
  });

  socket.on('blink', function () {
    $('#logo').removeClass().addClass('animated bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(this).removeClass();
    });
  });

  $(document.body).on("touchstart mousedown", function() {
    console.log('touch detected');
    socket.emit('touch');

    if (timer) clearInterval(timer);
    timer = setInterval(function() {
      console.log('blink detected');
      socket.emit('blink');
    }, 1500);
  });

  $(document.body).on("touchend mouseup", function() {
    if (timer) {
      clearInterval(timer);
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
