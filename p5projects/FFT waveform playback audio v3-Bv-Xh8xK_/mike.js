let mic;

function setup_mike() {
  // createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();
}

function draw_mike() {
  // background(0);
  let vol = mic.getLevel();
  // console.log('vol', vol)
  fill(0,120);
  ellipse(width/2, height/2, 150, vol * 4000);
}
