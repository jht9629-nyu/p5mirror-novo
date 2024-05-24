// https://editor.p5js.org/jht9629-gmail/sketches/dLk5kCeTO
// pixel combo Layer

let drawers = [
  // draw_random, //
  draw_bright,
  // draw_paint,
  // draw_paint,
];
let drawers_index = 0;
let aRun = true;
let aNextSecs = 0;
let aDelay = 5.0;
// let aDelays = [0.5, 1, 0.5, 1, 0.5, 4, 0.5, 4];
// let aDelays = [1, 2, 3, 4];
let aDelays = [1]
let aDelayIndex = 0;

let upScale = 2;

function setup() {
  createCanvas(320 * upScale, 240 * upScale);
  pixelDensity(1);

  setup_bright();
  setup_paint();
  setup_random();
  
  createButton("Next").mousePressed(next_action);

  // checkbox time based running
  createCheckbox('Run', aRun).changed(function() {
    aRun = this.checked();
  });
  
  aNextSecs = millis() / 1000.0 + aDelays[0];
}

function draw() {
  draw_random();
  draw_bright();
  // draw_paint();
}

function draw_timed() {
  let func = drawers[drawers_index];
  func();
  // if (aRun && frameCount % 60 == 0) {
  //   next_action()
  // }
  let now = millis() / 1000.0
  if (aRun && now > aNextSecs) {
    aDelayIndex = (aDelayIndex + 1) % aDelays.length;
    aDelay = aDelays[aDelayIndex]
    aNextSecs = now + aDelay;
    next_action();
  }
}

function next_action() {
  drawers_index = (drawers_index + 1) % drawers.length;
}



// https://editor.p5js.org/jht9629-gmail/sketches/tI8IX029X
// pixel combo Next TIme millis aDelays

// https://editor.p5js.org/jht9629-gmail/sketches/PPU_1IFRa
// pixel combo Next TIme millis 

// https://editor.p5js.org/jht9629-gmail/sketches/4p4LPWvat
// pixel combo Next TIme frameCount

// https://editor.p5js.org/jht9629-gmail/sketches/b9tLAOHqq
// pixel combo v3
// Next drawing

// https://editor.p5js.org/jht9629-gmail/sketches/xvdjaQIhM
// pixel combo v2
// effects in bands

// https://editor.p5js.org/jht9629-gmail/sketches/_BoYAq-PI
// pixel combo

// https://editor.p5js.org/jht9629-nyu/sketches/1DfZ5dRU1

// https://editor.p5js.org/jht9629-nyu/sketches/a0HDzoroq

// https://editor.p5js.org/jht9629-nyu/sketches/sd8fP5xtL
