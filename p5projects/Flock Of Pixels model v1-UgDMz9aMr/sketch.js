// Flock Of Pixels model v1
//https://editor.p5js.org/novo/sketches/UgDMz9aMr
// february 9, 2023
 
// A HEAVILY COMMENTED sketch :-) 
// that could serve as a very primitive model for moving pixels around and having them interact as a "flock"
// with verbose variable names to identify 
// pixelArray and arrayElement
// PixelClass and pixelInstance 

// This p5js sketch is composed of 4 sections:

// 1. pixelArray global variable which is used in setup and draw functions

// 2. setup function 
// with a loop that populates the pixelArray 
// by creating 5 different instances of PixelClass -- with 5 randomly different starting positions, sizes and speeds -- which are then added as elements to the pixelArray
// the elements could be pixels from a video instead of circles

// 3. draw function 
// a loop that continuously tests for overlaps of each element of pixelArray and changes their color when that happens
// the tests could be for original position, proximity, speed, crowding or ... 
//and the changes could be to speed, size, color or ...

// 4. PixelClass 
// with constructor variables that define the 6 attributes of a pixelInstance : x and y location, radius, x and y speed, and color
// with internal functions for: setting size, changing color, testing for overlap, moving and bouncing each pixelInstance
// other versions could have different moving, testing and transforming functions...


let pixelArray = [];

/*** SETUP FUNCTION ********************/

function setup() { 
  createCanvas(800, 450);

  // fill array with new pixelInstances of PixelClass

  for (let indy = 0; indy < 20; indy++) {
    
    let bradius = random(10, 50);
    let bspeed = random(0.5, 2);
    let xstart = random(bradius, width - bradius);
    let ystart = random(bradius, height - bradius);
    
    pixelInstance = new PixelClass(xstart, ystart, bradius, bspeed);
    
    // pixelInstance 
    // is a new instance of PixelClass
    // created with 4 constructors: 
    // x and y start points, radius and speed
    
    pixelArray.push(pixelInstance);
    
    //each pixelInstance is added to beginning of pixelArray
  }
}

/*** end SETUP FUNCTION ********************/


/*** DRAW FUNCTION ********************/

function draw() {
  background(255,210,0);

  for (arrayElement of pixelArray) {
    arrayElement.bounceRandom();
    let overlap = false;
    for (let other of pixelArray) {
      if (arrayElement !== other && arrayElement.intersectsBool(other)) {
 //       console.log("intersection");
        overlap = true;
      }
    }  
    // why at end of outer loop
    // not inner loop
if (overlap) {
      arrayElement.changeColor(255);
    } else {
      arrayElement.changeColor(0);
    }
  }
}

/*** end DRAW FUNCTION ********************/


/*** CLASS ********************/

class PixelClass {

  //*** class constructor ***//
  
  constructor(x, y, r, bsp) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xsp = bsp; // xspeed
    this.ysp = bsp; // yspeed
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

/*** end CLASS ********************/