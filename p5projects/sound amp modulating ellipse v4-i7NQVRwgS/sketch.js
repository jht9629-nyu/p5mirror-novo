//sound amp modulating ellipse v4
//https://editor.p5js.org/benjamin.bergery/sketches/gAsYMIAJh
// using amp.getLevel()

let amp;

let button;
let song;
let volSlider, rateSlider, panSlider;

let xLabel = 20;
let xMargin = 60;
let yTop;
let yLine = 33;
//////////////////

function setup() {
  createCanvas(400, 200);
  createP();
  createSpan(" ");
  yTop = height + 60;
  button = createButton("PLAY");
  createP();
  button.mousePressed(togglePlaying);

  createSliders();

  // callback adds a "loaded" function
  song = loadSound("sounds/Parfum.mp3", loaded);

  // p5.Amplitude does not work in draw function
  let smoothie = 0;
  amp = new p5.Amplitude(smoothie);
}
/////////////////////

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("PAUSE");
  } else {
    song.pause();
    button.html("PLAY");
  }
}
/////////////////////

// with callback you create
// external "loaded" function
// which waits before playing song

function loaded() {
  //song.play();
  song.loop();
}
///////////////////

function draw() {
  background(255);

  let vo = volSlider.value();
  song.setVolume(vo);
  let ra = rateSlider.value();
  song.rate(ra);
  let pa = panSlider.value();
  song.pan(pa);

  amp.smooth();
  let level = amp.getLevel() * 20;
  let xMod = level * 100;
  console.log(xMod);
  let yMod = level * 800;

  noStroke();
  fill(255 - yMod/2, 0, 255 - yMod, 220);
  ellipse(width / 2, height / 2, width, height);
  fill(yMod, 0, xMod, 220);
  ellipse(width / 2, height / 2, width / 2, height / 2);
}
////////////////////////////

function createSliders() {
  //let xMargin, yTop, yLine;

  createP();
  createSpan("volume ");
  volSlider = createSlider(0, 1, 0.75, 0.01);
  volSlider.position(xMargin, yTop);
  volSlider.style("width", "100px");

  createP();
  createSpan("speed ");
  rateSlider = createSlider(0, 2, 1, 0.01);
  rateSlider.position(xMargin, yTop + yLine);
  rateSlider.style("width", "100px");

  createP();
  createSpan("pan ");
  panSlider = createSlider(-1, 1, 0, 0.01);
  panSlider.position(xMargin, yTop + yLine * 2);
  panSlider.style("width", "100px");
}
/////////////////////

//sound playback sliders callback pause-button v3
//https://editor.p5js.org/benjamin.bergery/sketches/dHeNZ2q0-
// 2 ways to load sound:
// preload
// CALLBACK

// amplitude = new p5.Amplitude([smoothing])
//Amplitude measures volume between 0.0 and 1.0.
// optional smoothing Number: between 0.0 and .999 to smooth amplitude readings (defaults to 0) defaults to 0.
//getLevel() Returns a single Amplitude reading at the moment it is called. For continuous readings, run in the draw loop.

//https://editor.p5js.org/benjamin.bergery/sketches/Ky8-K_K_G
