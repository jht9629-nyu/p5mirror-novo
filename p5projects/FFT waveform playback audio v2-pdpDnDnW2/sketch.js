//FFT waveform playback audio v2
// https://editor.p5js.org/novo/sketches/pdpDnDnW2

let voice;
let fft;
let pointSize=2;

function preload(){
  voice = loadSound('Parfum.mp3');
  // try a slow sweep and or 2 single frequencies 1 and 4 khz
  // can you do equivalent with mike?
}

function setup() {
  createCanvas(512, 400);
  
  fft = new p5.FFT();
  // setup_mike();
  
  
  createP();
  createSpan('next, try randomly placed point cloud around center point');

  
}

function draw() {
  background(80);
  // stroke(255);
  noStroke();
    // draw_mike();
  let waveArray = fft.waveform(512,512);
   // let waveArray = fft.analyze();
 
  ///////////// FOR LOOP //
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
    
      console.log(waveArray.length);
    
    
    
  }
  // END FOR LOOP ///////////// 
  textSize(15);
  fill(222);
  stroke(0);

  text('CLICK to PLAY or FREEZE waveform', width/6, height-10);

  
}

function mouseClicked() {
  if (voice.isPlaying()) {
    voice.pause();
    noLoop(); // freezes current draw frame
    // console.log("freeze frame");
    
  }
  else {
    loop(); // each frame draws anew
    voice.loop();
    // voice.play();
    // console.log("playing");
  }
}

//https://editor.p5js.org/novo/sketches/Ec0MPWiIB

