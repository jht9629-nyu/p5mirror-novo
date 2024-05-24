//https://editor.p5js.org/novo/sketches/y3N7cTyYW

 let x = 200; // x is a GLOBAL variable

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  circle(x, 200, 200); 
    y = 50; // y is a LOCAL variable
  circle(y,50,50);
}


// // no worky because
// function setup() {
//   createCanvas(400, 400);
//   background(220);
//  let x = 200; // x is not a global variable
// }

// function draw() {
//   circle(x, 200, 200); // an error due to "x" not being defined in the current scope
// }

