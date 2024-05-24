let mik = {};
// let mik = {micWidth: 300, micX: 450}
// let mic;
// let micWidth = 300;
// let micX = 450;

function setup_mike() {
  // createCanvas(200, 200);

  // let mic;
  mik.micWidth = 300;
  mik.micX = 450;

  mik.mic = new p5.AudioIn();
  mik.mic.start();
}

// function draw_mike() {
//   // background(0);
//   let vol = mic.getLevel();
//   // console.log('vol', vol)
//   fill(0,120);
//   ellipse(width/2, height/2, 150, vol * 4000);
// }

function draw_mike() {
  // background(0)lt ;
  vol = mik.mic.getLevel();
  // console.log('vol', vol)
  fill(0, 120);
  ellipse(mik.micX, height / 4, mik.micWidth / 2, vol * 4000);
  fill(222, 120);
  ellipse(mik.micX, height / 4, mik.micWidth / 3, vol * 3000);
  fill(50, 120);
  ellipse(mik.micX, height / 4, mik.micWidth / 4, vol * 3000);
}
