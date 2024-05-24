// interacting balls 641v6
//https://editor.p5js.org/benjamin.bergery/sketches/xtI8MeYFy
// changed name of array element on line 26 to "instance"


let pixelArray = [];

function setup() { 
  createCanvas(400, 400);

  // fill array with new instances of BPixel Class

  for (let indy = 0; indy < 15; indy++) {
    let bradius = random(10, 50);
    let bspeed = random(0.5, 2);
    let xstart = random(bradius, width - bradius);
    let ystart = random(bradius, height - bradius);
    bpixel = new PixelClass(xstart, ystart, bradius, bspeed);
    //bpixel is a new instance of BPixel Class
    
    pixelArray.push(bpixel);
    //bpixel is added to pixelArray
}
}

function draw() {
  background(220);

  for (element of pixelArray) {
    element.bounceRandom();
    let overlap = false;
    for (let other of pixelArray) {
      if (element !== other && element.intersectsBool(other)) {
        console.log("intersection");
        overlap = true;
      }
    }  
    // why at end of outer loop
    // not inner loop
if (overlap) {
      element.changeColor(255);
    } else {
      element.changeColor(0);
    }
  }
}


/*** CLASS ********************/

class PixelClass {
  constructor(x, y, r, bsp) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xsp = bsp; // xspeed
    this.ysp = bsp; // yspeed
    this.brightness = 128;
  }

  //*** new class functions ***//

  intersectsBool(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    // return true;
    return (this.r + other.r > d);
  }

  changeColor(c) {
    this.brightness = c;
  }

  //*** old class functions ***//

  // meta function inside class
  bounceRandom() {
    this.move();
    this.show();
  }

  show() {
    stroke(random(200, 250), 100, 100);
    strokeWeight(3);
    // noFill();
    fill(this.brightness);
    ellipse(this.x, this.y, this.r * 2);
  }

  move() {
    // move pixel
    this.x = this.x + this.xsp;
    this.y = this.y + this.ysp;
    //// bounce x
    if (this.x >= width - this.r || this.x <= 0 + this.r) {
      this.xsp = -this.xsp;
    }
    ////// bounce y
    if (this.y >= height - this.r || this.y <= 0 + this.r) {
      this.ysp = -this.ysp;
    }
 }
}


/*******************************/
// based on my previous exercise https://editor.p5js.org/benjamin.bergery/sketches/WUlFUTdMe




// Part 2.: Take the question above and make the balls' color toggle, turning red when a ball comes close to another ball and then turning back to white when it comes close to another ball again.

// https://editor.p5js.org/benjamin.bergery/sketches/xtI8MeYFy 

// //https://editor.p5js.org/benjamin.bergery/sketches/T9sgI1OGl