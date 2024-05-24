//AM v6
//https://editor.p5js.org/novo/sketches/v3u78qHde
//Playback of 2 voices 
//with Amplitude modulation of ellipse colors

/** TO DO */
// - create ampMap function for transformation modularity

// - display slider values
// - save values in JSON files
// - 2 pull-down menus on right for voice1 & voice2 selections
// - experiment with same text with 2 different voices  
// - create graphicEqualizer function with sliders 
// - make (inner?) ellipses horizontal to suggest mouths
// - create waveform for voice
// - add sine wave oscillator to modulate ?
// - a voice modulated by a sawtooth signal as test signal
// - still image for each voice
// - video image for each voice
// - apply RC program
// - TEST VOICE
// create a 10 second cycle sawtooth
// modulate a 400 Hz sine wave with the sawtooth
// use that as test voice

/** GLOBAL VARIABLES */
let voice1, voice2;
let amp1, amp2;
let button1, button2;
let volSlider1, rateSlider1, panSlider1,smooSlider1;
let volSlider2, rateSlider2, panSlider2, smooSlider2;
// smooSlider = "smoothing" slider
let guiLeftMargin = 20;  // slider label H margin
let xMargin = 60; // slider H margin
let yTop; // GUI V margin
let yLine = 35; // slider V spacing
// the videos
let thevid1, thevid2; 
let vidButton;
let vidPlaying = true;
//Rtint stuff
let rTintCheckbox1;
//   rTintCheckbox1 = createCheckbox('Rtint?', false);
//   rTintCheckbox1.changed(rTintCheckEvent);


/** END GLOBAL VARIABLES */

function preload() {

//Adding Video in preload
  thevid1 = createVideo(["bassets/walkuptostudiob.mp4"]);
  thevid2 = createVideo(["bassets/gaitb54.mp4"]);
}


/** SETUP FUNCTION */
function setup() {
  // createCanvas(400, 225);
  createCanvas(800, 225);

  createP();
  createSpan(" ");
  yTop = height + 60;
  button1 = createButton("PAUSE");
  button2 = createButton("PAUSE");
  button2.position(width/4, height + 24 );
  
  
  createP();
  button1.mousePressed(togglePlaying1);
  button2.mousePressed(togglePlaying2);
  createSliders();

  // callback returns a "loaded" function
  voice1 = loadSound("sounds/Parfum.mp3", loaded1);
  voice2 = loadSound("sounds/Let-us-go-v.mp3", loaded2);
  
  amp1 = new p5.Amplitude();
  amp1.setInput(voice1);
  
  amp2 = new p5.Amplitude();
  amp2.setInput(voice2);

  //Adding Video moved to preload
  // thevid1 = createVideo(["bassets/walkuptostudiob.mp4"]);
  // thevid2 = createVideo(["bassets/floatersb.mp4"]);

   // thevid1.hide();
   // thevid2.hide();
   vidButton = createButton("toggle video ");
  //  vidButton = createButton("play video");
   vidButton.mousePressed(toggleVid);
   vidButton.position(width/2, height + 24 );
   // attach button listener

  rTintCheckbox1 = createCheckbox('Rtint1?', false);
  rTintCheckbox1.changed(rTintCheckEvent);
  rTintCheckbox1.position(400,height+60); 

}
/** END SETUP FUNCTION */

/** DRAW FUNCTION */
function draw() {

    background(222);

    // LEFT AMPLITUDE
    let vo1 = volSlider1.value();
    voice1.setVolume(vo1);
    let ra1 = rateSlider1.value();
    voice1.rate(ra1);
    let pa1 = panSlider1.value();
    voice1.pan(pa1);
    let sm1 = smooSlider1.value();
    let sm2 = smooSlider2.value();

    amp1.smooth(sm1);
    let level1 = amp1.getLevel() * 20;
    // console.log("level1 = " + level1);
    let lowMod1 = level1 * 100;
    let highMod1 = level1 * 800;

  // RIGHT AMPLITUDE
    let vo2 = volSlider2.value();
    voice2.setVolume(vo2);
    let ra2 = rateSlider2.value();
    voice2.rate(ra2);
    let pa2 = panSlider2.value();
    voice2.pan(pa2);
  
    amp2.smooth(sm2);
    let level2 = amp2.getLevel() * 20;
    // console.log("level2 = " + level2);
    let lowMod2 = level2 * 100;
    let highMod2 = level2 * 800;
    
  // LEFT ELLIPSE MOUTHS MODULATION
  noStroke();
  fill(255 - highMod1/2, 0, 255 - highMod1, 220);
  // lips are a circles
  ellipse(100, height / 2, width/4 - 20 , width/4);
  // ellipse(width / 4, height / 2, width/4, height - 20);

  fill(highMod1, 0, lowMod1, 220);
  // mouths are ellipses
  ellipse(100, height / 2, width / 5, height / 2);
  // ellipse(width / 4, height / 2, width / 5, height / 2);

  // RIGHT ELLIPSE MOUTHS MODULATION
  noStroke();
  // ellipse(x, y, w, [h])
  fill(0, 255 - highMod2, 255 - highMod2, 220);
  ellipse(300, height / 2, width/4 - 20, height - 20);
  fill(highMod2, 0, lowMod2, 220);
  ellipse(300, height / 2, width / 5, height / 2);
  fill(255,0,0);
  rect(width/2,0,width/2,height);

  //HTML VIDEO SIZE & VISIBILITY
  thevid1.size(300, 200);
  thevid1.hide();
  // thevid1.position(width/2,0)
  thevid2.size(300, 200);
  thevid2.hide();
  // thevid2.position(width/4,0)

  //VIDEO TINT & ALPHA
// Question is what should modulate:
// we should distinguish betwixt
// VOLUME and GAIN
// let vo1 = volSlider1.value();
// OR level1 = amp1.getLevel() * 20; ?
// level1 = amp1.getLevel() * GAIN ;

// then define a GRID with check boxes
// and/or sliders to experiment with
// applying it to R G B and Alpha levels
// separately to each separate image
// with another version
// combining both images in one composite

// createCheckbox()
// let checkbox;

// function setup() {
//   rTintCheckbox1 = createCheckbox('Rtint?', false);
//   rTintCheckbox1.changed(rTintCheckEvent);
// }

  //SHOW VIDEO ON CANVAS 
  tint(153,0,0);
  image(thevid1, width/2, 0);
  tint(0,0,153);
  image(thevid2, 3 * width/4,0);

}
/** END DRAW FUNCTION */

function rTintCheckEvent() {
  if (rTintCheckbox1.checked()) {
    // console.log('rTintChecked!');
    tint(128, 0, 0);
  } else {
    // console.log('rTintUnchecked!');
  }
}

/** LOADED FUNCTIONS */
// using callback, 
// external "loaded" functions
// wait before playing or looping voice

function loaded1() {
  voice1.play();
  // voice1.loop();
}

function loaded2() {
  voice2.play();
  // voice2.loop();
}
/** END LOADED FUNCTIONS */


/** TOGGLE FUNCTIONS */
function togglePlaying1() {
  if (!voice1.isPlaying()) {
    voice1.loop();
    button1.html("voice1 PLAYING");
  } else {
    voice1.pause();
    button1.html("voice1 PAUSED");
  }
}

function togglePlaying2() {
  if (!voice2.isPlaying()) {
    voice2.loop();
    button2.html("voice2 PLAYING");
  } else {
    voice2.pause();
    button2.html("voice2 PAUSED");
  }
}

// loops or pauses video depending on current state
function toggleVid() {
  if (vidPlaying) {
    thevid1.pause();
    thevid2.pause();
    // button.html("play vid");
  } else {
    thevid1.loop();
    thevid2.loop();
    // button.html("pause vid");
  }
  vidPlaying = !vidPlaying;
}
/** END TOGGLE FUNCTIONS */

// function tintR?() {
//   if (checkbox.checked()) {
//     console.log('Checking!');
//   } else {
//     console.log('Unchecking!');
//   }

/** SLIDERS FUNCTION */
function createSliders() {
  //let xMargin, yTop, yLine;

  createP();
  createSpan("volume ");
  volSlider1 = createSlider(0, 1, 0.75, 0.01);
  volSlider1.position(xMargin, yTop);
  volSlider1.style("width", "100px");

  volSlider2 = createSlider(0, 1, 0.75, 0.01);
  volSlider2.position(width/4, yTop);
  volSlider2.style("width", "100px");

  createP();
  createSpan("speed ");
  rateSlider1 = createSlider(0, 2, 1, 0.01);
  rateSlider1.position(xMargin, yTop + yLine);
  rateSlider1.style("width", "100px");

  rateSlider2 = createSlider(0, 2, 1, 0.01);
  rateSlider2.position(width/4, yTop + yLine);
  rateSlider2.style("width", "100px");

  createP();
  createSpan("pan ");
  panSlider1 = createSlider(-1, 1, -1, 0.01);
  // createSlider(min, max, [value], [step])
  panSlider1.position(xMargin, yTop + yLine * 2);
  panSlider1.style("width", "100px");

  panSlider2 = createSlider(-1, 1, 1, 0.01);
  panSlider2.position(width/4, yTop + yLine * 2);
  panSlider2.style("width", "100px");

  createP();
  createSpan("smooth ");
  smooSlider1 = createSlider(0, .999, .5, 0.01);
  // createSlider(min, max, [value], [step])
  smooSlider1.position(xMargin, yTop + yLine * 3);
  smooSlider1.style("width", "100px");

  smooSlider2 = createSlider(0, .999, .5, 0.01);
  smooSlider2.position(width/4, yTop + yLine * 3);
  smooSlider2.style("width", "100px");
  //smoothing Number: between 0.0 and .999 
  //to smooth amplitude readings (defaults to 0) 

}
/** END SLIDERS FUNCTION */


/** NOTES */

//https://editor.p5js.org/benjamin.bergery/sketches/dHeNZ2q0-

// amplitude = new p5.Amplitude([smoothing])
//Amplitude measures volume between 0.0 and 1.0.

// optional smoothing Number: between 0.0 and .999 
//to smooth amplitude readings (defaults to 0) defaults to 0.

//getLevel() Returns a single Amplitude reading at the moment it is called. 
//For continuous readings, run in the draw loop.

// Question: p5.Amplitude does not work in draw function ?

//If a preload function is defined, 
//setup() will wait until 
//any load calls within have finished. 
//Nothing besides load calls 
//(loadImage, loadJSON, loadFont, loadStrings, etc.) 
//should be inside the preload function

//https://editor.p5js.org/benjamin.bergery/sketches/gAsYMIAJh
// using amp.getLevel()
//https://editor.p5js.org/benjamin.bergery/sketches/Ky8-K_K_G
