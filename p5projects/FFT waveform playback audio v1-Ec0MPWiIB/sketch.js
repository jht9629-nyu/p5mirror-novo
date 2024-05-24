//FFT waveform playback audio v1
//https://editor.p5js.org/novo/sketches/Ec0MPWiIB

let voice;
let fft;
let pointSize=2;

function preload(){
  voice = loadSound('Parfum.mp3');
  // try a slow sweep and or 2 single frequencies 1 and 4 khz
  // can you do equivalent with mike?
}

function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  // setup_mike();
}

function draw() {
  background(80);
  // stroke(255);
  noStroke();
    // draw_mike();
  let waveArray = fft.waveform();
   // let waveArray = fft.analyze();
 
  for (let i = 0; i < width; i++) {
    let waveIndex = 
        floor( map(i, 0,width,                 0,waveArray.length));
    
    x = i;
    y = waveArray[waveIndex] * 300 + height/2
    
    // point(x,y);
    pointSize = random(1,4);
    //fill(255,0,random(100,255));
    fill(255,200);
    rect(x,y,pointSize)
  }
}

function mouseClicked() {
  if (voice.isPlaying()) {
    voice.pause();
    noLoop();
    
  }
  else {
    voice.play();
    loop();
  }
}

