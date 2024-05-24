// https://editor.p5js.org/benjamin.bergery/sketches/oFDtNUwXx

let r = 0;
let g = 0;

function setup() {
  createCanvas(400, 400);
  background(0, 0, 255);
  stroke(255);
  fill(255);
  strokeWeight(24);
}

function draw() {
  background(r, g, 255);
  translate(width / 2, height / 2);
  fill(255);
  rotate(millis() / 10000);
  circle(width / 2, 0, 300, 300, 30);
  drawingContext.filter = "blur(112px)";

  //rotate(millis()/1000);
  fill(255, 20);
  circle(width / 2, height / 2, 300, 300, 30);
  drawingContext.filter = "blur(112px)";

  //r = r + 1/10 ;

  if (r >= 128) {
    r = r - 1 / 10;
  } else {
    r = r + 1 / 10;
  }
  if (r <= 0) {
    r = r + 1 / 50;
  }

  g = g + 1 / 100;

  //console.log('r= '+r+' g= '+g);
}

//thank you Kazuki Umeda
//https://editor.p5js.org/Creativeguru97/sketches/p2dL9Cvse
// filter(BLUR, 12);//Compare with this p5.js filter function!!!
