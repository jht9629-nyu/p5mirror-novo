function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // modulo operator -> returns the remainder of
  // dividing a number by another number
  // 10 % 3 = 1
  // 450 % 400 = 50
  // 451 % 400 = 51
  ellipse(
    (frameCount * 2) % 450,
    200, 100, 100);
}