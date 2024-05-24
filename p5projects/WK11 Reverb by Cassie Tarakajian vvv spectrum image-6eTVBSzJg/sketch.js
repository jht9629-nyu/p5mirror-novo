/* Reverb by Cassie Tarakajian 🙏
https://github.com/ITPNYU/ICM-2019-Media/wiki/Homework-Cassie#week-11

https://p5js.org/reference/#/p5.Reverb
Reverb adds depth to a sound through a large number of decaying echoes. It creates the perception that sound is occurring in a physical space.
*/

let thunder;
let bird;
let gong;

let reverb
let sample;
let fft;
let knobPosition;

function preload() {
  thunder = loadSound("sounds/thunder.mp3"); 
  bird = loadSound("sounds/bird.mp3"); 
  gong = loadSound("sounds/gong.mp3"); 
}

function setup() {
  createCanvas(256, 256);
  // try different sample
  sample = bird;
  
  reverb = new p5.Reverb();
  sample.disconnect();
  
  // try different settings
  reverb.process(sample, 3,2);
  // reverb.process(sample, 2,50);
  // reverb.process(sample, 5,90);
  
  let button = createButton("Toggle Sample");
  button.mousePressed(function() {
    if (sample.isPlaying()) {
      sample.stop(); 
    } else {
      sample.loop(); 
    }
  });
  
  fft = new p5.FFT(0.8, 256);
}


function draw() {
  background(0);
  let spectrum = fft.analyze();
  let waveform = fft.waveform();
  
  // frequency domain
  stroke("red");
  for(let i = 0; i < spectrum.length; i+=1) {
    line(i, 128, i, 128-(spectrum[i]/2)); 
  }
  
  // time domain
  stroke("blue");
  for (let i = 0; i < waveform.length; i +=1) {
    let sampleHeight = map(waveform[i], -1, 1, -64, 64);
    line(i, 192, i, 192 + sampleHeight);
  }
  
  //changing reverb every frame sounds... really bad
  // let rate = constrain(map(mouseY, 0, height, 10, 0), 0, 10);
  // let time = constrain(map(mouseX, 0, width, 0, 5), 0, 5);
  // print(time);
  // reverb.set(time, rate);
  
}