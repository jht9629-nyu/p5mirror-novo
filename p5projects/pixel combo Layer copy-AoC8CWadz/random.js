let aLayer;

function setup_random() {
  aLayer = createGraphics(width, height)
  aLayer.clear();
}

function draw_random() {
  // background(51);

  // let w1 = int(width / 3);
  // let w2 = int(w1 * 2);

  aLayer.loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      aLayer.pixels[index + 0] = x;
      aLayer.pixels[index + 1] = random(255);
      aLayer.pixels[index + 2] = y;
      aLayer.pixels[index + 3] = 255;
    }
  }
  aLayer.updatePixels();
  
  // image(aLayer, 0, 0)
}

