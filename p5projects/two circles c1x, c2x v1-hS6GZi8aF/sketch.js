// https://editor.p5js.org/novo/sketches/hS6GZi8aF
// two circles c1x, c2x v1

let c1x = 100;
let c1y = 150;
let c1xspeed = 0;
let c1yspeed = 10;
let c1size = 40;

let c2x = 100;
let c2y = 150;
let c2xspeed = 10;
let c2yspeed = 0;
let c2size = 40;

function setup() {
  createCanvas(400, 300);
  // must do in step because random not available
  // c1size = random(width)
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  
  circle(c1x, c1y, c1size);
  c1x = (c1x + c1xspeed) % width;
  c1y = (c1y + c1yspeed) % height;
  
  circle(c2x, c2y, c2size);
  c2x = (c2x + c2xspeed) % width;
  c2y = (c2y + c2yspeed) % height;

}

function mousePressed() {
  c1x = 0;
  c2x = 0;
}


// Make Your Own (Make Your Own Variable)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/2.2-make-your-own.html
// https://youtu.be/dRhXIIFp-ys

// Make Your Own Variable: https://editor.p5js.org/codingtrain/sketches/xPXNdPy17
// Growing Circle Exercise: https://editor.p5js.org/codingtrain/sketches/ehbMJ-otC