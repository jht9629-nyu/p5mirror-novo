// blue lagoon with circles grid
//https://editor.p5js.org/benjamin.bergery/sketches/yqU8tFft0
// sept 27 2022

function setup() {
  createCanvas(400, 400);
  background(255);
  frameRate(8);
  noStroke();
  
    console.log("this appears random")
  console.log("even though it's a grid")
     console.log("because circles overlap")

}

function draw() {
  for (var x = 5; x < width+40; x += 50) {
    //nested loop
    for (var y = 10; y < height+20; y += 45) {
      fill(
        0,
        random(100, 150),
        //limiting random range to shimmer
        random(200, 255),
        150
        //adding alpha to slow variations
      );
      circle(x,y,70);
    }
  }
}
