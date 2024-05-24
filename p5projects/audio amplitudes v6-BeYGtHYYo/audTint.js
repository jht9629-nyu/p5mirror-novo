// let mic; // declared in mike.js
let audioLevel; // mic level amplified by micGain

// function preload() { 
  // mic = new p5.AudioIn(); //doesn't work in preload
  // preload only used with load functions like
  // loadImage(), loadSound(), loadJSON() ?
// }

function setup_audTint() {
  // createCanvas(400, 300);

  webCam = createCapture(VIDEO);
  webCam.size(400, 300);
  webCam.hide();

  // create an audio input
  // mic = new p5.AudioIn();

  // start the Audio Input.  
  // mic.start();
  // callingMicStart(); // mic is working with mike.js

  createSliders();
}

function draw_audTint() {
  let micGain = slide1.value();

  // mic level (between 0 and 1.0)
  audioLevel = mic.getLevel() * (1500 * micGain);
  //console.log(mic.getLevel());

  image(webCam, width/2, height/2, width/2, height/2);
tint(audioLevel, 222, 255,255);
 //tint(audioLevel, 222, 255, audioLevel);

  let val2 = slide2.value;
  let val3 = slide3.value;

  fill(127, 50); //
  strokeWeight(4);
  stroke(122);

  ellipse(
    (width * 3/ 4),
    (height * 3/4), // roughly mouth position
    audioLevel,
    audioLevel
  );

}

function callingMicStart() {
    mic.start();
}

function createSliders() {
  createP();
  createSpan("Video Circle Gain ");
  slide1 = createSlider(0, 20, 8, 1);
  createP();
  createSpan("slider 2 ");
  slide2 = createSlider(0, 255, 20);
  createP();
  createSpan("slider 3 ");
  slide3 = createSlider(0, 255, 128);
  createP();
}


