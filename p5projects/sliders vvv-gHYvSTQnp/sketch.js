// sliders and buttons
// https://editor.p5js.org/novo/sketches/gHYvSTQnp

// "created" objects like sliders & buttons  do not need to be declared
let r, g, b;
let bcircle;

function setup() {
  createCanvas(400, 225);
  background(222);
  make3sliders();
}

function draw() {
  background(222);

  r = slide1.value();
  g = slide2.value();
  b = slide3.value();

  displayRGBvalues();

  fill(r, g, b);
  noStroke();
  // drawingContext.filter = 'blur(2px)';
  bcircle = circle(width / 2, height / 2, 150);
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



// function locksliders() {
//   gangSliders = 
// }


function displayRGBvalues() {
  fill(0);
  text("R = " + r, 20, height - 10);
  text("G = " + g, 80, height - 10);
  text("B = " + b, 140, height - 10);
}
