// timer- frameCount vs millis & fps v3 by novo
// 
//https://editor.p5js.org/novo/sketches/PEKqkSbwu

function setup() {
  createCanvas(600, 400);
  
}

function draw() {
  background(220);
  
  frames_seconds_fps =
    'frameCount is the running total number of frames drawn \nnote that the 60fps nominal rate varies \ndepending on other processes (e.g. console.log)\n\nmillis() is a method that returns the total milliseconds elapsed\nsince the setup() function is called' ;
  text(frames_seconds_fps, 20,40);
  
  write_Seconds();
  
  // console.log('console.log can slow down the frame rate\na little bit');

}

function write_Seconds() {
  
  let alignLeft1 = 20;
  let alignLeft2 = 240;
  let alignLeft3 = 375;
  let alignTop1 = 225;
  let vSpacing = 70;

  textSize(40);
  text(round(frameCount / 30), 
       alignLeft2, alignTop1);

  textSize(20);
  let textFC = "frameCount /60";
  text(textFC, alignLeft1, alignTop1);
  text("total estimated seconds\nassuming 60fps", 
       alignLeft3, alignTop1);

  textSize(20);
  text("round((millis()/1000),1)", 
       alignLeft1, alignTop1 + vSpacing);
  textSize(40);
  // let textMillis = round(millis() / 1000, 1);
  let textMillis = round(millis() / 1000,1);
  
  text(textMillis, alignLeft2, alignTop1 + vSpacing);
  textSize(20);
  text("total actual seconds", 
       alignLeft3, alignTop1 + vSpacing);

  textSize(20);
  text("frames per second", alignLeft1, 
       alignTop1 + vSpacing * 2);
  textSize(40);
  let fps = round(frameCount / (millis() / 1000), 1);
  text(fps, alignLeft2, 
       alignTop1 + vSpacing * 2);
  textSize(20);
  text("actual average fps", alignLeft3, 
       alignTop1 + (vSpacing * 2) );

}

// using backslash n to put lines in text

// https://editor.p5js.org/novo/sketches/1dWMS1-hu

// frameRate() seems wonky in console

