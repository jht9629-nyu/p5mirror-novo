let video;
let vScale = 16;

function setup_bright() {
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
}

function draw_bright() {
  if (! video.loadedmetadata) return;

  // background(51);
  video.loadPixels();

  let w1 = 0;
  let w2 = video.width;

  fill(51);
  rectMode(CORNER);
  rect(w1 * vScale, 0, w2 * vScale, height);

  for (let y = 0; y < video.height; y++) {
    for (let x = w1; x < w2; x++) {
      let index = (video.width - x + 1 + y * video.width) * 4;
      // console.log('rgb', r, g, b)
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let w = map(bright, 0, 255, 0, vScale);
      noStroke();
      fill(255);
      rectMode(CENTER);
      w = int(w)
      let nx = int(x * vScale)
      let ny = int(y * vScale)
      if (w > 0) {
        // console.log('nx, ny, w', nx, ny, w)
        // let img = aLayer.get(nx, ny, w, w)
        // image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight] 
        image(aLayer, nx, ny, w, w, nx, ny, w, w)        
      }
      // rect(nx, ny, w, w);
    }
  }
}

// https://p5js.org/reference/#/p5/image
