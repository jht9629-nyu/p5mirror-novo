// https://editor.p5js.org/novo/sketches/p82migqxW
// color added

// an array of verses
let verses = [];

// verse must be global
// as a verse will run
// for many, many draw frames
let verse1 = "and ";
let verse2 = "they ";
let verse3 = "walked";

let y = 47; // space between verses
let startSecs; // clock beginning

// pause between stanza duration creates rhythm
let stanzaRhythm = 5;

function setup() {
  createCanvas(400, 200);

  //verse from external text file
  //simpler than defining array in the program
  verses = loadStrings("strongTheHeart.txt");
  // loadStrings reads the contents of a file
  // and creates a string array of its individual lines

  // zero time set by millis() function
  // which starts during setup() function
  startSecs = millis() / 1000;
}

function draw() {
  background(220);

  // current time is reset in each draw frame
  let nowSecs = millis() / 1000;

  if (nowSecs - startSecs > stanzaRhythm) {
    // getting 3 random verses
    let i1 = round(random(0, verses.length - 1));
    let i2 = round(random(0, verses.length));
    let i3 = round(random(0, verses.length));

    startSecs = nowSecs;
    fill(random(128, 255), 100, random(150, 200));
    verse1 = verses[i1];
    verse2 = verses[i2];
    verse3 = verses[i3];
  }

  textSize(28);
  
  // verses are written to screen
  text(verse1, 50, y, 390, 200);
  text(verse2, 50, y + 40, 390, 200)  ;
  text(verse3, 50, y + 80, 390, 200);
}

/************** NOTES ***************************/

//loadStrings('andtheywalked.txt', pickString);
// the file must be located in the sketch directory/folder.
//Alternatively, the file maybe be loaded from anywhere on the local computer using an absolute path (something that starts with / on Unix and Linux, or a drive letter on Windows), or the filename parameter can be a URL for a file found on a network.
//This method is asynchronous, meaning it may not finish before the next line in your sketch is executed.
//This method is suitable for fetching files up to size of 64MB.

// https://editor.p5js.org/novo/sketches/4-U1if0b5
// with thanks to John Henry Thompson
// https://editor.p5js.org/benjamin.bergery/sketches/oo4PHj-SN
