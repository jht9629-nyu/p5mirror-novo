// asliders = sliders with anonymous functions

let aSlider1Val = 222;
// this global used in setup and in an external function
// must be assigned a value

function setup_anonSliders() {
//  createCanvas(400, 250);
  // normalSlider();
  // top slider will change circle fill color
  aSlider1();
}

function draw_anonSliders() {
  background(aSlider1Val);
  // aSlider1Val defined in anonymous function

  // let circle_color = topSlider.value();
  // // fill color using .value() method
  // fill(circle_color);
  // circle(200, 60, 100);
}

function normalSlider() {
  topSlider = createSlider(0, 255, 150);
  topSlider.position(130, 120);
}

function aSlider1() {
  let anonSlider1 = createSlider(0, 255, 222).input(function () {
    aSlider1Val = this.value();
    // "this.value()" is same as "anonSlider1.value()"
  });
}
