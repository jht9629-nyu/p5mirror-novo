// mouth amp modulating ellipse v4
// https://editor.p5js.org/novo/sketches/a_naw5c91
// using amp.getLevel()

let amp;
let button;
let song;
let volSlider, rateSlider, panSlider;

let xLabel = 20;
let xMargin = 10;
let yTop = 290;
let yLine = 30;
//////////////////

function setup_mouth() {
  createCanvas(400, 240);
  background(130);
  createP();
  createSpan(" ");
  button = createButton("PLAY");
  button.mousePressed(togglePlaying);

  createSliders();

  // callback adds a "loaded" function
  song = loadSound("Parfum.mp3", loaded);

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

function draw_mouth() {
  // background(200);

  let vo = volSlider.value();
  song.setVolume(vo);
  let ra = rateSlider.value();
  song.rate(ra);
  let pa = panSlider.value();
  song.pan(pa);

  amp.smooth();
  let level = amp.getLevel()*20;
  let xMod = level * 100;
    // console.log(xMod);
  let yMod = level * 800;
  
    noStroke();
   fill(255-xMod, 0, 128-yMod,130); 
  ellipse(width / 2, (height / 2), width -xMod, height/2 +xMod/2);
  fill(xMod+50, xMod+50, yMod+50,30)
  ellipse(width / 2, height / 2, width/2, height/4 + yMod/10);
  
}
////////////////////////////

function createSliders() {
  //let xMargin, yTop, yLine;

  volSlider = createSlider(0, 1, 0.5, 0.01);
  volSlider.position(xMargin, yTop);
  volSlider.style("width", "100px");

  rateSlider = createSlider(0, 2, 1, 0.01);
  rateSlider.position(xMargin, yTop + yLine);
  rateSlider.style("width", "100px");

  panSlider = createSlider(-1, 1, 0, 0.01);
  panSlider.position(xMargin, yTop + yLine * 2);
  panSlider.style("width", "100px");
}
/////////////////////