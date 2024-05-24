// 11.6 Painting with Pixels
//https://editor.p5js.org/novo/sketches/Bp9Db7FHv
// https://editor.p5js.org/jht9629-nyu/sketches/sd8fP5xtL
// https://editor.p5js.org/codingtrain/sketches/0tRpxGdaq

let video;
let vScale = 8;

let particles = [];

let slider;

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  for (var i = 0; i < 10; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  slider = createSlider(0, 255, 127);
  background(0);
}

//////

function draw() {
  video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(4, 32);
  }
  update() {
    this.x += random(-10, 10);
    this.y += random(-10, 10);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  show() {
    noStroke();
    let px = floor(this.x / vScale);
    let py = floor(this.y / vScale);
    let col = video.get(px, py);
    //console.log(col);
    fill(col[0], col[1], col[2], slider.value());
    ellipse(this.x, this.y, this.r, this.r);
  }
}
