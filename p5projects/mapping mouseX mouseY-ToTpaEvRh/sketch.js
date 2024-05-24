function setup() {
  createCanvas(400, 400);
}

function draw() {
  let bluex = map(mouseX,0,width,0,255);
  let redy = map(mouseY,0,width,0,255);
  background(redy,128,bluex);
}

