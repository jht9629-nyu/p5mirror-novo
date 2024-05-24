// nested blue lagoon 2 with a function
//https://editor.p5js.org/novo/sketches/9jka2VJUw

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
      randomfill();
      rect(x, y, 45, 40);
    }
  }
}

/*****************************/

function randomfill() {
  fill(
        //random(100, 155),
        0, // no red
        random(100, 150), // medium green
        //limiting random range
        random(200, 255), // blue highlights
        150 
        //adding alpha to slow variations
      );
  
}
