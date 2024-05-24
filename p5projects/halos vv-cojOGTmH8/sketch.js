

function setup(){
  createCanvas(400, 400);

  stroke(255);
  fill(255);
  strokeWeight(24);
}

function draw(){
  background(0,0,255);
  //translate(width/2, height/2);

  //rotate(millis()/5000);
  circle(width/2, 0, 300, 300, 30);
  drawingContext.filter = 'blur(112px)';
  
  rotate(millis()/1000);
  fill(255,20);
  circle(width/2, 0, 300, 300, 30);
  drawingContext.filter = 'blur(112px)';
  
  



  // console.log('Frame rate: '+frameRate());
}

// filter(BLUR, 12);//Compare with this p5.js filter function!!!
//credit 
//https://editor.p5js.org/Creativeguru97/sketches/p2dL9Cvse