// GRAY EMBRACES pulsing v4
// https://editor.p5js.org/novo/sketches/DX7akzZlE
// https://editor.p5js.org/novo/sketches/liDTQjfB5
// https://editor.p5js.org/novo/sketches/Vy_F3uq51
// https://editor.p5js.org/benjamin.bergery/sketches/hvqY4BD5Z

//////////// 4 object literals
let bb = {
  x: 200,
  y: 200,
  xspeed: 4,
  yspeed: 3,
  radius: 25,
};

let bb1 = {
  x: 200,
  y: 275,
  xspeed: 3 / 2,
  yspeed: 4,
  radius: 30,
};

let bb2 = {
  x: 100,
  y: 150,
  xspeed: 3,
  yspeed: 4,
  radius: 40,
};

let bb3 = {
  x: 150,
  y: 100,
  xspeed: 3,
  yspeed: 2,
  radius: 45,
};

let bcounter = 0;

////////////////////////////

function setup() {
  createCanvas(1920 / 3, 1080 / 3);
  background(222);
  noStroke();
  // frameRate(20);
}

//////////////////////////////////////////
function draw() {
  
  // modulo operator -> returns the remainder of
  // dividing a number by another number
  // 10 % 3 = 1

  secondsPassed = round((millis() / 1000),1);
  // using round() with 1 decimal to make modulo work

  if (secondsPassed % 2 == 0) {
    bcounter +=1
    background(random(0,255),0,122,70);
  }
 
  let yToGray = map(bb.y, height, 0, 128, 255);
  // make first circle height set 128-255 gray values

  xToGray = map(bb.x, 0, width, 128, 255);
  yToGray = map(bb2.y, 0, height, 128, 255);

  colorArm(bb, xToGray);
  drawArm(bb);
  moveIt(bb);
  cornerBounce(bb);

  colorArm(bb1, yToGray);
  drawArm(bb1);
  moveIt(bb1);
  cornerBounce(bb1);

  colorArm(bb2, yToGray);
  drawArm(bb2);
  moveIt(bb2);
  cornerBounce(bb2);

  colorArm(bb3, xToGray);
  drawArm(bb3);
  moveIt(bb3);
  cornerBounce(bb3);
}

/** functions with object var parameter **/

function colorArm(bobject, grayVal) {
  fill(grayVal, grayVal, grayVal, 50);
  // define reddish gray value of all arms
}

function drawArm(bobject) {
  circle(bobject.x, bobject.y, bobject.radius * 2);
}

function moveIt(arm) {
  // moves the arm in x,y
  arm.x = arm.x + arm.xspeed;
  arm.y = arm.y + arm.yspeed;
}

function cornerBounce(arm) {
  // inverts x and y speed at corners
  if (arm.x >= width - arm.radius || arm.x <= arm.radius) {
    arm.xspeed = -arm.xspeed;
  }
  if (arm.y >= height - arm.radius || arm.y - arm.radius <= 0) {
    arm.yspeed = -arm.yspeed;
  }
}

//NOTES

// https://editor.p5js.org/benjamin.bergery/sketches/nXoIPpoYn

//map(value, start1, stop1, start2, stop2 )
//incoming value converted using map
// here to make canvas height
//correspond to gray mid-tones to whites

// re-using function with object var parameters simplifies code

  //  console.log('millis ='+ millis(),'seconds modulo ='+secondsPassed % 3, bcounter);


// based on GRAY LAVA LAMP
// https://editor.p5js.org/benjamin.bergery/sketches/hvqY4BD5Z
