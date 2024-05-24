//BLUE LAGOON shimmering water with random function nested
//https://editor.p5js.org/benjamin.bergery/sketches/5kixGuS3V
// Sep 27, 2022, 11:17:35 AM

function setup() {
  createCanvas(400, 400);
  background(255);
  frameRate(13); // to help it shimmer
  noStroke();
}

function draw() {
  for (var x = 5; x < width; x += 50) {
    //nested loop to scan columns 
    for (var y = 5; y < height; y += 45) {    
      randomFill();    
      rect(x, y, 45, 40);
    }
  }
}

/*****************************/

function randomFill() {
  fill(
        0, // no red
        random(100, 150), // medium green
        //limiting random range
        random(200, 255), // blue highlights
        150  //adding alpha helps shimmering
      );
}
