var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var spawnGap = 100;
var l = 10;
var speed = 3;
var decay = 0.02;

function Sparkle(x, y, theta, delay) {
  this.x = x;
  this.y = y;
  this.theta = theta;
  this.dx = Math.cos(theta);
  this.dy = Math.sin(theta);
  this.opacity = 1;
  this.color = randomColor();
  this.delay = delay;

  this.draw = function() {
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x+l*this.dx, this.y+l*this.dy);
    c.strokeStyle = this.color + this.opacity + ')';
    c.lineWidth = 2;
    c.stroke();
  }

  this.update = function() {
    if (delay < 0) {
      this.x += this.dx*speed;
      this.y += this.dy*speed;
      if (this.opacity > 0) this.opacity -= decay;
      this.draw();
    } else {
      delay -= 1;
    }
  }
}

function sparkleGroup(x, y, n, delay) {
  var theta = Math.random()*Math.PI;
  for (var i=0; i<n; i++) {
    sparkleArray.push(new Sparkle(x, y, theta, delay));
    theta += Math.PI/n*2;
  }
}

function randomColor() {
  var r = Math.floor(Math.random()*56)+200;
  var g = Math.floor(Math.random()*206)+50;
  var b = Math.floor(Math.random()*156)+100;
  return 'rgba(' + r + ',' + g + ',' + b + ',';
}

var sparkleArray = [];
function init() {
  canvas.width = window.innerWidth*window.devicePixelRatio;
  canvas.height = window.innerHeight*window.devicePixelRatio;
  canvas.style.width = canvas.width/window.devicePixelRatio+'px';
  canvas.style.height = canvas.height/window.devicePixelRatio+'px';
  c.scale(window.devicePixelRatio,window.devicePixelRatio);

  sparkleArray = [];

  for (var i=0; i<50; i++) {
    var x = Math.random()*(innerWidth-2*spawnGap)+spawnGap;
    var y = Math.random()*(innerHeight-2*spawnGap)+spawnGap;
    var delay = Math.floor(Math.random()*150);
    sparkleGroup(x, y, 15, delay);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i=0; i<sparkleArray.length; i++) {
    sparkleArray[i].update();
    if (sparkleArray[i].opacity < 0) sparkleArray.splice(i,1);
  }
}
