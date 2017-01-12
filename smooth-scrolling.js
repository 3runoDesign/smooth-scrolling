// TODO: Create modules

if (window.addEventListener) {
  window.addEventListener('mousewheel', MouseWheel, false);
  window.addEventListener('DOMMouseScroll', MouseWheel, false);
}

window.onmousewheel = document.onmousewheel = MouseWheel;

function MouseWheel(event) {
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    if (event.wheelDelta) delta = event.wheelDelta / 120;
    else if (event.detail) delta = -event.detail / 3;

    MouseWheelHandler(delta);
    if (event.preventDefault) event.preventDefault();
      event.returnValue = false;
}

var goUp = true;
var end = null;
var interval = null;

function MouseWheelHandler(delta) {
  var animationInterval = 15; //lower is faster
  var scrollSpeed = 15; //lower is faster

  if (end == null) {
    end = $(window).scrollTop();
  }

  end -= 20 * delta;
  goUp = delta > 0;

  if (interval == null) {
    interval = setInterval(function () {
      var scrollTop = $(window).scrollTop();
      var step = Math.round((end - scrollTop) / scrollSpeed);
      if (scrollTop <= 0 ||
          scrollTop >= $(window).prop("scrollHeight") - $(window).height() ||
          goUp && step > -1 ||
          !goUp && step < 1 ) {
        clearInterval(interval);
        interval = null;
        end = null;
      }
      $(window).scrollTop(scrollTop + step );
    }, animationInterval);
  }
}
