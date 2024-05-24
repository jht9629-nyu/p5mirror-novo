let bb = {
  x: 200,
  y: 200,
  xspeed: 0.25,
  yspeed: 0.15,
  radius: 50,
  fill: (0, 10), //fill alpha no effect
};

let bb2 = {
    x: 200,
  y: 200,
  xspeed: 4,
  yspeed: 3,
  radius: 50,
  fill: (0, 10), //fill alpha no effect 
}
//assigning js object to variable bb
// with different fields: x,y,yspeed...
// https://www.youtube.com/watch?v=-e5h4IGKZRY

function setup() {
  createCanvas(400, 400);
  noStroke();
  // frameRate(20);
  create4sliders();
}


/////////////////////////////////////

function draw() {
  
let xToBlue = map(bb.x, 0, width , 0, 255);
let yToRed = map(bb.y, height, 0, 0, 255);
// using map to make width, height //correspond to 0-255 for blue, red values

  background(0);
  fill(yToRed, 0, xToBlue);
  circle(bb.x, bb.y, bb.radius * 2);
  circle(bb2.x, bb2.y, bb2.radius * 2);

  moveIt();
  cornerBounce();
}

/******** functions ***********************/

function moveIt() {
  // moves the ball in x,y
  bb.x = bb.x + bb.xspeed;
  bb.y = bb.y + bb.yspeed;
}

function cornerBounce() {
  // inverts x and y speed at corners
  if (bb.x >= width - bb.radius || bb.x <= bb.radius) {
    bb.xspeed = -bb.xspeed;
  }
  if (bb.y >= height - bb.radius || bb.y - bb.radius <= 0) {
    bb.yspeed = -bb.yspeed;
  }
}


function create4sliders() {
  createP();
  createSpan("xspeed ");
  slide1 = createSlider(0, 10, 5);
  createP(); 
  createSpan("yspeed ");
  bslide = createSlider(0, 10, 4);
  createP();
  createSpan("B ");
  gslide = createSlider(0, 255, 128);
  createP();
  createSpan("B ");
  gslide = createSlider(0, 255, 128);
  createP();
   }


//map(value, start1, stop1, start2, stop2, [withinBounds])
  //value Number: the incoming value to be converted
// using map here to make canvas width, height 
//correspond to 0-255 for blue, red values
// which makes canvas a slice of the color cube revealed by bouncing ball bb

