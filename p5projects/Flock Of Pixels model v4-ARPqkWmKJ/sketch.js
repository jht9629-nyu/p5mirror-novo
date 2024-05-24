// Flock Of Pixels model v4
// https://editor.p5js.org/novo/sketches/ARPqkWmKJ

// A HEAVILY COMMENTED sketch :-)
// that could serve as a very primitive model for moving pixels around and having them interact as a "flock"
// with verbose variable names to identify
// pixelArray and arrayElement
// PixelClass and pixelInstance

// This p5js sketch is composed of 4 sections:

// 1. pixelArray global variable which is used in setup and draw functions

// 2. setup function
// with a loop that populates the pixelArray
// by creating x different instances of PixelClass -- with x randomly different starting positions, sizes and speeds -- which are then added as elements to the pixelArray
// the elements could be pixels from a video instead of circles

// 3. draw function
// a loop that continuously tests for overlaps of each element of pixelArray and changes their color when that happens
// the tests could be for original position, proximity, speed, crowding or ...
//and the changes could be to speed, size, color or ...

// 4. PixelClass
// with constructor parameters -- variables passed to function --
// that define the 6 attributes of a
// pixelInstance : x and y location, radius, x and y speed, and color
// with methods (internal functions of a classes)
// for: setting size, changing color, testing for overlap, moving and bouncing each pixelInstance
// other versions could have different moving, testing and transforming functions...

let pixelArray = [];

/*** SETUP FUNCTION ********************/

function setup() {
  createCanvas(800, 450);

  // fill or populate array with new pixelInstances of PixelClass

  for (let indy = 0; indy < 10; indy++) {
    let bradius = random(10, 50);
    let bspeed = random(0.5, 7);
    let xstart = random(bradius, width - bradius);
    let ystart = random(bradius, height - bradius);

    let pixelInstance = new PixelClass(xstart, ystart, bradius, bspeed);
    // without "let" pixelInstance would be global variable

    // pixelInstance
    // is a new instance of PixelClass
    // created with 4 parameters:
    // x and y start points, radius and speed

    pixelArray.push(pixelInstance);

    //each pixelInstance is added to end of pixelArray
  }
}

// define an anchor position for each pixel
// in the for loop
// maybe start with still image
// before doing video image

/*** end SETUP FUNCTION ********************/

/*** DRAW FUNCTION ********************/

// 2 big things about class: properties and methods (data and functions)
// properties can be from exteral parameters or internal properties
// public properties : can be used outside class
// classInstance.property outside the class
// private properties : only used inside the class
// this.property inside the class
// parameters coming in are public
// then assigned as private properties of the class
// in the constructor function this.x = x
//

function draw() {
  background(255, 210, 0);

  for (let arrayElement of pixelArray) {
    arrayElement.bounceRandom();
    let overlap = false;
    // for (let other of pixelArray) // for of version
    for (let indy = 0; indy < pixelArray.length; indy++) // long version
    {
      let other = pixelArray[indy];
      // for and let lines above are equivalent to for
      // shorthand for each index value of array
      //     if (arrayElement !== other && arrayElement.intersectsBool(other)) {
      if (arrayElement.intersectsBool(other)) {
        // !== other defines other as not this
        //       console.log("intersection");
        overlap = true;
      }
    }
    // why at end of outer loop
    // not inner loop
    // this is to check for single intersection
    // if I wanted increased brightness with each intersection
    //put it in inner loop
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
    this.brightness = 0;
  }

  //*** class functions ***//

  intersectsBool(other) {
    if (other == this) {
      return false;
    }
    let d = dist(this.x, this.y, other.x, other.y);
    return this.r + other.r > d;
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

//https://editor.p5js.org/novo/sketches/UgDMz9aMr
// february 9, 2023
