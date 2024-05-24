// timer- frameCount vs millis & fps
// https://editor.p5js.org/novo/sketches/1dWMS1-hu



function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  write_Seconds();
}

function write_Seconds() {
  
  let alignLeft1 = 20;
let alignLeft2 = 240;
let alignLeft3 = 350;
let alignTop1 = 200;
let vSpacing = 60;
  
  textSize(40);
  text(round(frameCount / 60), alignLeft2, alignTop1);
  
  textSize(20);
  let textFC = "total frameCount /60";
  text(textFC, alignLeft1, alignTop1);
  text('total seconds estimate\nassuming 60fps', alignLeft3, alignTop1)
  

  textSize(20);
  text("round((millis()/1000),1)", alignLeft1, alignTop1 + vSpacing );
  textSize(40);
  let textMillis = round((millis() / 1000),1);
  text(textMillis, alignLeft2, alignTop1 + vSpacing);

  textSize(20);
  text("frames per second", alignLeft1, alignTop1 + 150);
  textSize(40);
  let fps = round((frameCount / (millis()/1000)),1);
  text(fps, alignLeft2, alignTop1 + 150);
}


//let millisecond = millis();
// text('Milliseconds \nrunning: \n' + millisecond, 5, 40);
// using backslash n to put lines in text


// older stuff

//globals
//let rouge = 0;
// let red_change = 1;

// in write_Seconds
// rouge = rouge + red_change;
//  if (rouge > 255) {
//    red_change = -red_change;
//  } else if (rouge < 0) {
//    red_change = -red_change;
//  }
