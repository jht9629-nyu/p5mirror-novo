// 8.3-2 Video Tint with R G B sliders vvv
// createCapture() - image() - tint()
// https://editor.p5js.org/benjamin.bergery/sketches/gSj8LevtS


function setup() {
  createCanvas(400, 300);
  
  capture = createCapture(VIDEO);
  // createCapture() is part of p5 DOM library
  // creates html5 element on page below canvas
  // which can be scripted in the canvas
  capture.size(640/3, 480/3);
  capture.hide(); 
  
  createRGBsliders();
}

function draw() {
  image(capture, 0, 0, width, height);

  // tintWithRGBsliders();
  
  let rval = rslide.value();
  let bval = bslide.value();
  let gval = gslide.value();
  tint(rval, bval, gval);

  
  // filter(THRESHOLD,0.2);
}

function createRGBsliders() {
  createP();
  createSpan("R ");
  rslide = createSlider(0, 255, 128);
  createP(); 
  createSpan("G ");
  bslide = createSlider(0, 255, 128);
  createP();
  createSpan("B ");
  gslide = createSlider(0, 255, 128);
  createP();
   }

// function tintWithRGBsliders() {
//   let rval = rslide.value();
//   let bval = bslide.value();
//   let gval = gslide.value();
//   tint(rval, bval, gval);
// }

// THRESHOLD key Converts the image to black and white pixels depending if they are above or below the threshold defined by the level parameter. The parameter must be between 0.0 (black) and 1.0 (white). If no level is specified, 0.5 is used
// GRAY b&w
// OPAQUE sets alpha channel to entirely opaque (e.g. 255?)
// INVERT negative
// POSTERIZE, Limits each channel of image to number of colors specified as the parameter. parameter can be set to values between 2 and 255, results are most noticeable in the lower ranges
// ERODE, Reduces the light areas. No parameter
// DILATE Increases the light areas. No parameter
// BLUR Gaussian blur very SLLOOOWW
// get's nice around 10
// If no parameter, equivalent to Gaussian blur of radius 1. Larger values increase the blur

//createCapture(type, [callback])
// Parameters
//type String|Constant|Object: type of capture, either VIDEO or AUDIO if none specified, default both, or a Constraints object
//callback Function: function to be called once stream has loaded (Optional)
// Creates a new HTML5 <video> element that contains the audio/video feed from a webcam.
// The element is separate from the canvas and is displayed by default.
// The element can be hidden using .hide().
// The feed can be drawn onto the canvas using image().
// The loadedmetadata property can be used to detect when the element has fully loaded

// filter(filterType, [filterParam])
// Parameters
// filterType Constant: either THRESHOLD, GRAY, OPAQUE, INVERT, POSTERIZE, ERODE, DILATE or BLUR.
// See Filters.js for docs on each available filter
// filterParam Number: an optional parameter unique to each filter, see above (Optional)

//https://editor.p5js.org/benjamin.bergery/sketches/LR8cNBO4x
//https://editor.p5js.org/benjamin.bergery/sketches/77QaYnsBE
// https://editor.p5js.org/benjamin.bergery/sketches/EWsyCHaVr
