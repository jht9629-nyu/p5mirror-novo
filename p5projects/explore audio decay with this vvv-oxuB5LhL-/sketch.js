// explore audio decay with this
/*
https://p5js.org/reference/#/p5.Envelope
https://p5js.org/reference/#/p5.Envelope/setADSR
*/

let env;
let fft;
let sound;

// full amplitude level
let attackLevel = 1;

// amplitude level when envelope finishes
// try changing this to something other than zero!
let releaseLevel = 12;

let attackTime;
let decayTime;
let sustainRatio;
let releaseTime;

function preload() {
  sound = loadSound('gong.mp3');
}


function setup() {
  createCanvas(400, 400);

  // create an envelope to shape 
  // the sound's amplitude (volume) over time
  env = new p5.Envelope();
  // create a FFT object to visualize the sound
  fft = new p5.FFT();
  fft.setInput(sound);
}

function mousePressed() {
  // set max and min amplitude levels of envelope
  env.setRange(attackLevel, releaseLevel);
  // these parameters are described below
  env.setADSR(attackTime, decayTime, sustainRatio, releaseTime);
  // play the given input
  sound.play();
  env.play(sound); 
}


function draw() {
  background(0);

  // seconds to fade up to full amplitude
  attackTime = map(mouseX, 0, width, 0, 2);

  // seconds to fade down from full amplitude
  decayTime = map(mouseY, 0, height, 0, 2);

  // percent to sustain level after the fade down, 0 - 1
  sustainRatio = map(mouseX, 0, width, 0, 1);

  // seconds to fade out to release level amplitude
  releaseTime = map(mouseY, 0, height, 0, 2);

  textSize(16);
  fill(255);
  text(`fade up - attackTime: ${attackTime}`, 10, 320);
  text(`fade down - decayTime: ${decayTime}`, 10, 340);
  text(`sustain - sustainRatio: ${sustainRatio}`, 10, 360);
  text(`fade to release level - releaseTime: ${releaseTime}`, 10, 380);

  // Visualize the sound's waveform 
  let waveform = fft.waveform();
  beginShape();
  noFill();
  stroke(255);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
}

//https://editor.p5js.org/enickles/sketches/naDH3d9hS