let particles = [];
let slider;

function setup_paint() {
  for (var i = 0; i < 200; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  slider = createSlider(0, 255, 20);
  background(0);
}

function draw_paint() {
  if (! video.loadedmetadata) return;
  video.loadPixels();
  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(4, 32);
    this.w1 = width / 3;
    this.w2 = this.w1 * 2;
    this.w3 = this.w1 * 3;
    this.xstart = 0;
    this.xend = width;
  }

  run() {
    this.update();
    this.show();
  }
  
  update() {
    this.x += random(-10, 10);
    this.y += random(-10, 10);

    this.x = constrain(this.x, this.xstart, this.xend);
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
