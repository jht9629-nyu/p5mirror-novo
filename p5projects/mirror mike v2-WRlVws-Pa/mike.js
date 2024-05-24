// https://editor.p5js.org/jht9629-nyu/sketches/Y2LMO3xGx
// 17.8: Microphone Input

// https://editor.p5js.org/jht1493/sketches/AjlzQD2gj
// 17.8: Microphone Input

let mic;

function setup_mike() {
  // createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();
}

function draw_mike() {
  // background(0);
  let vol = mic.getLevel();
  // console.log('vol', vol)
  fill(255,120);
  ellipse(width/2, height/2+30, 200, vol * 4000);
}

// https://editor.p5js.org/jht1493/sketches/AjlzQD2gj
// 17.8: Microphone Input

// https://github.com/CodingTrain/website/blob/main/
// Tutorials/P5JS/p5.js_sound/
// 17.8_minInput/sketch.js
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/q2IDNkUws-A

