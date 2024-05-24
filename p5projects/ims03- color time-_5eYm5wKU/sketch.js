// color time
// https://editor.p5js.org/novo/sketches/_5eYm5wKU

let xpos = 0;
let xlen;
let ylen;
let debug = 1;
let dim = { width: 400, height: 400 };
let fullScreenBtn;
let startSecs;
let lapseSecs = 10;

function setup() {
  if (!debug) {
    dim.width = windowWidth;
    dim.height = windowHeight;
  }
  createCanvas(dim.width, dim.height);
  noStroke();

  fullScreenBtn = createButton("Full Screen").mousePressed(fullscreen_action);
  fullScreenBtn.style("font-size:42px");

  init_len();

  // setting the start by dividing the millis 
  // millis 
  // returns the number of milliseconds since setup() is called
  startSecs = millis() / 1000;
}

function draw() {
 background(220);
  fill("black");
  rect(0, 0, xpos, ylen);
  fill("blue");
  rect(xpos % width, 0, xlen, ylen);
  fill("255");
  rect((xpos + xlen) % width, 0, xlen, ylen);
  fill("red");
  rect((xpos + xlen + xlen) % width, 0, xlen, ylen);

  let nowSecs = millis() / 1000;
  if (nowSecs - startSecs > lapseSecs) {
    startSecs = nowSecs;
  }

  // xpos = (xpos + 1) % width;
  
  xpos = (width * (nowSecs - startSecs)) / lapseSecs;
  xpos = int(xpos);
}

function init_len() {
  xlen = width / 3;
  ylen = height;
}

// From
// https://editor.p5js.org/jht1493/sketches/5LgILr8RF

function fullscreen_action() {
  ui_remove_all();
  // ui_toggleFullScreen();
  fullscreen(1);
  let delay = 3000;
  setTimeout(ui_present_window, delay);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
  init_len();
}

function ui_remove_all() {
  fullScreenBtn.remove();
}

function ui_toggleFullScreen() {
  if (!document.documentElement.requestFullscreen) {
    console.log("NO document.documentElement.requestFullscreen");
    return;
  }
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// https://editor.p5js.org/jht9629-nyu/sketches/ZGUqiovgG
// ims03-jht scrolling color time

// https://editor.p5js.org/jht9629-nyu/sketches/3VKJ-q8ar
// ims03-jht scrolling color bars
