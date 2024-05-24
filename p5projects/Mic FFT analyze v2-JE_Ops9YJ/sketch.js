// Mic FFT analyze v2
// https://editor.p5js.org/pedamado/sketches/a3BHZrHDj

let mic;
let slider;
let fft;
let bands, bandsw;

function setup() {
  createCanvas(innerWidth, 400);
  mic = new p5.AudioIn();
  mic.start();
  createP("microfone sensitivity:");
  slider = createSlider(0, 100, 50);

  // "auto-start" the mic input
  userStartAudio;

  rectMode(CENTER);

  // start the audio analysis engine
  // aha! o que estava à procura
  // são dois parâmetros do FFT
  // smoothing e bandas… pelos vistos o mínimo são 16
  bands = 16;
  fft = new p5.FFT(0.8, bands);

  // set the input source to the mic
  fft.setInput(mic);

  // largura dos rects de bandas
  bandsw = width / bands;
}

function draw() {
  background(0);

  // display the mic input
  showMic();

  // display the FFT analysis
  showFFT();

}

function showMic() {
  let t = slider.value();
  let l = mic.getLevel();
  let y = map(l, 0, t / 100, height, 0);
  noStroke();
  fill(255);
  rect(width / 2, y, 100, 50);
}

function showFFT() {
  // esta análise de FFT usa as bandas do objeto
  let spectrum = fft.analyze();

  // outra abordagem possível
  //let waveform = fft.waveform(32);

  // mostrar todas as bandas do FFT
  noStroke();
  fill(255, 100);

  for (let i = 0; i < spectrum.length; i++) {
    // mapear o valor de 8 bit da amostra para a altura 
    let h = map(spectrum[i], 0, 255, 0, height);
    
    // converter a largura para o total
    let x = i * bandsw;
    
    // desenha cada banda
    rect(x, height/2, bandsw, h);
  }

  





}