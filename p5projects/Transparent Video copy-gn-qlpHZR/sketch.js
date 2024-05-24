let playing = false;
let fingers;
let button;

function setup() {
  createCanvas(300,300)
  fingers = createVideo(['fingers.mov']);
  fingers.hide();
  button = createButton('play');
  button.mousePressed(toggleVid); // attach button listener
}

function draw() {
  background(155);
  fill(255,0,0,200);
  ellipse(50,50,100,100);
  tint(255, 127); // make the video partially transparent without changing the color
  image(fingers, 10, 10); // draw the video frame to canvas
}

// plays or pauses the video depending on current state
function toggleVid() {
  if (playing) {
    fingers.pause();
    button.html('play');
  } else {
    fingers.loop();
    button.html('pause');
  }
  playing = !playing;
}