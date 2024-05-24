// sliders and buttons
// https://editor.p5js.org/novo/sketches/gHYvSTQnp

let A, B, C;
let bcircle;

function setup() {
  createCanvas(400, 225);
  background(222);
  make3sliders();
}

function draw() {
  background(222);

  A = slide1.value();
  B = slide2.value();
  C = slide3.value();

  displayRGBvalues();

  fill(A, B, C);
  noStroke();
  // drawingContext.filter = 'blur(2px)';
  bcircle = circle(width / 2, height / 2, 150);
}

function make3sliders() {
  createP("");
  createSpan(" A ");
  slide1 = createSlider(0, 255, 200);
  createP("");
  createSpan(" B ");
  slide2 = createSlider(0, 255, 100);
  createP("");
  createSpan(" C ");
  slide3 = createSlider(0, 255, 255);
}



// function locksliders() {
//   gangSliders = 
// }


function displayRGBvalues() {
  fill(0);
  text("A = " + A, 20, height - 10);
  text("B = " + B, 80, height - 10);
  text("C = " + C, 140, height - 10);
}
