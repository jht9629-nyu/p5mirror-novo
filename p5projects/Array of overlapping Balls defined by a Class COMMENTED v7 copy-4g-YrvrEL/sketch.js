// Array of overlapping Balls defined by a Class COMMENTED v7
// https://editor.p5js.org/novo/sketches/WpaS3PG50
// sketch HEAVILY COMMENTED :) for  bbdemos
//

/*** OVERVIEW ********************/
// An ARRAY of bouncing black "balls" is defined by a CLASS.
// Balls switch to white while overlapping one or more OTHER balls.
// We use verbose object names to clearly identify
// ballArray and array_Element (the ARRAY and its ELEMENTS)
// BallClass and ball_Instance (the CLASS and its INSTANCES)

// A key feature is that 
// each ball/instance uses its INTERNAL CLASS METHOD
// to evaluate its RELATIONSHIP to every other ball/instance.
// This is an example of the power and elegance of
// OBJECT-ORIENTED programming.
//  

/*** SKETCH PARTS ********************/
// This p5js sketch is composed of 4 sections:

// 1. Global variables declared
// including ballArray, a global variable used in setup and draw functions
// ballArray is composed of ARRAY ELEMENTS (the moving circles)
// which are INSTANCES of a CLASS

// 2. setup function
// with a loop that populates the ballArray
// by creating different INSTANCES of BallClass
// with randomly different size, speed and position PROPERTIES.
// Each INSTANCE is added as an ELEMENT to ballArray

// 3. draw function
// a loop continuously tests for overlaps for each Element of ballArray
// and changes their color when that happens.
// Note that the tests could be for proximity, direction, crowding or ...
// and the changes could be to speed, size, color or ...

// 4. BallClass
// with CONSTRUCTOR PARAMETERS (variables passed to the constructor function)
// that define 5 of the 6 ATTRIBUTES (distinguishing properties)
// of a ball_Instance : x,y location, radius, x,y speed
// with METHODS (internal functions of a class)
// for setting the size, moving and bouncing each ball_Instance
// and also testing for overlap and changing the color
//
// other versions could have different moving, testing and transforming functions...

//
/*** GLOBAL VARIABLES ********************/
let ballArray = [];
let numberOfBalls = 10;
let maxSpeed = 2;

//
/*** SETUP FUNCTION ********************/
function setup() {
  createCanvas(700, 450);

  // a for loop fills (populates) Array
  // with new ball_Instances of BallClass

  for (let index = 0; index < numberOfBalls; index++) {
    let bradius = random(10, 60);
    let bspeed = random(0.5, maxSpeed);
    let xstart = random(bradius, width - bradius);
    let ystart = random(bradius, height - bradius);
    // "let" here specifies a local variable

    let ball_Instance = new BallClass(xstart, ystart, bradius, bspeed);
    // ball_Instance is a new Instance of BallClass
    // created with 4 external PARAMETERS: x, y start points, radius and speed

    ballArray.push(ball_Instance);
    //push method adds each new ball_Instance to the end of ballArray
  }
}
/*** end SETUP FUNCTION ********************/

//
/*** DRAW FUNCTION ********************/
function draw() {
  background(255, 210, 0);

  // OUTER for loop
  for (let index = 0; index < ballArray.length; index++) {
    let array_Element = ballArray[index];

    // the shorter "for of" version of 2 lines above is:
    // for (let array_Element of ballArray) {

    array_Element.bounceRandom();
    let overlap = false;

    // INNER for loop //////
    for (let indy = 0; indy < ballArray.length; indy++) {
      let other = ballArray[indy];

      // shorter "for of version" of 2 lines above is:
      // for (let other of ballArray)

      if (array_Element.intersectsBool(other)) {
        overlap = true;
      }

      if (overlap) {
        array_Element.changeColor(255);
      } else {
        array_Element.changeColor(0);
      }
    } // end INNER for loop //////

    // if (overlap) {
    //   array_Element.changeColor(255);
    // } else {
    //   array_Element.changeColor(0);
    // }
  }
  // changeColor method at end of OUTER for loop
}

// What is the difference between putting array_Element.changeColor
// at end of INNER (as it is now) versus OUTER loop ?

/*** end DRAW FUNCTION ********************/

//
/*** CLASS ********************/
// A Class combines PROPERTIES and METHODS (data and functions)

// Properties can be defined internally or from external parameters
// PUBLIC properties : can be used outside class with syntax
// "classInstance.property"
// PRIVATE properties : only used inside the class with syntax
// "this.property"

// The same is true of METHODS, with syntax of
// "classInstance.method" OR "this.method"

class BallClass {
  //*** class constructor ***//

  constructor(x, y, r, bsp) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xsp = bsp; // xspeed
    this.ysp = bsp; // yspeed
    this.brightness = 0;
  }
  // 4 Parameters are external variables "x, y, r" etc.
  // passed on to internal private properties: "this.x, this.y" etc
  // "this.brightness" is defined internally in constructor function

  //*** class methods (internal functions) ***//

  intersectsBool(other) {
    if (other == this) {
      return false;
    }
    let d = dist(this.x, this.y, other.x, other.y);
    return this.r + other.r > d;
  }

  // "other" is an arbitrary word designating the current ball_Instance
  // that is the parameter for the intersectsBool method

  // (other == this) evaluates to false in the one case
  // when the method compares the ball_Instance with itself

  // When comparing this ball with any other ball,
  // (this.r + other.r > d) returns true if they overlap

  //-----------------

  changeColor(c) {
    this.brightness = c;
  }

  //-----------------

  bounceRandom() {
    this.move();
    this.show();
  }

  // bounceRandom is "meta method"
  // that calls two other methods inside the Class

  //-----------------

  show() {
    strokeWeight(3);
    fill(this.brightness);
    ellipse(this.x, this.y, this.r * 2);
  }

  // show() method draws the colored circle every frame

  //-----------------

  move() {
    this.x = this.x + this.xsp;
    this.y = this.y + this.ysp;
    // move the ball at speed xsp and ysp

    // bounce off horizontal edges
    if (this.x >= width - this.r || this.x <= 0 + this.r) {
      this.xsp = -this.xsp;
    }
    // bounce off vertical edges
    if (this.y >= height - this.r || this.y <= 0 + this.r) {
      this.ysp = -this.ysp;
    }
  }
}

/*** end CLASS ********************/

// this is based on an exercise for John Henry Thompson's course (jht1400)
