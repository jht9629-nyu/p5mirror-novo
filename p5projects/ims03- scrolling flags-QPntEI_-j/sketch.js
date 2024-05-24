// scrolling flags
// https://editor.p5js.org/novo/sketches/QPntEI_-j


let xpos = 0;
let xlen;
let ylen;
let debug = 1;
let dim = { width: 400, height: 400 };
let fullScreenBtn;

function setup() {
  
  if (!debug) {
    dim.width = windowWidth;
    // windowWidth is system variable that stores 
    // the width of the inner window
    // it maps to window.innerWidth
    
    dim.height = windowHeight;
  }
  
  createCanvas(dim.width, dim.height);
  noStroke();

  fullScreenBtn = createButton("Full Screen").mousePressed(full_screen_action);
  fullScreenBtn.style("font-size:42px");

  init_dim();
}

function draw() {
  // background(220);
  
  fill(255);
  rect(0, 0, xpos, ylen);
  fill("blue");
  rect(xpos % width, 0, xlen, ylen);
    // % is remainder operator
    // so xpos % width
    // means remainder = xpos / width
    // if xpos == 0 then remainder == 0
    // if xpos == width / 2 then remainder == width / 2
    // if xpos == width then remainder == 0
    // so remainder grows from 0 to width to 0
    // as xpos crosses frame from left to righ

  
  fill(255);
  rect((xpos + xlen) % width, 0, xlen, ylen);
  fill("red");
  rect((xpos + xlen + xlen) % width, 0, xlen, ylen);

  // move xpos from left to right
  // reset to zero when xpos > width
  xpos = (xpos + 1) % width;
}

function init_dim() {
  xlen = width / 5;
  ylen = height;
}

// From
// https://editor.p5js.org/jht1493/sketches/5LgILr8RF

function full_screen_action() {
  ui_remove_all();
  ui_toggleFullScreen();
  
  
  let delay = 1000;
  
 setTimeout(ui_present_window, delay);
  // setTimeout(function,delay)
  // with a delay in milliseconds
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
  init_dim();
}

function ui_remove_all() {
  fullScreenBtn.remove();
}

function ui_toggleFullScreen() {
  fullscreen(1);
  // if (!document.documentElement.requestFullscreen) {
  //   console.log("NO document.documentElement.requestFullscreen");
  //   return;
  // }
  // if (!document.fullscreenElement) {
  //   document.documentElement.requestFullscreen();
  // } else {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   }
  // }
}

//https://editor.p5js.org/jht9629-nyu/sketches/3VKJ-q8ar
// ims03-jht scrolling color bars

