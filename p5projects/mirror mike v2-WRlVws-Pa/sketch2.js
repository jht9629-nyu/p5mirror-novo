function setup() {
  createCanvas(400, 600);
  setup_mouth();
  setup_bmirror();
  setup_mike();
}

function draw() {
  background(220);
  draw_bmirror();
  // draw_mouth();
  draw_mike();
}

