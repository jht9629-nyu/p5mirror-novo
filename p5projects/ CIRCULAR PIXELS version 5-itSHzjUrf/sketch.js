// CIRCULAR PIXELS version 5
// https://editor.p5js.org/benjamin.bergery/sketches/H9C5i95mV

let video;
let vScale = 15;
let brightnessFactor = 2;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);

  // video stream from camera
  //video = createCapture(VIDEO);

  setupVidscaleSlider();
  setupBrightSlider();
}

function draw() {
  background(40);
  
video = createVideo(['walk3.mp4'])


  // loadPixels() loads R,G,B,Alpha
  // values for each pixel
  // of a single frame
  // into an array called pixels

  video.loadPixels();

  // 2 nested for loops scan every y line
  // for x values of a single frame

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {

      // index jumps every 4 values of
      // R,G,B,Alpha in pixels array

      let index = (video.width - x + 1 + y * video.width) * 4;

      // assigning R G B values for each pixel

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      // RGB values are added then divided
      // by brightness factor set by slider.
      // Smaller factor => higher bright

      brightnessFactor = brightSlide.value();
      let bright = (r + g + b) / brightnessFactor;

      // Slider sets scale
      // of small video source
      // seen below canvas.
      // Smaller source means bigger pixels
      // on canvas above

      vScale = vidscaleSlide.value();
      video.size(width / vScale, height / vScale);

      // Circular pixel radius length 
      // is mapped to pixel brightness.
      // Brighter pixels => bigger pixel

      let radius = map(bright, 0, 255, 0, vScale * 1.2);

      // output pixel is a solid color circle
      // these low-res geometrical shapes
      // are displayed quickly

      noStroke();
      fill(r, g, b, 255);
      ellipse(x * vScale, y * vScale, radius, radius);
    }
  }
}


function setupVidscaleSlider() {
  createP("  ");
  createSpan("Resolution is set by scale of video source -- 1 to 30 ");
  vidscaleSlide = createSlider(1, 30, 15, 0.5);
}

function setupBrightSlider() {
  createP("  ");
  createSpan("Pixel size is modified by brightness factor -- 0 to 10 ");
  brightSlide = createSlider(0, 10, 2, 0.1);
}

///////////////////////////////////////////

// https://github.com/CodingTrain/website-archive/tree/main/Tutorials/P5JS/p5.js_video
// https://editor.p5js.org/jht1493/sketches/hrpVXSthK
// 11.4_p5.js_brightness_mirror
// https://www.youtube.com/watch?v=rNqaw8LT2ZU&list=PLRqwX-V7Uu6aKKsDHZdDvN6oCJ2hRY_Ig&index=5
// https://editor.p5js.org/benjamin.bergery/sketches/2L0pNLXu3//

//   rectMode(CENTER);
// rect(x * vScale, y * vScale, w, w);

// vid = createVideo(
//    ['assets/small.mp4', 'assets/small.ogv', 'assets/small.webm'],
 //   vidLoad
 // );
