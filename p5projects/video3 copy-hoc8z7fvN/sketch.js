// https://editor.p5js.org/jcamsfo/sketches/uvtZjOvse

let video, video2, video3;
let start;
let end;

// why do videos blank at loop ????

function preload() {
  // video = createVideo('001.mp4');
  // video2 = createVideo('waves-MPZ.mp4');
  // video3 = createVideo('swim.mp4');

  // flags.mp4
  video = createVideo("swirl.mp4");
  video2 = createVideo("nyc.mp4");
  video3 = createVideo("swim.mp4");

  // video.play();
  video.hide();
  video2.hide();
  video3.hide();
}

function setup() {
  createCanvas(1024, 900);
  //  createCanvas(1024, 900);
  background(51);
  fill(255);
  circle(10, 10, 10);
  // Loop myVideo.mp4 file stored in the video variable
  start = millis();
  end = millis();
  video3.speed(3);
  video2.speed(0.3);
  video2.position(100, 100);
  video3.position(600, 350);
    textSize(20);
}

function draw() {
  video.loop();
  video2.loop();
  video3.loop();
  image(video, 100, 100);
  image(video2, 500, 200);
  image(video3, 300, 600);


  if (frameCount % 30 == 0) {
    fill(51);
    rect(8, 20, 70, 20);
    fill(255);
    text(frameRate().toFixed(2),20, 36);
  }
}
