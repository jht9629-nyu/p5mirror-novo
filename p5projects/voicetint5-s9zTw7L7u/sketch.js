// videoTint5 -- with Mike Gain slider
// as with previous videoTint versions
// mic input works intermittently 
// with visual studio code's live web server
// resulting in: no images & micAmp=0
// or frozen canvas image & micAmp=0
// you can get this state by reloading the chrome page

// TO DO 
// define a reset function to solve intermittent VS code issue ?
// text with gain level
// playback option in addition to live
// voice recognition
// FFT option to modulate via low medium high frequencies


let micAmp; 
// mic level amplified by micGain

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
  
  createSliders();
}

function draw() {
  
  let micGain = slide1.value();
  
  // mic level (between 0 and 1.0)
    micAmp = mic.getLevel()*(1500*micGain);
    console.log(micAmp);

    image(capture, 0, 0, width, height);
    tint(micAmp,222,255,micAmp);
    // tint(micAmp,128,255,micAmp);
    // tint(micAmp,53,255,micAmp+10);

    fill(127,50);
    stroke(10);
  
    ellipse(width/2,height/3*2,
            micAmp,micAmp);
  
}
    
  // tintWithRslide32rs();
  
//   let rval = micAmp*10;
//  // let rval = slide1.value();
//   let bval = slide2.value();
//   let gval = slide3.value();
//   tint(rval, bval, gval);
  // filter(THRESHOLD,0.2);


function createSliders() {
  createP();
  createSpan("Mike Gain ");
  slide1 = createSlider(0, 20, 8,1);
  createP(); 
  createSpan("slider 2 ");
  slide2 = createSlider(0, 255, 128);
  createP();
  createSpan("slider 3 ");
  slide3 = createSlider(0, 255, 128);
  createP();
   }

//https://editor.p5js.org/novo/sketches/ydoh94ykC
