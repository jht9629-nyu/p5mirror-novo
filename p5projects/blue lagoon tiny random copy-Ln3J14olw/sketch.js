// blue lagoon tiny random


function setup() {
  createCanvas(400, 400);
  background(255);
  // frameRate(8);
  noStroke();
}

function draw() {
      fill(
        0,
        random(100, 150),
        //limiting random range
        random(200, 255),
        150
        //adding alpha to slow variations
      );
  circle(random(width),random(height),
         // randomly placed circles
         random(10,20));
        //of varying sizes
  }

    console.log("this doesn't glimmer");  console.log("because it's not fast enough");
  


