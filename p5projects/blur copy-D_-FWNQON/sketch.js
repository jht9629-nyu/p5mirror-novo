

function setup() {
  createCanvas(400,400);
  background(0,0,255);
  frameRate(4);
 }

function draw() {
  background(0,0,255);
  let b = round(100 - random(20,30));
  rotate(millis/1000);
  strokeWeight(100);
  stroke(255);
  let range = 1;
  // let xoffset = random(-range,range);
  // let yoffset = random(-range,range);
   //circle(200-xoffset,200-yoffset,100);
  circle(200,200,100);
  
  let string='blur('+b+'px)';
  console.log(string);
  drawingContext.filter = string;
}

//https://www.youtube.com/watch?v=s7CTmJt0NfI