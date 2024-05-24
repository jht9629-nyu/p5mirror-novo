// W5.3b Zoog talks with motor mouth slider
// https://editor.p5js.org/novo/sketches/iD6o5eEcu
// https://editor.p5js.org/benjamin.bergery/sketches/vEbxaE42s

let slidval;
// must be global as it is in 2 external functions ()

function setup() {
  DrawZoog();
  // meta function
  // containing 9 functions
  SliderBelowCanvas();
}

function draw() {
  BadCartoonTalkingMouth();
  sliderSetfps();
  DisplayFPS();
}

/* 4 external functions added */

function BadCartoonTalkingMouth() {
  noStroke();
  fill(127, 0, 127); //purple
  ellipse(200, 220, 50, 40);
  fill(0, 0, 0); 
  ellipse(200, 220, random(10, 50), random(5, 40)); 
}

function SliderBelowCanvas() {
  slider = createSlider(1, 60, 9);
  //min,max,default,steps
  slider.position(10, 410);
  slider.style("width", "150px");
}

function sliderSetfps() {
  slidval = slider.value();
  frameRate(slidval);
}

function DisplayFPS() {
  textSize(29);
  fill(200);
  text("1 fps 60", 7, 390);
  fill(120);
  rect(20, 255, 100, 100);
  fill(200);
  textSize(80); //current fps
  text(slidval, 20, 350);
}

function DrawZoog() { //meta function
  createDrawingCanvas();
  dark_gray_background();
  addPurpleFace();
  addGreenEyes();
  addBlackPupils();
  addOrangeEyebrows();
  addAntenna();
  // add_pink_mouth();
  addBlackArms();
  yellowBody();
}

// function runAtsevenFps() {
//   frameRate(7);
// }

// CODE COMMENT
// to get the mouth redrawing on each frame,
//lines 26-27 redraw the mouth area in purple to erase previous mouth
// lines 28-29 draw a black mouth ellipse with random width and height
// line 31 runs the program at 9fps default to avoid flickering mouth

// QUESTION: Does it matter if runAtsevenFps is in draw or setup?

function add_pink_mouth() {
  noStroke();
  fill(255, 0, 127);
  ellipse(200, 250, 50, 20);
}

function createDrawingCanvas() {
  createCanvas(400, 400);
}

function dark_gray_background() {
  background(120);
}

function addPurpleFace() {
  fill(127, 0, 127);
  ellipse(200, 200, 150, 200);
}

function addGreenEyes() {
  fill(0, 200, 127);
  ellipse(150, 150, 70, 40);
  ellipse(250, 150, 40, 60);
}

function addBlackPupils() {
  fill(0);
  ellipse(170, 150, 5, 5);
  ellipse(270, 150, 10, 10);
}

function addOrangeEyebrows() {
  stroke(255, 100, 100);
  strokeWeight(15);
  line(130, 110, 170, 120);
  line(230, 105, 270, 100);
}

function addAntenna() {
  stroke(255);
  strokeWeight(5);
  line(200, 125, 200, 50);
  noFill();
  ellipse(200, 40, 20, 20);
}

function add_pink_mouth() {
  noStroke();
  fill(255, 0, 127);
  ellipse(200, 250, 50, 20);
}

function addBlackArms() {
  stroke(0);
  strokeWeight(30);
  line(150, 350, 300, 300);
}

function yellowBody() {
  // No stroke
  noStroke();
  fill(255, 255, 0);
  rect(150, 275, 100, 200);
}

// NOTES
// Would indeed be great if more code could be understood without comments
// simply by naming external functions

// QUESTION: Can you do this to all code?
// QUESTION: If not, when can't you?

// Original Zoog by Mimi Yin at https://editor.p5js.org/mimiyin/sketches/SiMFwzSGS

//3. re-write 1 of your re-factored Zoog functions
//so that you can call the same function twice, and have it draw slighly different versions of the same thing.
