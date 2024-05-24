// LOOPING CIRCULAR PIXELS v11 vvv
//https://editor.p5js.org/novo/sketches/AOxUpoeMA


///////////////////// GLOBAL VARIABLES >>>>>>>>>>>>>>>>>>>

let thevideo;
let vScale = 15;
let brightnessFactor = 2;
let button;
let VideoPlayingBoolean;
let vidscaleSlide, brightSlide;
let = 200;

///////////////////// SETUP FUNCTION >>>>>>>>>>>>>>>>>>>>>>

function setup() {
  createCanvas(800, 450);
  pixelDensity(1);
      noStroke(); 

  thevideo = createVideo("walk3.mp4");

  thevideo.size(160, 90);
  thevideo.position(0, height + 200);

  setupVidscaleSlider();
  setupBrightSlider();

  setupOtherSlider1();
  setupOtherSlider2();
  setupOtherSlider3()

  button = createButton("pause/play");
  button.position(500, height + 16);
  button.mousePressed(pausePlay);

  thevideo.loop();
  VideoPlayingBoolean = true;
  frameRate(8);
  // better way to smooth motion and randomness??
  
  setup_mike();
}

///////////////////// DRAW FUNCTION >>>>>>>>>>>>>>>>>>>>>>

function draw() {
  background(40);

  // button.mousePressed(pausePlay);

  // loadPixels() loads R,G,B,Alpha
  // values for each pixel
  // of the current frame
  // into an array called pixels

  thevideo.loadPixels();

  // 2 nested for loops scan every y line
  // for x values of a single frame
  
  // strategy is empty for loop as much as possible
  // because that takes processing time
  // for every pixel

  for (let y = 2; y < thevideo.height; y++) {
    for (let x = 2; x < thevideo.width; x++) {
      // index jumps every 4 values of
      // R,G,B,Alpha in pixels array

      let index = (thevideo.width - x + 1 + y * thevideo.width) * 4;

      // assigning R G B values for each pixel

      let r = thevideo.pixels[index + 0];
      let g = thevideo.pixels[index + 1];
      let b = thevideo.pixels[index + 2];
      // let a = thevideo.pixels[index + 3];

      // RGB values are added then divided
      // by brightness factor set by slider.
      // Smaller factor => higher bright

      brightnessFactor = brightSlide.value();

      // convert to anonymous function
      // and lose all .value calls
      // will speed up
      Eliptical= otherSlide1.value();
      redScalar = otherSlide2.value();
      randomRadius = random(otherSlide3.value());

      //let bright = (r + g + b) / brightnessFactor;
      // RED SCALAR >>>>>
      // brightness factor >>>>>>> PIXEL SIZE
      let bright = (r * redScalar + g + b) / brightnessFactor;

      // Slider sets scale
      // of small video source
      // seen below canvas.
      // Smaller source below means bigger pixels
      // on canvas above

      vScale = vidscaleSlide.value();

      thevideo.size(width / vScale, height / vScale);

      // Circular pixel radius length
      // is mapped to pixel brightness.
      // Brighter pixels => bigger pixel

      let radius = map(bright, 0, 255, 0, vScale * 1.5);

      // each output pixel is a solid color ellipse
      // low-res geometrical shapes
      // are displayed quickly

      // fill(r, g, b, 255);
      fill(r, g, b, 255);
      ellipse(x * vScale, y * vScale, radius * randomRadius, radius * Eliptical
    );

      // for testing only as console.log really slows down the program
      // console.log('vScale = '+ vScale);
      // console.log('brightness factor = '+ brightnessFactor);
    }
  }
  draw_mike();
  draw_waveform2();
}

// get amplitude
// and make it a slider 
// to effect radius or color
// change each pixel 
// input is sound wave applied whole frame
// use history of amplitude 
// as wave pattern applied to the pixel
// 
// external function to read instantaneous audio
// sound file and then create an array of its history

// local storage in browser
// 


///////////// EXTERNAL FUNCTIONS >>>>>>>>>>>>>>>>>>>>>>

function setupVidscaleSlider() {
  createP("  "); // spacer to separate slider from canvas
  createSpan("RESOLUTION is set by scale of video source -- 1 to 30 ");
  vidscaleSlide = createSlider(1, 30, 8.5, 0.5);
}

function setupBrightSlider() {
  createP("  "); // spacer
  createSpan("PIXEL SIZE is modified by brightness factor -- 0 to 10 ");
  brightSlide = createSlider(0.1, 10, 4.8, 0.1);
}

function setupOtherSlider1() {
  createP("  "); // spacer
  createSpan("ELIPTICAL (Eliptical) -- 0.25 to 10 ");
  otherSlide1 = createSlider(0.25, 10, 2.75, .5);
}

function setupOtherSlider2() {
  createP("  "); // spacer
  createSpan("RED SCALAR (redScalar) -- 0 to 10 ");
  otherSlide2 = createSlider(0, 10, 7, 0.1);
}

function setupOtherSlider3() {
  createP("  "); // spacer
  createSpan("randomSize (randomRadius) -- 0 to 10 ");
  otherSlide3 = createSlider(.1, 10, 1.2, 0.1);
}

function pausePlay() {
  if (VideoPlayingBoolean) {
    // if the video is playing, pause it
    thevideo.pause();
    VideoPlayingBoolean = false;
    return VideoPlayingBoolean; // return new value of Boolean
  } else thevideo.loop(); // else play it
  VideoPlayingBoolean = true;
  return VideoPlayingBoolean; // return new value of Boolean
}

////////////// NOTES ////////////////////

// https://editor.p5js.org/benjamin.bergery/sketches/2L0pNLXu3//
//https://editor.p5js.org/novo/sketches/GEqhb63jK
// https://editor.p5js.org/novo/sketches/qymizIlQG
// https://editor.p5js.org/novo/sketches/63fQP3CLd

//   rectMode(CENTER);
// rect(x * vScale, y * vScale, w, w);

