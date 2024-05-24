//17.6 oscillator via jht
//https://editor.p5js.org/benjamin.bergery/sketches/m-U6k1J8S

let wave;

let button;
let slider;
let playing = false;

function setup() {
  createCanvas(100, 100);

  slider = createSlider(100, 1200, 440,110); // 4th variable important
  // to avoid sliding across all the notes
  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(0);

  button = createButton('play/pause');
  button.mousePressed(toggle);
}

function draw() {
  wave.freq(slider.value());
  if (playing) {
    background(255, 0, 255);
  } else {
    background(51);
  }
}

function toggle() {
  if (!playing) {
    // amp(vol, [rampTime], [timeFromNow])
    wave.amp(0.5, 1);
    playing = true;
  } else {
    wave.amp(0, 1);
    playing = false;
  }
}

// https://editor.p5js.org/jht1493/sketches/PNuNz9dfX
// 17.6_soundSynthesis

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Bk8rLzzSink

// https://github.com/CodingTrain/website/blob/main/
//  Tutorials/P5JS/p5.js_sound/
//  17.6_soundSynthesis/sketch.js

// https://p5js.org/reference/#/p5.Oscillator
//https://editor.p5js.org/jht1493/sketches/PNuNz9dfX