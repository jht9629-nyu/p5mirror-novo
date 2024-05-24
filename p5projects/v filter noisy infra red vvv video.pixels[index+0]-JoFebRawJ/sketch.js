// vfilter noisy infra red vvv
// https://editor.p5js.org/benjamin.bergery/sketches/V9grqhsC4

//------------//

// video is in setup and draw
let video;

//------------//

function setup() {

  createCanvas(360, 240);
  background(128);
  createP();
  video = createCapture(VIDEO);
  
  // change video display size and hide it
  video.size(320, 240);
  video.hide();
}

//------------//

function draw() {
  
  // load rgba video pixels into "pixels" array
  video.loadPixels();
  
  // 2 nested for loops scan each y line
  // for each x value
  // in a single frame
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {

      // index jumps every 4 values of
      // R,G,B,Alpha in pixels array
      let index = (video.width - x + 1 + y * video.width) * 4;

      // getting red value for pixel
      let r = video.pixels[index + 0];
      
      // g,b not processed, thus un-needed
      // let g = video.pixels[index + 1];
      // let b = video.pixels[index + 2];
      
      // doubling r value
      r = r * 1.5;
      
      // generating g,b noise with randomness
      let g2 = random(0,200);
      let b2 = random(128,255);
      
      // assigning new rgb values for each pixel
      video.pixels[index + 0] = r;
      video.pixels[index + 1] = g2;
      video.pixels[index + 2] = b2;
      
    }
  } 
  
  // save changes to "pixels" array of frame
  video.updatePixels();
  
  // display updated frame in canvas
  image(video,0,0);
}
  
