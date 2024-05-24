// https://github.com/vanevery/p5LiveMedia

let myVideo = null;

function setup() {
  
  createCanvas(400,400); // canvas not used

  myVideo = createCapture(VIDEO, 
    // callback function after video gotten
    // and permissions obtained
    function(stream) {
	let p5lm = new p5LiveMedia(this, "CAPTURE", stream, "Our Unique Room")
    
  	p5lm.on('stream', gotStream);
    // when you receive a stream, run gotStream() function
    }
  );
}

let otherVideo;
function gotStream(stream, id) {
  otherVideo = stream;
  //otherVideo.id and id are the same and unique identifier
}

