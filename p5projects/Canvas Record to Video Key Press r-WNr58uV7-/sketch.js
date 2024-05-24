// records and downloads .webm file

let recording = false;
let recorder;
let chunks = [];

const fr = 30;

function record() {
  chunks.length = 0;
  
  let stream = document.querySelector('canvas').captureStream(fr);
  
  recorder = new MediaRecorder(stream);
  
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  
  recorder.onstop = exportVideo;
  
}

function exportVideo(e) {
  var blob = new Blob(chunks, { 'type' : 'video/webm' });

    // Draw video to screen
    var videoElement = document.createElement('video');
    videoElement.setAttribute("id", Date.now());
    videoElement.controls = true;
    document.body.appendChild(videoElement);
    videoElement.src = window.URL.createObjectURL(blob);
  
  // Download the video 
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'newVid.webm';
  a.click();
  window.URL.revokeObjectURL(url);

}


// taken from pr.js docs
var x, y;

function setup() {
  createCanvas(300, 200);
  frameRate(fr);
  
  // initialize recorder
  record();
  
  // Starts in the middle
  x = width / 2;
  y = height;
}

function keyPressed() {
    
  // toggle recording true or false
  recording = !recording
  console.log(recording);
  
  // 82 is keyCode for r 
  // if recording now true, start recording 
  if (keyCode === 82 && recording ) {
    
    console.log("recording started!");
    recorder.start();
  } 
  
  // if we are recording, stop recording 
  if (keyCode === 82 && !recording) {  
    console.log("recording stopped!");
    recorder.stop();
  }
  
}

function draw() {
  background(200);

  // Draw a circle
  stroke(50);
  fill(100);
  ellipse(x, y, 24, 24);

  // Jiggling randomly on the horizontal axis
  x = x + random(-1, 1);
  // Moving up at a constant speed
  y = y - 1;

  // Reset to the bottom
  if (y < 0) {
    y = height;
  }
}
//https://editor.p5js.org/lisajamhoury/sketches/JMSVEKmx8