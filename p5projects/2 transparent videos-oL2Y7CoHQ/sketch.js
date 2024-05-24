//https://editor.p5js.org/novo/sketches/oL2Y7CoHQ

let playing = false;
let thevid, thevid2;
let button;

function setup() {
  createCanvas(300, 300);
  thevid = createVideo(["walk3.mp4"]);
  thevid2 = createVideo(["sloquai.mp4"]);
  // thevid.hide();
  button = createButton("play");
  button.mousePressed(toggleVid);
  // attach button listener
}

function draw() {
  background(155);
  thevid.size(300, 200);
  thevid2.size(300, 200);
  fill(255, 0, 0, 200);
  ellipse(50, 50, 100, 100);

  // make video partially transparent
  tint(255, 127);

  // draw video frames on canvas
  image(thevid, 10, 50);
  image(thevid2, 10, 10);
}

// plays or pauses video depending on current state
function toggleVid() {
  if (playing) {
    thevid.pause();
    thevid2.pause();
    button.html("play");
  } else {
    thevid.loop();
    thevid2.loop();
    button.html("pause");
  }
  playing = !playing;
}
