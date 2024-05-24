// blue lagoon v3
//https://editor.p5js.org/benjamin.bergery/sketches/yqU8tFft0
// sept 27 2022

  let amp1speed = 5;
  let amp1 = 1;
  let ampForce ; // standin for external force, wave or sound

function setup() {
  createCanvas(500, 500);
  background(222);
  // frameRate(4);
  frameRate(13);
  // liking 15 too
  noStroke();
}

function draw() {
  
  background(222);
  
  amp1 = amp1 + amp1speed;
  if ( amp1 > 150) {
    amp1speed = - amp1speed;
  }
  else if ( amp1 < 0) {
    amp1speed = amp1speed = - amp1speed;
  }
  // console.log("amp1 = " + amp1)
  
   
  for (var x = 10; x < width; x += 55) {
    //nested loop
        ampForce = amp1 / 8;
      console.log("ampForce = " + ampForce);

    for (var y = 10; y < height; y += 55) {
      
       ampForce = amp1 / 8;
      // console.log("ampForce = " + ampForce);
      
      fill(
        ampForce *10,
        ampForce *10,
        150,
        200 
      );

      
      // fill(
      //   0,
      //   random(100, 150),
      //   //limiting random range
      //   random(200, 255),
      //   150
      //   //adding alpha to slow variations
      // );



      rect(x + ampForce*2 , y - ampForce*2, 30, 30);
    }
  }
}

