// https://editor.p5js.org/fuqiumeng/sketches/pJxXT7h4w
// perlin noise by Qiumeng Fu <

var inc = 0.03;
var scl = 20;
var cols, rows;
var fr;
var zoff =0;

let song;
let amp;
let button;

let volhistory = [];
let ct; 


function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('music.mp3');
}

function setup() {
  createCanvas(800, 400);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP("");
  
  //angleMode(DEGREES);
  button = createButton('toggle music');
  button.mousePressed(toggleSong);
  // song.play();
  song.loop();
  amp = new p5.Amplitude();
  //background(map(noise(yoff),0,1,120,255), map(noise(yoff),0,1,150,200), map(noise(xoff),0,1,100,230), 50);
  //pixelDensity(1);
}

function draw() {
 background(255);
 var vol = amp.getLevel();
  var yoff = 0;
  //loadPixels();
  //I add line 42 a no loop to protect,but what I want is animation.
  for (var y = 0; y < rows; y++) {
    var xoff = 0;//map(mouseX,0,800,0,1);
    for (var x = 0; x < cols; x++) {
      var index = (x + y * width) * 4;
      var angle = noise(xoff, yoff, zoff) * TWO_PI *4;
      xoff += inc;
      var v = p5.Vector.fromAngle(angle);
      noStroke(0);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      fill(0, 0, 255, 100);
      //line(0, 0, scl,scl);
     // ellipse(x, y * scl, scl, scl);
      fill(map(vol*2,0,1,0,255), map(vol,0,1,0,200), map(vol,0,1,0,230), map(vol,0,1,50,100));
      ellipse(scl,scl,60,15);
      pop();
      
    }
    yoff += inc
    zoff += 0.00008;

  }
  fr.html(floor(frameRate()));
}
