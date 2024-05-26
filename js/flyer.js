var canvas = document.getElementById( 'game');

var GROUND_Y = 900;
var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 1080;
var NANONAUT_WIDTH = 239;
var NANONAUT_HEIGHT = 561;
var BOTTOM_EDGE = CANVAS_HEIGHT - NANONAUT_HEIGHT;
var nanonautX = CANVAS_WIDTH - NANONAUT_HEIGHT;

var tick = 0;
var c = canvas.getContext('2d') ;
var x = 100;
var y = 150;
var vx = 0;
var vy = 4;

var pickle_wait = 100;
var is_pickle_flight = false;

var px = CANVAS_WIDTH;
var py = 500;
var pick_vel = -20;

var ketchup_wait = 120;
var is_ketchup_flight = false;

var kx = CANVAS_WIDTH;
var ky = 500;
var ketc_vel = -30;

var clouds = new Image();
clouds.src = '/static/flyer/images/clouds.jpg';
var background = new Image();
background.src = '/static/flyer/images/background.png';
var midground = new Image();
midground.src = '/static/flyer/images/midground.png';
var foreground = new Image();
foreground.src = '/static/flyer/images/foreground.png';
var player = new Image();
player.src = '/static/flyer/images/player.png';
var ketchup = new Image();
ketchup.src = '/static/flyer/images/ketchup.png';
var pickle = new Image();
pickle.src = '/static/flyer/images/pickle.png';

window.addEventListener( 'load', start);
window.addEventListener( "keypress", (event) => {
  if ( event.code === "ArrowUp" || event.code === "KeyW") {
    y = y - 10*Math.abs(vy);
  } else if ( event.code === "ArrowDown" || event.code === "KeyS") {
    y = y + 10*Math.abs(vy);
  } else {
    console.log ( event.code);
  }
});

function start() {
  c.fillStyle = 'green';
  c.fillRect( 10, 10, 30, 30);

  window.requestAnimationFrame( loop) ;
}

function loop()  {
  c.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  tick = tick + 1;
  draw();

  y = y + vy;

  if( y>BOTTOM_EDGE) vy = -4;
  if( y<0) vy = 4;

  window.requestAnimationFrame( loop);

  if( is_pickle_flight) {
    px = px + pick_vel;
    if( px < -200 ) {
      is_pickle_flight = false;
      pickle_wait = 100;
    }
  } else {
    pickle_wait = pickle_wait - 1;
    if( pickle_wait < 0) {
      px = CANVAS_WIDTH;
      is_pickle_flight = true;
    }
  }

     if( is_ketchup_flight) {
       kx = kx + ketc_vel;
       if( kx < -200 ) {
         is_ketchup_flight = false;
         ketchup_wait = 80;
      }
    } else {
      ketchup_wait = ketchup_wait - 1;

       if( ketchup_wait < 0) {
          kx = CANVAS_WIDTH;
          is_ketchup_flight = true;
     }
   }
}

function draw()  {
  c.fillStyle = 'LightSkyBlue';
  c.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y - 40);

  c.fillStyle = 'ForestGreen';
  c.fillRect(0, GROUND_Y - 40, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y + 40);

  var cx = (-tick)/2 % CANVAS_WIDTH;
  c.drawImage( clouds, cx, 0);
  c.drawImage( clouds, CANVAS_WIDTH + cx, 0);

  var bx = (-tick) % CANVAS_WIDTH;
  c.drawImage( background, bx, 0);
  c.drawImage( background, CANVAS_WIDTH + bx, 0);

  var mx = (-tick*4) % CANVAS_WIDTH;
  c.drawImage( midground, mx, 0);
  c.drawImage( midground, CANVAS_WIDTH + mx, 0);

  c.drawImage( player, x, y);

  var fx = (-tick*8) % CANVAS_WIDTH;
  c.drawImage( foreground, fx, 0);
  c.drawImage( foreground, CANVAS_WIDTH + fx, 0);

  if( is_pickle_flight) {
    c.drawImage( pickle, px, py);

  }
  if( is_ketchup_flight) {
    c.drawImage( ketchup, kx, ky);
  }
}

