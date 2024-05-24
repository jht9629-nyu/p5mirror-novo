// LOADING and PLAYING 2 videos by newbenjaminb
// https://editor.p5js.org/novo/sketches/PhgXGHfJO

/*** GLOBAL VARIABLES ***/
let theVideo1, theVideo2;
let theButton;
// playingBoolean set to false at start
// so video will be paused by PausePlay function below
let playingBoolean = false;

/*** SETUP function ***/

function setup() {
  // the blue CANVAS above is separate from the html VIDEO area
  createCanvas(550, 200);
  background(0, 128, 255);
  textSize(16);
  text(
    "2. the image() method draws copies of the videos in the p5js canvas",
    30,
    20
  );
  createP(); // add html paragraph to add space below canvas

  // the video is displayed below the p5js canvas

  createP(
    " 1. the createVideo() method creates html video objects outside the blue p5js canvas: "
  );

  theVideo = createVideo(["walk2.mp4"]);
  theVideo2 = createVideo(["sloquai.mp4"]);
  // createVideo can accomodate an array of videos
  // which can be used for different versions
  // compatible with different browsers or bandwidths

  // add paragraph to place button below
  createP("this button loops the videos");
  theButton = createButton("play/pause");

  // when button is clicked call PausePlay function
  theButton.mousePressed(PausePlay);
}

function draw() {
  theVideo.size(125, 75);
  theVideo2.size(125, 75);

  // using image method twice to show the full-size videos
  // in the p5js canvas
  image(theVideo, 25, 35, 250, 150);

  tint(0, 25); // change video alpha 
  image(theVideo2, 125, 35, 250, 150);
}

/*** EXTERNAL FUNCTION ***/

function PausePlay() {
  // if playing is true
  if (playingBoolean) {
    // make the video pause
    theVideo.pause();
    theVideo2.pause();

    // and set playing to false
    playingBoolean = false;
  }

  // else make video loop
  else {
    theVideo.loop();
    theVideo2.loop();
    playingBoolean = true;
  }
}
// end PausePlay function

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

////////// reference for the image() method /////////////

// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])

// image(img, dx, dy, dWidth, dHeight);
// Parameters
// img p5.Image|p5.Element|p5.Texture: the image to display
// x Number: the x-coordinate of the top-left corner of the image
// y Number: the y-coordinate of the top-left corner of the image
// width Number: the width to draw the image (Optional)
// height Number: the height to draw the image (Optional)
// dx Number: the x-coordinate of the destination rectangle in which to draw the source image
// dy Number: the y-coordinate of the destination rectangle in which to draw the source image
// dWidth Number: the width of the destination rectangle
// dHeight Number: the height of the destination rectangle
// sx Number: the x-coordinate of the subsection of the source image to draw into the destination rectangle
// sy Number: the y-coordinate of the subsection of the source image to draw into the destination rectangle
// sWidth Number: the width of the subsection of the source image to draw into the destination rectangle (Optional)
// sHeight Number: the height of the subsection of the source image to draw into the destination rectangle (Optional)
// fit Constant: either CONTAIN or COVER (Optional)
// xAlign Constant: either LEFT, RIGHT or CENTER default is CENTER (Optional)
// yAlign Constant: either TOP, BOTTOM or CENTER default is CENTER (Optional)
