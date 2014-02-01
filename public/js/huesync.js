$(function() {
  var timer;
  var blinked;

  var socket = io.connect();
  socket.on('color', function (color) {
    $(document.body).css({ backgroundColor: color.code }).hide().fadeIn(300);
  });

  socket.on('blink', function () {
    $('#logo').removeClass().addClass('animated bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(this).removeClass();
    });

    $('#blackout').css({ opacity: 0.8 }).animate({ opacity: 0 }, 500);
  });

  $(document.body).on('touchstart mousedown', function() {
    console.log('touch detected');
    blinked = false;

    if (timer) clearInterval(timer);
    timer = setInterval(function() {
      console.log('blink detected');
      socket.emit('blink');
      blinked = true;
    }, 1500);
  });

  $(document.body).on('touchend mouseup', function() {
    if (timer) {
      clearInterval(timer);
    }
    if (!blinked) {
      console.log('next color');
      socket.emit('next-color');
    }
  });
});

$(window).on('load resize orientationchange', function() {
  $('body, #blackout').css({
    width:  window.innerWidth,
    height: window.innerHeight
  });

  $('#logo').css({
    top:  ((window.innerHeight - $('#logo').height()) / 2),
    left: ((window.innerWidth  - $('#logo').width())  / 2)
  });
});
