// make1slider
// https://editor.p5js.org/novo/sketches/P6fZaYFub

let s1value;

function setup() {
   make1slider();
}

function draw() {
  s1value = slide1.value();
  showS1value();
}

function make1slider() {
  createP("");
  createSpan(" slider1 ");
  slide1 = createSlider(0, 255, 200);
}

function showS1value() {
  fill(0);
  text("S1 = " + s1value, 20, height - 10);
}
