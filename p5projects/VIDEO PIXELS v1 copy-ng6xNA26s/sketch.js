// LOADING and PLAYING VIDEO v5
// https://editor.p5js.org/novo/sketches/Rk5x1vgZI


/*** GLOBAL VARIABLES ***/

let theVideo;
let theButton;
// playingBoolean set to false at start
// so video will be paused by PausePlay function below
let playingBoolean = false;

let vScale = 15;
let brightnessFactor = 2;
 

/*** SETUP function ***/

function setup() {
  
  // the blue CANVAS is separate from the VIDEO area
  createCanvas(640,480);
  pixelDensity(1);
  
  setupVidscaleSlider();
  setupBrightSlider();
  
  createP(); // add html paragraph to add space below
  
  // the video is displayed below the canvas

  theVideo = createVideo(['walk3.mp4']);
  theVideo.size(250,150);
  // createVideo expects an array
  // which can be used for different versions
  // compatible with different browsers or bandwidths
  
  createP(); // add paragraph to place button below
  theButton = createButton('play/pause');
  
  // when button is clicked call PausePlay function
  theButton.mousePressed(PausePlay);
}

/*** DRAW FUNCTION ***/

function draw ();
  background(0);


/*** end DRAW FUNCTION ***/


/*** EXTERNAL FUNCTIONS ***/

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


function PausePlay() {
  
  // if playing is true
  if (playingBoolean) {
    
    // make the video pause
    theVideo.pause()
    
    // and set playing to false
    playingBoolean = false;
  }
 
  // else make video loop  
  else {
    theVideo.loop();
    playingBoolean = true;
  }

} // end PausePlay function
