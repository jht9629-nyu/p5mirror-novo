// lores cam using get
// https://editor.p5js.org/novo/sketches/DHjGyPgxG

// Declare a variable  webcam image
let cam;
let PixelSize = 10;

function setup() {
  createCanvas(800, 450);
  // Create off-canvas video element that grabs the video stream from my webcam
  cam = createCapture(VIDEO);
  cam.hide();
  make3sliders();
}

function draw() {
  background(220);
  PixelSize = slide1.value();
  
  // img is a copy of the current video frame
  let img = cam.get();
  
  // Loop through every 50th pixel
  for(let x = 0; x < width; x+=PixelSize) {
    for(let y = 0; y < height; y+=PixelSize) {
      // Get the color at this x,y location
      let col = img.get(x,y);

      fill(col);
      noStroke();
      rect(x, y, PixelSize, PixelSize);
    }
  }
}

//////////////////////

function make3sliders() {
  createP("");
  createSpan(" pixel size ");
  slide1 = createSlider(1, 200, 10);
  createP("");
  createSpan(" G ");
  slide2 = createSlider(0, 255, 100);
  createP("");
  createSpan(" B ");
  slide3 = createSlider(0, 255, 255);
}

 // image(cam, 0, 0);


// https://editor.p5js.org/icm4.0/sketches/OGSIfgFgy
// Pixelated mirror

//https://editor.p5js.org/jht1493/sketches/0FpCjWV1T