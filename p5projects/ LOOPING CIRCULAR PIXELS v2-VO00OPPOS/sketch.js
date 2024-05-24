// LOOPING CIRCULAR PIXELS v2
//https://editor.p5js.org/novo/sketches/GEqhb63jK

let thevideo;
let vScale = 15;
let brightnessFactor = 2; 

function setup() {
  createCanvas(380, 520);
  pixelDensity(1);

  // video stream from camera
  //video = createCapture(VIDEO);
  thevideo = createVideo(['portrait3.mp4']);

  setupVidscaleSlider();
  setupBrightSlider();
  
    thevideo.loop();
}



function draw() {
  background(40);
 // thevideo.stop();
  // thevideo.loop();

  // loadPixels() loads R,G,B,Alpha
  // values for each pixel
  // of a single frame
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
      thevideo.size(width / vScale, height / vScale);

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
  vidscaleSlide = createSlider(1, 30, 9, 0.5);
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
