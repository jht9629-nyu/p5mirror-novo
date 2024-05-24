function draw_waveform1() {

let waveArray = fft.waveform();
  // let waveArray = fft.analyze();

  // for (let i = 0; i < width; i++) {
  //   let waveIndex =
  //       floor( map(i, 0,width,                 0,waveArray.length));

  for (let i = 0; i < wavefWidth; i++) {
    let waveIndex = floor(map(i, 0, wavefWidth, 0, waveArray.length));

    x = i;
    y = waveArray[waveIndex] * 300 + height / 4;

    // point(x,y);
    pointSize = random(1, 4);
    //fill(255,0,random(100,255));
    fill(255, 200);
    rect(x, y, pointSize);
  }
}