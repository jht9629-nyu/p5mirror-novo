let mic;
let micWidth = 300;
let micX = 450;

function setup_mike() {
  // createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();

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
  vol = mic.getLevel();
  // console.log('vol', vol)
  fill(0,120);
  ellipse(micX, height/4, micWidth/2, vol * 4000);
  fill(222,120);
  ellipse(micX, height/4, micWidth/3, vol * 3000);
  fill(50,120);
  ellipse(micX, height/4, micWidth/4, vol * 3000);
}
