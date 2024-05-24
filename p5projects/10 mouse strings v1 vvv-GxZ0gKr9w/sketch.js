//10 mouse strings v1 vvv
//https://editor.p5js.org/no vo/sketches/GxZ0gKr9w


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220); 
  // bg must be in draw() to avoid multiple lines
  stroke(1);
  fill(0);
  let topX = width/11;
  // QUESTION why is it 11 and not 12?
  
  for(let icount = 10; icount > 0; 
       icount -= 1) 
  // QUESTION why is icount better loop variable than topX ? Or is it?
  {
    line(topX, 0, mouseX, mouseY);
   topX += width/11;
  }
}


// NOTES

// NOTE mouseX&Y tracks outside canvas right and bottom

// Source: Code as a Creative Medium

//loop should draw 10 lines
  // topPoint is y = 0
  //  and starting at x = 25 +=10
  // bottomPoint is mouseX,mouseY
