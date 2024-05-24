// nested blue lagoon
//https://editor.p5js.org/benjamin.bergery/sketches/yqU8tFft0
// sept 27 2022

function setup() {
  createCanvas(400, 400);
  background(255);
  // frameRate(4);
  frameRate(13);
  // liking 15 too
  noStroke();
}

function draw() {
  for (var x = 5; x < width; x += 50) {
    //nested loop
    for (var y = 10; y < height; y += 45) {
      fill(
        //random(100, 155),
        0,
        random(100, 150),
        //limiting random range
        random(200, 255),
        150
        //adding alpha to slow variations
      );
      rect(x, y, 45, 40);
    }
  }
}
