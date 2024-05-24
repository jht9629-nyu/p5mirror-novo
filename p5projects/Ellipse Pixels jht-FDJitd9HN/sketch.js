let capture;
const pixelSize = 10;

function setup() {
  createCanvas(680, 520);
  capture = createCapture(VIDEO);
  capture.size(width / pixelSize, height / pixelSize);
  // capture.hide();
}

function draw() {
  capture.loadPixels();

  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;
      let r = capture.pixels[index] + random(-20, 20);
      let g = capture.pixels[index + 1] + random(-20, 20);
      let b = capture.pixels[index + 2] + random(-20, 20);

      let bright = (r + g + b) / 3;
      let asize = (bright / 255) * pixelSize * 4;

      // let asize = (brightness(color(r, g, b)) / 255) * pixelSize * 8;

      fill(r, g, b);
      noStroke();
      strokeWeight(0.5);
      ellipse(
        x * pixelSize + pixelSize / 2,
        y * pixelSize + pixelSize / 2,
        asize,
        asize
      );
    }
  }
}

//https://editor.p5js.org/jht9629-nyu/sketches/ZAi4hI8dF
