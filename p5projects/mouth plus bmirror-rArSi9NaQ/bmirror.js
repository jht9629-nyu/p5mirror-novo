// https://editor.p5js.org/jht9629-nyu/sketches/1DfZ5dRU1

let video;
let vScale = 4;

function setup_bmirror() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.position(0,height + 170);
}

function draw_bmirror() {
  background(51);
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      fill(255);
      rectMode(CENTER);
      rect(x * vScale, y * vScale, w, w);
      
// error p5.js says: [bmirror.js, line 28] rect() was expecting Number for the fourth parameter, received NaN instead. 
// john henry fixes it by adding
// https://p5js.org/reference/#/p5/createCapture
// The loadedmetadata property can be used to detect when the element has fully loaded (see second example)
// the second example checks for loadedmetadata
// if (capture.loadedmetadata)
      
    }
  }

}

// https://editor.p5js.org/codingtrain/sketches/nFOs57gVh
// 11.4 Brightness Mirror

// Daniel Shiffman
// https://youtu.be/rNqaw8LT2ZU
// http://thecodingtrain.com
