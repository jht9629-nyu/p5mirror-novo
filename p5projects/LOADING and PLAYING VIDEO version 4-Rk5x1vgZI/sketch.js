// LOADING and PLAYING VIDEO version 4
// https://editor.p5js.org/novo/sketches/Rk5x1vgZI

/*** NOTES about video options ***/
    // the name of the video variable is arbitrary
    // videoVariable.play(); plays video
    // videoVariable.loop(); plays and loops
    // videoVariable.pause(); pauses
    // videoVariable.hide(); hides
    // videoVariable.stop(); stops and returns video to start
    // (videoIsPlaying) evaluates to true or false
    // videoVariable.size(width,height); 
        // changes dimensions of area video will play in
        // does not change aspect ratio of video

    

/*** GLOBAL VARIABLES ***/

let theVideo;
let theButton;
// playingBoolean set to false at start
// so video will be paused by PausePlay function below
let playingBoolean = false;
 

/*** SETUP function ***/

function setup() {
  
  // the blue CANVAS is separate from the VIDEO area
  createCanvas(100,100);
  background(0,128,255);
  
  // the video is displayed below the canvas

  theVideo = createVideo(['walk3.mp4']);
    theVideo.size(250,150);
  // createVideo expects an array
  // which can be used for different versions
  // compatible with different browsers or bandwidths
  
  theButton = createButton('play/pause');
  
  // when button pressed call PausePlay function
  theButton.mousePressed(PausePlay);
}

/*** THERE IS NO DRAW FUNCTION in this sketch ***/
// so video will play forever even if you change the code


/*** EXTERNAL FUNCTION ***/

function PausePlay() {
  
  // if playing is true
  if (playingBoolean) {
    // make the video pause
    theVideo.pause()
    playingBoolean = false;
  }
 
  // else make video loop  
  else {
    theVideo.loop();
    playingBoolean = true;
  }

} // end PausePlay function
