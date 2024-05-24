let wav = {};

function preload() {
  wav.pointSize = 2;
  wav.wavefWidth = 300;
  wav.wavefX = 0;
  wav.wavefY = 150;

  wav.voice = loadSound("Parfum.mp3");
  
}

function setup_waveform2() {
  wav.fft = new p5.FFT();
  setup_mike();
  setup_audTint();
  wav.fft.setInput(mik.mic);
}


function draw_waveform2() {

let waveArray = wav.fft.waveform();
  // let waveArray = fft.analyze();

  for (let i = 0; i < wavefWidth; i++) {
    let waveIndex = floor(map(i, 0, wavefWidth, 0, waveArray.length));

    x = i;
    y = wav.waveArray[waveIndex] * 300 + height / 4;

    // point(x,y);
    pointSize = random(1, 4);
    //fill(255,0,random(100,255));
    fill(255, 200);
    rect(x, y, pointSize);
  }
}
