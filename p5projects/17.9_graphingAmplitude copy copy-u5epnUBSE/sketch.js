// https://editor.p5js.org/jht9629-nyu/sketches/CpRGKpB2X
// 17.9_graphingAmplitude

// https://editor.p5js.org/jht1493/sketches/0SuvHQbKk
// 17.9_graphingAmplitude

let song;
let amp;
let button;

let volhistory = [];

function toggleSong() {
  console.log('toggleSong isPlaying', song.isPlaying())
  if (song.isPlaying()) {
    song.pause();
    console.log('toggleSong pause')
  } else {
    song.play();
    console.log('toggleSong play')
  }
}

function preload() {
  song = loadSound('rainbow.mp3');
}

function setup() {
  createCanvas(200, 200);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  let vol = amp.getLevel();
  volhistory.push(vol);
  stroke(255);
  noFill();
  push();
  let currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 2 - currentY);
  beginShape();
  for (let i = 0; i < volhistory.length; i++) {
    let y = map(volhistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  pop();
  if (volhistory.length > width) {
    volhistory.splice(0, 1);
  }

  stroke(255, 0, 0);
  line(volhistory.length, 0, volhistory.length, height);
  //ellipse(100, 100, 200, vol * 200);
}


// https://editor.p5js.org/jht1493/sketches/0SuvHQbKk
// 17.9_graphingAmplitude

// https://editor.p5js.org/jht1493/sketches/JzUpCtscr
// 17.1_playSong

// https://github.com/CodingTrain/website/tree/main/
//  Tutorials/P5JS/p5.js_sound/17.1_playSong

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jEwAMgcCgOA

// song rainbow.mp3 extracted from this site
// to be more pleasing to the ear
// and small enough to load into web editor
// https://www.youraccompanist.com/free-scales-and-warm-ups/reference-scales



