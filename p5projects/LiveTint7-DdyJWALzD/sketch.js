// LiveTint7 --
// https://editor.p5js.org/novo/sketches/DdyJWALzD

// ISSUE
// mic input works intermittently
// with visual studio code's live web server
// resulting in: no images & audioLevel=0
// or: frozen canvas image & audioLevel=0
// you can get this state by reloading the chrome page
// SOLUTIONS DISCUSSED
// 1. declaring mic as global variable, doesn't fix
// 2. preload function with p5.AudioIn() ==> mic undefined
// 3. run mic.start in first frame of draw program, feels wrong 
// 4. mysterious Promise code with callback?

// TO DO
// draw text with gain level
// add image to modulate
// single video/voice playback version 
// record audio levels in array
// echo mode with array playback
// identify and isolate words with pauses
// identify and isolate stressed words with level
// dual playback videos/voices
// dual live videos/voices
// FFT graphic equalizer
// FFT modulate via frequencies
// voice recognition

let mic;
let audioLevel; // mic level amplified by micGain

function preload() { 
  // mic = new p5.AudioIn(); //doesn't work in preload
  // preload only used with load functions like
  // loadImage(), loadSound(), loadJSON() ?
}

function setup() {
  createCanvas(400, 300);

  webCam = createCapture(VIDEO);
  webCam.size(400, 300);
  webCam.hide();

  // create an audio input
  mic = new p5.AudioIn();

  // start the Audio Input.  
  // mic.start();
  callingMicStart();

  createSliders();
}

function draw() {
  let micGain = slide1.value();

  // mic level (between 0 and 1.0)
  audioLevel = mic.getLevel() * (1500 * micGain);
  // console.log(audioLevel);

  image(webCam, 0, 0, width, height);
  tint(audioLevel, 222, 255, audioLevel);

  let val2 = slide2.value;
  let val3 = slide3.value;

  fill(127, 50); //
  strokeWeight(4);
  stroke(122);

  ellipse(
    width / 2,
    (height / 3) * 2, // roughly mouth position
    audioLevel,
    audioLevel
  );

  //filter(THRESHOLD,0.3);
}

function callingMicStart() {
    mic.start();
}

function createSliders() {
  createP();
  createSpan("Mike Gain ");
  slide1 = createSlider(0, 20, 8, 1);
  createP();
  createSpan("slider 2 ");
  slide2 = createSlider(0, 255, 20);
  createP();
  createSpan("slider 3 ");
  slide3 = createSlider(0, 255, 128);
  createP();
}


// NOTES
//
// failed attempt at callback with p5.AudioIn() :
//
// function createMic() {
//   mic = new p5.AudioIn();
// }
