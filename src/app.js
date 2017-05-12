// Equations found at http://gizma.com/easing
var canvas, ctx;

function clearBackground() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function update(tick, lastTick, frame) {

}

var startAnimation;
function draw(tick, lastTick, frame) {
  clearBackground();

  var boxSize = 50; // width/height in pixels

  // draw a box from 1/3 to 2/3 of the screen in width
  var widthThird = canvas.width / 3;
  var startX = ~~widthThird;
  var startY = (canvas.height - boxSize - (3 * ctx.lineWidth)) / 2;

  var padding = (3 * ctx.lineWidth);
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'white';
  ctx.strokeRect(startX - padding / 2, startY, widthThird + padding, boxSize + padding);
  /*
    Equations found at http://gizma.com/easing

    ----------------------------------

    linearTween = function (t, b, c, d) {
      return c*t/d + b;
    };
    t = current time
    b = start value
    c = change in value
    d = duration

    t & d can be in frames or milliseconds

    ----------------------------------

    easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    ----------------------------------

    easeInOutCubic = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t + b;
      t -= 2;
      return c/2*(t*t*t + 2) + b;
    };

    ----------------------------------

  */

  var boxX = canvas.width / 3;
  var boxY = (canvas.height - boxSize) / 2;
  var animationDuration = 1400; // in milliseconds
  var animationTimeElapsed = tick - startAnimation;
  var animationEndValue = widthThird - boxSize;
  // var animationEndValue = boxSize + ctx.lineWidth;
  if (startAnimation && animationTimeElapsed < animationDuration) {
    /*
    var linearTween = function (currentTime, startValue, changeInValue, duration) {
      return (changeInValue * currentTime) / duration + startValue;
    }
    */

    var linearTween = function (currentTime, startValue, changeInValue, duration) {
      return changeInValue * (currentTime / duration) + startValue;
    }

    var easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    var easeInOutCubic = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t + b;
      t -= 2;
      return c/2*(t*t*t + 2) + b;
    };

    // var result = easeInOutCubic(animationTimeElapsed, 0, animationEndValue, animationDuration);
    // var result = easeInOutQuad(animationTimeElapsed, 0, animationEndValue, animationDuration);
    // var result = linearTween(animationTimeElapsed, 0, animationEndValue, animationDuration);
    // boxX = widthThird + result;

    var result = easeInOutCubic(animationTimeElapsed, widthThird, animationEndValue, animationDuration);
    boxX = result;
  } else if (startAnimation && animationTimeElapsed >= animationDuration) {
    boxX = widthThird + animationEndValue;
  }
  /*
  // draw gray shadow box
  ctx.fillStyle = 'rgba(222, 222, 222, 0.5)';
  ctx.fillRect(widthThird + boxSize + ctx.lineWidth, boxY, boxSize, boxSize);
  */

  // draw a box in the middle of the screen
  ctx.fillStyle = 'white';
  ctx.fillRect(boxX, boxY, boxSize, boxSize);

}

var lastTick = 0
var tick = 0;
var frame = 0;
function loop() {
  lastTick = tick;
  tick = new Date().valueOf();
  frame++;
  update(tick, lastTick, frame);
  draw(tick, lastTick, frame);
  requestAnimationFrame(loop);
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

(function() {
  canvas = document.getElementById('canvas');
  resize();
  window.addEventListener('resize', resize);
  ctx = canvas.getContext('2d');

  setTimeout(function() { startAnimation = tick }, 700)

  loop();
})();

