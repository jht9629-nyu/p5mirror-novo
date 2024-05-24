
function setup() {
  noCanvas(400, 400);
  setTimeout(create,1000);
}

function create(){
  createP('hello');
  setTimeout(create,1000);
}

//https://editor.p5js.org/leiyufazhuangjia/sketches/rJteg8wc7
