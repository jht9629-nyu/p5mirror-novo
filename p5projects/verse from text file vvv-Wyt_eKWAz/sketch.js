//verse from external text file
//simpler than defining array in the program
//https://editor.p5js.org/benjamin.bergery/sketches/oo4PHj-SN

let verses = [];
let milliseconds1,milliseconds2;
let mycounter;

function setup() {
  verses = loadStrings("andtheywalked.txt");
  frameRate(.3);
}

function draw() {
  milliseconds1 = millis();
  createCanvas(400, 200);
  background(220);

  let i = 
      round(random(0, verses.length-1));
  let i2 = 
      round(random(0, verses.length));
  let i3 = 
      round(random(0, verses.length));

  let verse1 = verses[i];

  let verse2 = verses[i2];
  let verse3 = verses[i3];
  let y = 40;
  
  textSize(24);
  text(verses[i], 50, y, 390, 200);
    milliseconds2 = millis();
  let delay1 =
    milliseconds2-milliseconds1;
 // 
  text(verses[i2], 50, y + 40, 390, 200);
  text(verses[i3], 50, y + 80, 390, 200);
}






//loadStrings('andtheywalked.txt', pickString);
//Reads the contents of a file and creates a String array of its individual lines. If the name of the file is used as the parameter, as in the above example, the file must be located in the sketch directory/folder.
//Alternatively, the file maybe be loaded from anywhere on the local computer using an absolute path (something that starts with / on Unix and Linux, or a drive letter on Windows), or the filename parameter can be a URL for a file found on a network.
//This method is asynchronous, meaning it may not finish before the next line in your sketch is executed.
//This method is suitable for fetching files up to size of 64MB.
