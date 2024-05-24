// videoTint4
//https://editor.p5js.org/novo/sketches/ydoh94ykC
// as with videoTint2 
// mic input works intermittently 
// with visual studio code 
// resulting in: no images & micVol=0
// or frozen canvas image & micVol=0
// you can get this state by reloading the chrome page

// TO DO 
// define a reset function to solve intermittent VScode issue ?
// Gain and Volume sliders
// with text levels
// playback option in addition to live

let micVol;

function setup() {
  createCanvas(400, 300);
  
  capture = createCapture(VIDEO);
  capture.size(400, 300);
  capture.hide(); 

  // Create an audio input
  mic = new p5.AudioIn();
  // start the Audio Input.
  // mic.stop(); // trying to reset mic because it is intermittent
  // but this does not help
   mic.start();
  
  createRGBsliders();
}

function draw() {
  
  // Get the overall volume (between 0 and 1.0)
    micVol = mic.getLevel()*10000;
    // console.log(micVol);

    image(capture, 0, 0, width, height);
    tint(micVol,222,255,micVol);
    // tint(micVol,128,255,micVol);
    // tint(micVol,53,255,micVol+10);

    fill(127,50);
    stroke(10);
  
    ellipse(width/2,height/3*2,
            micVol,micVol);
  
}
    
  // tintWithRGBsliders();
  
//   let rval = micVol*10;
//  // let rval = rslide.value();
//   let bval = bslide.value();
//   let gval = gslide.value();
//   tint(rval, bval, gval);
  // filter(THRESHOLD,0.2);


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