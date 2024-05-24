// https://editor.p5js.org/benjamin.bergery/sketches/QStPXqgSz

///////// GLOBAL VARIABLES ///////////////////
let inc = 0.01;
//the smaller the difference between coordinates, the smoother the resulting noise sequence will be. Steps of 0.005-0.03 work best for most applications

let scl = 96;

// 48 creates possible shadow starting place
// 9 creates viscous mesh

// divide width and height by scl to define number of rows and columns
let cols, rows;
let fr; // frame rate
let zoff = 0; // rotation zeroed at start

/////////////////////////////////
function setup() {
  make3sliders();

  createCanvas(480, 480);
  frameRate(60);

  // cols = floor(width / scl);
  // rows = floor(height / scl);
  // // floor(n) returns closest integer less than or equal to the value of the parameter

  fr = createP("");
  // bottom paragraph for frame rate display

  //createSpan(" scl = " + scl + " -- inc = " + inc);
}

/////////////////////////////////////////////
function draw() {
  background(255);

  let yoff = 0;
  
  scl = slide3.value();
    
  cols = floor(width / scl);
  rows = floor(height / scl);
  // floor(n) returns closest integer less than or equal to the value of the parameter

  for (let y = 0; y < rows; y++) {
    let xoff = 0;

    for (let x = 0; x < cols; x++) {
      let index = (x + y * width) * 4;
      // let angle = noise(xoff, yoff, zoff)
      // * TWO_PI * 4 ;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;

      textSize(32);
      let noisenum = round(noise(xoff, yoff, zoff) * 100);
      text("noise(xoff,yoff,zoff) = ." + noisenum, 10, 30);
      let anglenum = round(angle);
      text("angle = " + anglenum, 10, 60);

     // console.log("noise(xoff, yoff, zoff)= " + noise(xoff, yoff, zoff));
      // console.log("angle= " + round(angle));
      xoff += inc;
 
      // the noise function works in an infinite space, so the value of the coordinates doesn't matter, only the distance between successive coordinates does (eg. when using noise() within a loop). The smaller the difference between coordinates, the smoother the resulting noise sequence. Steps of 0.005-0.03 work best
      //console.log("xoff= "+ xoff);

      let v = p5.Vector.fromAngle(angle);
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
      vnum = round(v.heading()*100);
      vnumfull = v.heading();
      
      textSize(12);
      text("v.heading = " + vnum, 10, 30);
      // heading() returns angle of rotation

      // insert pixels

      fill(0, 0, 255, 100);

      ellipse(scl,scl, 100,3);
      // ellipse(scl, scl, 30, 3);
      // in 48 scl version narrow ellipse
      // creates "toothpick" line segments

      pop();
    }
    yoff += inc; //
    zoff += 8/100000;
    // zoff += 0.00008; //rotation
  }
  
  text("scale = " + scl, 10, height -20);

  fr.html(floor(frameRate()));
  //display frame rate
}

////// external functions //////
function make3sliders() {
  // createP("");
  // createSpan(" x increment ");
  // slide1 = createSlider(1, 5, 3);
  // createP("");
  // createSpan(" y increment ");
  // slide2 = createSlider(0, 255, 100);
  createP("");
  createSpan(" scale ");
  slide3 = createSlider(24, 480, 96);
}

// this is a mash up of perlin noise by Qiumeng Fu
// https://editor.p5js.org/fuqiumeng/sketches/pJxXT7h4w
