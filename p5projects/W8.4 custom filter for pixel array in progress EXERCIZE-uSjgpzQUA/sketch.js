// W8.4 custom filter for pixel array in progress

let videoIn;
let videoScale = 40;
let canvasScale = 2;

function setup() {
  background(0);
  createCanvas(960 / canvasScale, 720 / canvasScale);
  pixelDensity(1);
  videoIn = createCapture(VIDEO);
  videoIn.size(960 / videoScale, 720 / videoScale);
  // macbook air m1 is "720p" FaceTime HD camera
  // but 1280x720 is coming out 4:3 -- 960x720
}

function draw() {
  background(0);
  image(videoIn, 0, 0, width, height);

  loadPixels();

  // loads canvas image values  in "pixels" array

  // number of PIXELS = width * height
  // but each pixel has R,G,B,Alpha value
  /***.  r1,g1,b1,a1,r2,g2,b2,a2... etc... ***/
  // the number of INDICES in array = width * height * 4

  // for pixel(x,y) PIXEL number is = (x + (y * width))
  // the INDEX number for R(x,y) = (x +(y*width))*4)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      r=pixels[index + 0];
      g=pixels[index + 1];
      b=pixels[index + 2];
      a=pixels[index + 3];
      
    }
  }
  updatePixels;
    image(videoIn, 0, 0, width, height);
}

////////////////////////////////////

/* Use an image’s pixel array to apply a custom filter to it. For example, take an image that is in color and display it in black and white. Or take a black and white image and display it with color. 
Or try something different! Look for inspiration from, but do not use the p5.Image filter( ) method nor tint( ). (Source: HappyCoding.io) */

// for (let counter=0; counter<32000; counter=counter+4) {
// pixels[0*counter]=0;
// }
//updatePixels;
// should create magenta line of 50 pixels
