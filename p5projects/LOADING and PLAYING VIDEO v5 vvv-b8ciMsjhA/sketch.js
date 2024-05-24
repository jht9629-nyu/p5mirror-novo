// LOADING and PLAYING VIDEO v5 vvv
// https://editor.p5js.org/novo/sketches/Rk5x1vgZI

/*** NOTES about video options ***/
    // video must be uploaded in parent directory      
    // where .js file is or subdirectory 
    // the name of the video variable is arbitrary,
    // here it is "theVideo"

    // theVideo.play(); plays video
    // theVideo.loop(); plays and loops
    // theVideo.pause(); pauses
    // theVideo.hide(); hides
    // theVideo.stop(); stops & goes to beginning

    // (videoIsPlaying) evaluates to true or false
    // theVideo.size(width,height); 
      // changes dimensions of area video will play in
      // but will not change aspect ratio of video

    

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

/*** THERE IS NO DRAW FUNCTION in this sketch ***/
// so once launched video and button 
// will be there forever 
// even if you change the code :)


/*** EXTERNAL FUNCTION ***/

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
