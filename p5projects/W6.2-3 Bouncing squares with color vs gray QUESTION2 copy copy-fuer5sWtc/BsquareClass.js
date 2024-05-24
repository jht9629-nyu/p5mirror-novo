class Bsquare {
  constructor(x, y, r, bsp) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xsp = bsp; // xspeed
    this.ysp = bsp; // yspeed
  }

  // meta function inside class
  bounceRandom() {
    this.move();
    this.show();
  }

  // display ball
  show() {
    // stroke(random(150,250),random(100,150),random(150,250));
    stroke(random(200, 250), random(100, 150), random(150, 200));
    strokeWeight(4);
    noFill();
    rect(this.x - this.r, this.y - this.r, this.r * 2);
    // rect parameters needed tweeking
    // to bounce correctly
    //ellipse(this.x, this.y, this.r * 2);
  }

  // move and bounce ball
  move() {
    // move ball
    this.x = this.x + this.xsp;
    this.y = this.y + this.ysp;

    // bounce x
    if (this.x >= width - this.r || this.x <= 0 + this.r) {
      this.xsp = -this.xsp;
    }

    // bounce y
    if (this.y >= height - this.r || this.y <= 0 + this.r) {
      this.ysp = -this.ysp;
    }
  }
}
