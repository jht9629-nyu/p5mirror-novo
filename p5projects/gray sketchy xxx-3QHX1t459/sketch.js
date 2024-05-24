// bounce ball and make it change color

let ball1 = {
  x: 200,
  y: 250,
  xspeed: 3,
  yspeed: 4,
  radius: 30,
};


function setup() {
  createCanvas(600, 400);
  noStroke();
  frameRate(20);
  background(222);
}

function draw() {
  drawBall(ball1);
  move(ball1);
  cornerBounce(ball1);
  
  
}

function drawBall(bobject) {
  circle(bobject.x, bobject.y, bobject.radius * 2);
}

function move(bobject) {
  // moves the ball in x,y
  bobject.x = bobject.x + bobject.xspeed;
  bobject.y = bobject.y + bobject.yspeed;
}



function cornerBounce(bball) {
  // inverts x and y speed at corners
  if (bball.x >= width - bball.radius || bball.x <= bball.radius) {
    bball.xspeed = -bball.xspeed;
  }
  if (bball.y >= height - bball.radius || bball.y - bball.radius <= 0) {
    bball.yspeed = -bball.yspeed;
  }
}
