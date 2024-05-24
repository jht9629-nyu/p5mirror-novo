// nested blue lagoon 2 with a function
//https://editor.p5js.org/novo/sketches/9jka2VJUw

let A, B, C;
let gap, pixWidth ;


function setup() {
  createCanvas(800, 450);

  // frameRate(4);
  frameRate(13);
  // liking 15 too
  noStroke();
  make3sliders();
}

function draw() {
    background(222 );
  gap = slide1.value();
  pixWidth = slide2.value();
  C = slide3.value();
  
  for (let x = gap; x+pixWidth < width; x += (pixWidth+gap)) {
    //nested loop
    for (let y = gap; y+pixWidth < height; y += (pixWidth+gap)) {
      randomfill();
      rect(x, y, pixWidth, pixWidth);
    }
  }
}

/*****************************/

function make3sliders() {
  createP("");
  createSpan(" A ");
  slide1 = createSlider(-10, 200, 64);
  createP("");
  createSpan(" B ");
  slide2 = createSlider(10, 300, 118);
  createP("");
  createSpan(" C ");
  slide3 = createSlider(0, 255, 255);
}

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

/*****************************/


