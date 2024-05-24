// https://editor.p5js.org/benjamin.bergery/sketches/QStPXqgSz


///////// GLOBAL VARIABLES ///////////////////
var inc = 0.03; 
//the smaller the difference between coordinates, the smoother the resulting noise sequence will be. Steps of 0.005-0.03 work best for most applications

var scl = 9; 

// 48 creates possible shadow starting place
// 9 creates viscous mesh

// divide width and height by scl to define number of rows and columns
var cols, rows;
var fr; // frame rate
var zoff = 0;

/////////////////////////////////
function setup() {
  
  createCanvas(480, 480);
  frameRate(60);
  
  cols = floor(width / scl);
  rows = floor(height / scl);
    // floor(n) returns closest integer less than or equal to the value of the parameter
  
  fr = createP(""); 
// bottom paragraph for frame rate display

}

/////////////////////////////////////////////
function draw() {
  
  background(255);
  
  var yoff = 0;

  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    
    for (var x = 0; x < cols; x++) {
      var index = (x + y * width) * 4;
      var angle = noise(xoff, yoff, zoff) 
      * TWO_PI * 4 ;
      xoff += inc;
      // the noise function works in an infinite space, so the value of the coordinates doesn't matter, only the distance between successive coordinates does (eg. when using noise() within a loop). The smaller the difference between coordinates, the smoother the resulting noise sequence. Steps of 0.005-0.03 work best
      
      var v = p5.Vector.fromAngle(angle);
  // fromAngle(angle) 
  // makes a new 2D vector from an angle 
  // returns a new p5.Vector object
      
      noStroke(0);
      
    push();
      // push and pop
      // resets translation and rotation
      // for each ellipse
      translate(x * scl, y * scl);
      rotate(v.heading());
      // heading() returns angle of rotation
      
      // insert pixels
      
      fill(0, 0, 255, 100);
      
      ellipse(scl,scl,60,3);
      // in 48 scl version narrow ellipse
      // creates "toothpick" line segments
      
    pop();
      
    }
    yoff += inc // 
    zoff += 0.00008; //rotation

  }
  fr.html(floor(frameRate())); 
  //display frame rate
}

// this is a mash up of perlin noise by Qiumeng Fu 
// https://editor.p5js.org/fuqiumeng/sketches/pJxXT7h4w

