// perlin noise via fuqiumeng v7
// https://editor.p5js.org/novo/sketches/Gm0TQgpz7


///////// GLOBAL VARIABLES ///////////////////
let increment = 0.001; 
//the smaller the difference between coordinates, the smoother the resulting noise sequence will be. Steps of 0.005-0.03 work best for most applications

let scaly = 48; 

// 48 creates possible shadow starting place
// 9 creates viscous mesh

// divide width and height by scaly to define number of rows and columns
let cols, rows;
let fr; // frame rate
let zoff = 0;

/////////////////////////////////
function setup() {
  
  make3sliders();
  
  createCanvas(480, 480);
  frameRate(60);
  
  cols = floor(width / scaly);
  rows = floor(height / scaly);
    // floor(n) returns closest integer less than or equal to the value of the parameter
  
  fr = createP(""); 
// bottom paragraph for frame rate display
  

}

/////////////////////////////////////////////
function draw() {
  
  background(242);
  
  let yoff = 0;

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    
    for (let x = 0; x < cols; x++) {
      let index = (x + y * width) * 4;
      let angle = noise(xoff, yoff, zoff) 
      * TWO_PI * 4 ;
    console.log(angle);
      xoff += slide1 ;
      // the noise function works in an infinite space, so the value of the coordinates doesn't matter, only the distance between successive coordinates does (eg. when using noise() within a loop). The smaller the difference between coordinates, the smoother the resulting noise sequence. Steps of 0.005-0.03 work best
      
      let v = p5.Vector.fromAngle(angle);
  // fromAngle(angle) 
  // makes a new 2D vector from an angle 
  // returns a new p5.Vector object
      
      noStroke(0);
      
    push();
      // push and pop
      // resets translation and rotation
      // for each ellipse
      translate(x * scaly, y * scaly);
      rotate(v.heading());
      // heading() returns angle of rotation
      
      // insert pixels
      
      fill(0, 0, 255, 100);
      
      ellipse(scaly,scaly,60,3);
      // in 48 scaly version narrow ellipse
      // creates "toothpick" line segments
      
    pop();
      
    }
    yoff += increment // 
    zoff += 0.00008; //rotation

  }
  fr.html(floor(frameRate())); 
  //display frame rate
}

////// external functions //////
function make3sliders() {
  createP("");
  createSpan(" x increment ");
  slide1 = createSlider(1, 5, 3);
  createP("");
  createSpan(" B ");
  slide2 = createSlider(0, 255, 100);
  createP("");
  createSpan(" scale ");
  slide3 = createSlider(1, 480, 48);
}


// this is a mash up of perlin noise by Qiumeng Fu 
//https://editor.p5js.org/fuqiumeng/sketches/pJxXT7h4w

