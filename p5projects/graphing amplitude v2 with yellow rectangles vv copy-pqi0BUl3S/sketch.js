// graphing amplitude v2 with yellow rectangles vv
//https://editor.p5js.org/benjamin.bergery/sketches/W_Ohky5RO

let song;
let bbutton;
let amp;
let amphistory = [];

function preload() {
  song = loadSound("sounds/Parfum.mp3");
}

function setup() {
  createCanvas(200, 200);

  //song.play();
  bbutton = createButton("Play/Pause");
  bbutton.mousePressed(toggleSong);

  amp = new p5.Amplitude();
  // p5 automatically connects amp
  // to audio playing
  // no need to connect
  // unless multiple sources
}
/****************************/

function toggleSong() {
  // isPlaying() is function
  // that returns true of false
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
/*************************/

function draw() {
  background(0);

  let vol = amp.getLevel();
  // console.log(vol);

  // building array of amplitudes
  amphistory.push(vol);

  fill(255, 255, 0); //yellow

  beginShape();

  for (let i = 0; i < amphistory.length; i++) {
    let y = map(amphistory[i], 0, 1, height - 30, 0);
    // map 0 to 1 amp values
    // to bottom to top y
    vertex(i, y);
 
    endShape();

    if (i > width) {
      amphistory.splice(0, 1);
      //delete the earliest array value
      // on screen left
      //to keep the latest array value
      //on screen right
    }
  }
}
/**************************/

/******** NOTES ******/
// Coding Train 17.9
//https://www.youtube.com/watch?v=jEwAMgcCgOA&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=10
//https://editor.p5js.org/benjamin.bergery/sketches/G4b3xCx7H

//beginShape() and endShape() functions allow creating more complex forms.
//beginShape() begins recording vertices for a shape and endShape() stops recording
