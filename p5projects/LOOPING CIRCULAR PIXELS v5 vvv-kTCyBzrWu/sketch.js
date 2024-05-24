// LOOPING CIRCULAR PIXELS v5 vvv
// https://editor.p5js.org/novo/sketches/kTCyBzrWu

///////////////////// GLOBAL VARIABLES >>>>>>>>>>>>>>>>>>>

let thevideo;
let vScale = 15;
let brightnessFactor = 2;
let button;
let VideoPlayingBoolean;
let vidscaleSlide, brightSlide;
let alphaValue = 200;

///////////////////// SETUP FUNCTION >>>>>>>>>>>>>>>>>>>>>>

function setup() {
  createCanvas(800, 450);
  pixelDensity(1);

  thevideo = createVideo("floaters106-12secs.mp4");

  // createP(' ');
  thevideo.size(160, 90);
  thevideo.position(0, height + 175);

  setupVidscaleSlider();
  setupBrightSlider();

  setupOtherSlider1();
  setupOtherSlider2();

  button = createButton("pause/play");
  button.position(500, height + 16);
  // button.mousePressed(pausePlay);

  thevideo.loop();
  VideoPlayingBoolean = true;
}

///////////////////// DRAW FUNCTION >>>>>>>>>>>>>>>>>>>>>>

function draw() {
  background(40);

  button.mousePressed(pausePlay);

  // loadPixels() loads R,G,B,Alpha
  // values for each pixel
  // of the current frame
  // into an array called pixels

  thevideo.loadPixels();

  // 2 nested for loops scan every y line
  // for x values of a single frame

  for (let y = 2; y < thevideo.height; y++) {
    for (let x = 2; x < thevideo.width; x++) {
      // index jumps every 4 values of
      // R,G,B,Alpha in pixels array

      let index = (thevideo.width - x + 1 + y * thevideo.width) * 4;

      // assigning R G B values for each pixel

      let r = thevideo.pixels[index + 0];
      let g = thevideo.pixels[index + 1];
      let b = thevideo.pixels[index + 2];
      let a = thevideo.pixels[index + 3];

      // RGB values are added then divided
      // by brightness factor set by slider.
      // Smaller factor => higher bright

      brightnessFactor = brightSlide.value();

      alphaValue = otherSlide1.value();
      redScalar = otherSlide2.value();

      //let bright = (r + g + b) / brightnessFactor;
      let bright = (r + g + 0) / brightnessFactor;

      // Slider sets scale
      // of small video source
      // seen below canvas.
      // Smaller source below means bigger pixels
      // on canvas on right

      vScale = vidscaleSlide.value();

      thevideo.size(width / vScale, height / vScale);

      // Circular pixel radius length
      // is mapped to pixel brightness.
      // Brighter pixels => bigger pixel

      let radius = map(bright, 0, 255, 0, vScale * 1.5);

      // each output pixel is a solid color circle
      // these low-res geometrical shapes
      // are displayed quickly

      noStroke();
      // fill(r, g, b, 255);
      fill(r, g, b, alphaValue);
      ellipse(x * vScale, y * vScale, radius, radius);

      // for testing only as console.log really slows down the program
      // console.log('vScale = '+ vScale);
      // console.log('brightness factor = '+ brightnessFactor);
    }
  }
}

///////////// EXTERNAL FUNCTIONS >>>>>>>>>>>>>>>>>>>>>>

function setupVidscaleSlider() {
  createP("  "); // spacer to separate slider from canvas
  createSpan("Resolution is set by scale of video source -- 1 to 30 ");
  vidscaleSlide = createSlider(1, 30, 25, 0.5);
}

function setupBrightSlider() {
  createP("  "); // spacer
  createSpan("Pixel size is modified by brightness factor -- 0 to 10 ");
  brightSlide = createSlider(0, 10, 0.7, 0.1);
}

function setupOtherSlider1() {
  createP("  "); // spacer
  createSpan("A new slider to  play with ==> alphaValue -- 0 to 255 ");
  otherSlide1 = createSlider(0, 255, 200, 1);
}

function setupOtherSlider2() {
  createP("  "); // spacer
  createSpan("Another new slider to  play with -- 0 to 10 ");
  otherSlide2 = createSlider(0, 10, 1.2, 0.1);
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

//   rectMode(CENTER);
// rect(x * vScale, y * vScale, w, w);
