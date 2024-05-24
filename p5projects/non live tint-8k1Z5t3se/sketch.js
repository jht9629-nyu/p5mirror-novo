// Non-LiveTint10 --


// ISSUE
// mic input works intermittently
// with visual studio code's live web server
// resulting in: no images & audioLevel=0
// or: frozen canvas image & audioLevel=0
// you can get this state by reloading the chrome page
// SOLUTIONS DISCUSSED
// 3. run mic.start in first frame of draw program, feels wrong initially but is probably the best solution

// 1. declaring mic as global variable, doesn't fix
// 2. preload function with p5.AudioIn() ==> mic undefined
// 4. mysterious Promise code with callback?

// TO DO
// 1. single video/voice PLAYBACK version 
// 2. MULTIPLE playback voice version
// 3. add right-hand low-res ICON
// 4. MODULATE right-hand icon

// draw text with gain level
// add image to modulate
// record audio levels in array
// echo mode with array playback
// identify and isolate words with pauses
// identify and isolate stressed words with level
// dual playback videos/voices
// dual live videos/voices
// FFT graphic equalizer
// FFT modulate via frequencies
// voice recognition
/*****************************************************/


let mic;
let audioLevel; // mic level amplified by micGain
let audioLevel2 = 0 ;
let videoLevel = 1;
let timeConstant = .5; // jim s LC equivalent
let videoGain;
let balpha = 128;
let bstroke, bstrokeR, bstrokeG, bstrokeB;
let bfill;

function preload() { 
  // mic = new p5.AudioIn(); //doesn't work in preload
  // preload only used with load functions like
  // loadImage(), loadSound(), loadJSON() ?
}

function setup() {
  createCanvas(400, 300);

  // webCam = createCapture(VIDEO);
  // webCam.size(400, 300);
  // webCam.hide();

  // create an audio input
  mic = new p5.AudioIn();

  // start the Audio Input.  
  // mic.start();
  callingMicStart();

  createSliders();
}

function draw() {
  balpha = slide3.value();
  background(222,balpha);
  let micGain = slide1.value();
  // videoGain = slide3.value();

  // mic level (between 0 and 1.0)
  audioLevel = floor(mic.getLevel() * (1500 * micGain));
  // console.log( "micGain = " + micGain);
    // console.log( "audioLevel = " + audioLevel);
  //console.log(mic.getLevel());
  
  audioLevel2 = timeConstant * audioLevel2 + (1 - timeConstant) * audioLevel
  videoLevel = videoGain + audioLevel2;
  videoLevel = videoLevel > 255 ? 255 : videoLevel ;
    
  // image(webCam, 0, 0, width, height);

  // tint(videoLevel,videoLevel,videoLevel);
  
  // tint(audioLevel2, videoLevel, videoLevel,100 );
  
 //tint(audioLevel2, 255, 255, audioLevel);


timeConstant = slide2.value() / 100;
  // timeConstant = .99;
  let val3 = slide3.value;

 bfill = random(0,122);
   fill(bfill,0); // 
  console.log(floor(audioLevel2));
  strokeWeight(4);
  bstrokeR = random(100,255);
   bstrokeG = random(100,200);
   bstrokeB = random(100,200);
  
  stroke(bstrokeR,bstrokeG, bstrokeB);

  ellipse(
    width / 2,
    (height / 3) * 2, // roughly mouth position
    audioLevel2,
    audioLevel2
  );

  //filter(THRESHOLD,0.3);
}

function callingMicStart() {
    mic.start();
}

function createSliders() {
  createP();
  createSpan("Mike Gain ");
  slide1 = createSlider(0, 20, 3, 1);
  createP();
  createSpan("timeConstant ");
  slide2 = createSlider(0, 99, 1);
  createP();
  createSpan("balpha ");
  slide3 = createSlider(0, 255, 128);
  createP();
}


// NOTES
//
// https://editor.p5js.org/novo/sketches/DdyJWALzD
