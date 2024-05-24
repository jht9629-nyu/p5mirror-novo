// blue lagoon 4
//https://editor.p5js.org/novo/sketches/9jka2VJUw

let A, B, C;
let gap, pixWidth,framesPerS ;


function setup() {
  createCanvas(800, 450);

  // frameRate(4);
  frameRate(13);
  // liking 15 too
  noStroke();
  make3sliders();
}

function draw() {
    background(222 );
  gap = slide1.value();
  pixWidth = slide2.value();
  framesPerS = slide3.value();
  
  for (let x = gap; x+pixWidth < width; x += (pixWidth+gap)) {
    //nested loop
    for (let y = gap; y+pixWidth < height; y += (pixWidth+gap)) {
      randomfill();
      rect(x, y, pixWidth, pixWidth); // replace this with class instance
  
      // pixelClassInstance = new PixelClass(
      // x,y,
      // range,
      // bspeedx,bspeedy)  
      
    }
  }
  frameRate(framesPerS);
}

/*****************************/

function make3sliders() {
  createP("");
  createSpan(" Gap -10to+200 ");
  slide1 = createSlider(-10, 200, 64);
  createP("");
  createSpan(" Pixel Width 10-300 ");
  slide2 = createSlider(10, 300, 118);
  createP("");
  createSpan(" FPS 1-60 ");
  slide3 = createSlider(1, 60, 13);
}

function randomfill() {
  fill(
        //random(100, 155),
        0, // no red
        random(100, 150), // medium green
        //limiting random range
        random(200, 255), // blue highlights
        150 
        //adding alpha to slow variations
      );
}

/*****************************/

class PixelClass {

  //*** class constructor ***//
  
  constructor(x, y, range, bspeedx,bspeedy) {
    this.x = homex;
    this.homeX = x
    this.y = homey;
    this.homeY = y
    this.range = range; // range of freedom
    this.xsp = bspX; // xspeed
    this.ysp = bspY; // yspeed
    this.brightness = 128;
  }

  //*** class functions ***//

  intersectsBool(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    // return true;
    return (this.r + other.r > d);
  }

  //-----------------
  
  changeColor(c) {
    this.brightness = c;
  }

  //-----------------
  
  // meta function inside class
  bounceRandom() {
    this.move();
    this.show();
  }

  //-----------------
  
  show() {
   // stroke(random(200, 250), 100, 100);
    strokeWeight(3);
    // noFill();
    fill(this.brightness);
    ellipse(this.x, this.y, this.r * 2);
  }

  //-----------------
  
  move() {
    // move pixel
    // if this.x not = 
    this.x = this.x + this.xsp;
    this.y = this.y + this.ysp;
    //// bounce x
    if (this.x >= this.range - this.x || this.x <= 0 + this.range) {
      this.xsp = -this.xsp;
    }
    ////// bounce y
    if (this.y >= this.range - this.r || this.y <= 0 + this.range) {
      this.ysp = -this.ysp;
    }
  }
} // end PixelClass
