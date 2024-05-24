//make piano2 from this

/*
Scales Reference: 
https://www.amazon.com/Musical-Scales-World-Michael-Hewitt-ebook-dp-B00B770AQE/dp/B00B770AQE/ref=mt_other?_encoding=UTF8&me=&qid=

Note frequencies in hertz (Hz) starting at Middle C, C4
Table of Note Frequencies
https://pages.mtu.edu/~suits/notefreqs.html
*/

// Diatonic scale, C Major (white piano keys)
let notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

// Chromatic scale, C Chromatic (white and black piano keys)
// let notes = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88, 523.25];

// Pentatonic Mode 4, China
// let notes = [261.63, 311.13, 349.23, 392.00, 466.16, 523.25];

// Korea
// let notes = [261.63, 293.66, 349.23, 392.00, 440.00]

// Middle East, Turkey
// let notes = [261.63, 277.18, 311.13, 349.23, 369.99, 440.00, 466.16, 523.25];

// India
// let notes = [261.63, 293.66, 311.13, 369.99, 392.00, 415.30, 466.16, 523.25];

// Russia
// let notes = [261.63, 277.18, 329.63, 349.23, 415.30, 440.00, 523.25];

// Egypt
// let notes = [261.63, 293.66, 349.23, 392.00, 466.16, 523.25]


let osc;
let colWidth;
let currentCol;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  // create a new p5 oscillator
  osc = new p5.Oscillator();
  osc.amp(0.5);

  // set column width according 
  // to length of notes' array
  colWidth = width / notes.length;
}

function draw() {
  background(220);

  for (let col = 0; col < notes.length; col++) {
    let x = col * colWidth;

    // if mouse is in a column
    if (mouseX > x && mouseX < x + colWidth) {
      // give it a color
      fill(col * (360 / notes.length), 100, 100)

      // play a note frequency from array
      osc.freq(notes[col]);

    } else {
      fill(255);
    }
    rect(x, 0, colWidth, height);
  }
}

function mousePressed() {
  osc.start(); 
}

function mouseReleased() {
  osc.stop();
}