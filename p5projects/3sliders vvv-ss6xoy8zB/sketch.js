// 3sliders
// https://editor.p5js.org/novo/sketches/ss6xoy8zB

// "created" objects like sliders & buttons  do not need to be declared
let bcircle;
let r, g, b;

function setup() {
  createCanvas(400, 225);
  background(222);
  make3sliders();
}

function draw() {
  r = slide1.value();
  g = slide2.value();
  b = slide3.value();

  background(222);
  displayRGBvalues();

  fill(r, g, b);
  noStroke();
  bcircle = circle(width / 2, height / 2, 150);
   // drawingContext.filter = 'blur(2px)';
}

function make3sliders() {
  createP("");
  createSpan(" R ");
  slide1 = createSlider(0, 255, 200);
  createP("");
  createSpan(" G ");
  slide2 = createSlider(0, 255, 100);
  createP("");
  createSpan(" B ");
  slide3 = createSlider(0, 255, 255);
}

function displayRGBvalues() {
  fill(0);
  text("R = " + r, 20, height - 10);
  text("G = " + g, 80, height - 10);
  text("B = " + b, 140, height - 10);
}
