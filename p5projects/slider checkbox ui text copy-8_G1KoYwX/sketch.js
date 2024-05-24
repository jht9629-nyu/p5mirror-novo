// https://editor.p5js.org/jht1493/sketches/o6D3U4yPp
// slider checkbox ui text

let a_color = [255, 0, 175];
let a_size = 50;
let a_x = 400;
let a_crawl = true;
let a_text = 'The Start..';

function setup() {
  createCanvas(400, 200);
  build_ui();
}

function draw() {
  background(200);
  
  fill(a_color);
  textSize(a_size)
  text(a_text, a_x, height - 10)
  
  if (a_crawl) {
    a_x -= 1;
    if (a_x < -textWidth(a_text)) {
    // if (a_x > width) {
      a_x = width;
    }
  }
}

// Connecting ui directly to variables.
function build_ui() {
  // createSlider(min, max, [value], [step])
  createSlider(0, 300, a_size).input(function() {
    a_size = this.value();
  });
  // createCheckbox([label], [value])
  createCheckbox('Crawl', a_crawl).changed(function() {
    a_crawl = this.checked();
  });
  createButton('changeColor').mousePressed(function() {
    let r = [255,0,0]
    let g = [0,255,0]
    let y = [255,255,0]
    a_color = random([r,g,y]);
  });
}

// https://editor.p5js.org/jht1493/sketches/mdhUP_wTu
// button slider checkbox ui

// https://p5js.org/reference/#/p5/text
// reference: https://p5js.org/reference/#group-Typography

// NOTE: function ()
// NOTE: DOM variables local
// TODO: have circle move on startup
// TODO: Add a variable and a button to change direction
// TODO: Add slider for speed
// TODO-Challenge: Add slider to adjust size of circle
// TODO-Challenge: Change to bounce motion


