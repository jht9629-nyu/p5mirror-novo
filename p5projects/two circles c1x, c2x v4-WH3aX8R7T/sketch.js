// https://editor.p5js.org/novo/sketches/IspPkUPQj
// two circles c1x, c2x v4
// 2 object litterals with same shape

let c1 = {x: 100, y: 150, xs: 0, ys: 10, sz: 40};
let c2 = {x: 100, y: 150, xs: 10, ys: 5, sz: 40};

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(0);
  noStroke();
  
  fill(255);
  draw_circle1();
  
  fill('red');
  draw_circle2();
}

function draw_circle1() {
  circle(c1.x, c1.y, c1.sz);
  c1.x = (c1.x + c1.xs) % width;
  c1.y = (c1.y + c1.ys) % height;
}

function draw_circle2() {
  circle(c2.x, c2.y, c2.sz);
  c2.x = (c2.x + c2.xs) % width;
  c2.y = (c2.y + c2.ys) % height;
}

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
