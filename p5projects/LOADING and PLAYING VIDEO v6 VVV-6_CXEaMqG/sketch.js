// LOADING and PLAYING VIDEO v6 vvv
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

    // theVideo.size(width,height); 
      // changes dimensions of area video will play in
      // but will not change aspect ratio of video
    // theVideo.position(x,y) places top left corner of video
      // video is placed below Canvas by default

    

/*** GLOBAL VARIABLES ***/

let theVideo;
let theButton;
// playingBoolean set to false at start
// so video will be paused by PausePlay function below
let playingBoolean = false;
 

/*** SETUP function ***/

function setup() {
  
  // the blue CANVAS above is separate from the VIDEO area
  createCanvas(160,90);
  background(0,128,255);
  textSize(36); text('CANVAS', 5, height/2+18);
  createP(); // add html paragraph to add space below canvas
  
  // the video is displayed below the canvas

  theVideo = createVideo(['walk3.mp4']);
  theVideo.size(250,150);
  // createVideo can accomodate an array of videos
  // which can be used for different versions
  // compatible with different browsers or bandwidths
  
  createP(); // add paragraph to place button below
  theButton = createButton('play/pause');
  
  // when button is clicked call PausePlay function
  theButton.mousePressed(PausePlay);
  
}


//////////////////////////////////////////////////
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
