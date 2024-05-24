// https://editor.p5js.org/novo/sketches/HrAg0mSPI
// two circles c1x, c2x v5

// if you do need methods inside the object
// better to use classes instead of object literals

let c1 = {x: 100, y: 150, xs: 4, ys: 10, sz: 40};
let c2 = {x: 100, y: 150, xs: 10, ys: 5, sz: 40};

// to do add a c3,
// see if you can add fill property
// things inside objects are properties
// inside object
// add randomness, vary some properties with randomness
// to create generative art


function setup() {
  createCanvas(400, 300);
}

function draw() {
  // background(0);
  noStroke();
  
  fill(255, 0, 255, 10);
  draw_circle(c1);
  
  fill(255, 0, 0, 10);
  draw_circle(c2);
}

function draw_circle(cp) {
  circle(cp.x, cp.y, cp.sz);
  // circle method with parameters
  // object literal can be a parameter
  // variable can be a parameter
  // technically any expression,
  // could be variable, a calculation, object literal
  // objects can be bags of properties
  cp.x = (cp.x + cp.xs) % width;
  cp.y = (cp.y + cp.ys) % height;
}

// modula a % b
// = integer remainder of 
// a divided by b
// https://www.youtube.com/watch?v=r5Iy3v1co0A

// function draw_circle1() {
//   circle(c1.x, c1.y, c1.sz);
//   c1.x = (c1.x + c1.xs) % width;
//   c1.y = (c1.y + c1.ys) % height;
// }

// function draw_circle2() {
//   circle(c2.x, c2.y, c2.sz);
//   c2.x = (c2.x + c2.xs) % width;
//   c2.y = (c2.y + c2.ys) % height;
// }

function mousePressed() {
  c1.x = 0;
  c2.x = 0;
}

// https://editor.p5js.org/novo/sketches/hS6GZi8aF
// two circles c1x, c2x v1

// Make Your Own (Make Your Own Variable)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/2.2-make-your-own.html
// https://youtu.be/dRhXIIFp-ys

// Make Your Own Variable: https://editor.p5js.org/codingtrain/sketches/xPXNdPy17
// Growing Circle Exercise: https://editor.p5js.org/codingtrain/sketches/ehbMJ-otC

// https://editor.p5js.org/novo/sketches/dhwHHrV6K
// two circles c1x, c2x v2

// https://editor.p5js.org/novo/sketches/IspPkUPQj
// two circles c1x, c2x v3

// https://editor.p5js.org/novo/sketches/IspPkUPQj
// two circles c1x, c2x v4
// 2 object litterals with same shape
