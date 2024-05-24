let bangle = 0;
let bangleSpeed = 1;
let bradius = 0;
let bred = 255;
let x,y; 

function setup() {
  createCanvas(400, 400);
  background(0);
  x=0;
  y=0;
}

function draw() {
  
  //background(0);
  translate(width/2,height/2);
  constrain(bangle,0,360);
 // constrain(bradius,0,200);
  constrain(x,0,200);
  constrain(y,0,200);
  
 bangle = bangle -.05;
 bradius = bradius +.1;
  
  x = bradius * sin(bangle);
  y = bradius * cos(bangle);
  
  bred = bred - 1;
  stroke( 255);
  line(0,0,x,y);
  fill(255,0,bred);
  circle(x,y,50);

}