//mouse pixel disrupter v3
//https://editor.p5js.org/novo/sketches/Xt7q0OQ-v

let vScale = 15;
let brightnessFactor = 2; 
let video;

function setup() {
  createCanvas(400, 400);
  
  video = createVideo(['sloquai.mp4']);
  video.size(19,10)
  video.loop();
  
  setupVidscaleSlider();
  setupBrightSlider();

}

function draw() {
  background(20); 
  // bg must be in draw() to avoid multiple lines
  
    // loadPixels() loads R,G,B,Alpha
  // values for each pixel
  // of a single frame
  // into an array called pixels

  video.loadPixels();

  // 2 nested for loops scan every y line
  // for x values of a single frame

  for (let y = 2; y < video.height; y=y+4) { //y++
    for (let x = 2; x < video.width; x=x+4) { //x++

      // index jumps every 4 values of
      // R,G,B,Alpha in pixels array

      let index = (video.width - x + 1 + y * video.width) * 4;

      // assigning R G B values for each pixel

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      // RGB values are added then divided
      // by brightness factor set by slider.
      // Smaller factor => higher bright

      brightnessFactor = brightSlide.value();
      let bright = (r + g + b) / brightnessFactor;

      // Slider sets scale
      // of small video source
      // seen below canvas.
      // Smaller source means bigger pixels
      // on canvas above

      vScale = vidscaleSlide.value();
      video.size(width / vScale, height / vScale);

      // Circular pixel radius length 
      // is mapped to pixel brightness.
      // Brighter pixels => bigger pixel

     // let radius = map(bright, 0, 255, 0, vScale * 1.2);
       //let radius = map(mouseX, 0, width, 20, vScale * 1.2);
      let radius = 60;
      
     let yproximity = mouseY - y ;
      let xproximity = mouseX - x;
   // let impact = map(bright, 0, height, )
   let newy = y + (yproximity/bright);
      let newx = x + (xproximity/bright);


      // output pixel is a solid color circle
      // these low-res geometrical shapes
      // are displayed quickly

      noStroke();
      fill(r, g, b, 255);
    //ellipse(x * vScale, y * vScale, radius, radius);
     ellipse(newx *vScale, newy * vScale , radius, radius);
    }
  }
}


function setupVidscaleSlider() {
  createP("  ");
  createSpan("Resolution is set by scale of video source -- 1 to 30 ");
  vidscaleSlide = createSlider(1, 30, 30, 0.5);
}

function setupBrightSlider() {
  createP("  ");
  createSpan("Pixel sensitivty to mouse position -- 0 to 10 ");
  brightSlide = createSlider(0, 10, 2, 0.1);
}
  
  

// NOTE mouseX&Y tracks outside canvas right and bottom

