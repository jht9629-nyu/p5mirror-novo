let myVideo = null;

function setup() {
  createCanvas(400,400);

  myVideo = createCapture(VIDEO, 
    function(stream) {
	
    let p5lm = new p5LiveMedia(this, "CAPTURE", stream, "bb Unique Room")
    // this is the current sketch.jc
    // "CAPTURE" or "CANVAS"
    // stream of video passed to function
    // and its name defined
    
  	p5lm.on('stream', gotStream);
    // when you receive a stream
    // run function gotStream
    }
  );
  myVideo.hide();
  // hide the video instead of displaying it
  // hide uses css to hide the video
}

function draw() {
  background(255)
  image(myVideo,0,0,width/2,height)
  // halve the video width 
  if (otherVideo !=null) {
    // if otherVideo not null, it exists
    image(otherVideo,width/2,0,canvas.width/2, height/2);
    // otherVideo place halfway across screen,at top of canvas
    // otherVideo width is half the canvas
    
  }
}

let otherVideo;
function gotStream(stream, id) {
  otherVideo = stream;
  //otherVideo.id and id are the same and unique identifier
  otherVideo.hide()
  // hide the other video too
}