//Aliza, ICM 007 - Thus sketch visualizes the changes in sldier values and is a simple mp3 player 

let song, sliderRate, sliderPan, button;
let xspacing = 20; // Distance between each horizontal location
let xyspacing = 40; // Distance between each horizontal location



let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 20; // Height of wave
let period = 600.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues, xyvalues; // Using an array to store height values for the wave
let rate = 30;

let counter = 0; // Variable to count number of frames

let myColour; //Keep track of our random colour.

function preload() {
    song = loadSound("pixel_dance.mp3")
}
function setup() {
  createCanvas(400, 400);
  // song = loadSound("pixel_dance.mp3", loaded);
  myColour = color(random(255), random(255), random(255), 20);

   song.loop();

      amp = new p5.Amplitude()

   // create a new Amplitude analyzer
 // analyzer = new p5.Amplitude();
  
  // Patch the input to an volume analyzer
  // analyzer.setInput(song);
  // amplitude = analyzer.getLevel();

  amplitude = 100; // Height of wave
  //amplitude = amp.getLevel()


  fill(myColour);
  
  //wave drawing 
  w = width ;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  y2values = new Array(floor(w / xyspacing));

  //play button
  playButton = createImg("play.png", "Play");
  playButton.size(20, 20);
  playButton.position(width / 2, height - 40);

  //pause button
  pauseButton = createImg("pause.png", "Pause");
  pauseButton.size(20, 20);
  pauseButton.hide();
  pauseButton.position(width / 2, height - 40);

  //stop button
  stopButton = createImg("stop.png", "Stop");
  stopButton.size(20, 20);
  stopButton.hide();
  stopButton.position(width / 2 + 20, height - 40);

  //button = createImg();
  //stopButton = createButton("Stop");
  sliderRate = createSlider(0, 1, 0.5, 0.01);

  sliderPan = createSlider(0, 1, 0.5, 0.01);
  //  song.play();

  //callbacks
  playButton.mousePressed(togglePlaying);
  pauseButton.mousePressed(togglePlaying);
  stopButton.mousePressed(stopPlaying);

  frameRate(rate);
  



  

}

function loaded() {
  //song.play();
  console.log("Loaded");
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.5);
    playButton.hide();
    pauseButton.show();
    stopButton.show();
    //  button.html("Pause");
  } else {
    song.pause();
    pauseButton.hide();
    //button.html("Play");
    playButton.show();
    stopButton.hide();
  }
}

function stopPlaying() {
  if (song.isPlaying()) {
    song.stop();
    pauseButton.hide();
    playButton.show();
    stopButton.hide();
  } else {
  }
}

function startPlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.5);
    pauseButton.show();
    stopButton.show();
    startButton.hide();
    button.html("Pause");
  } else {
    song.pause();
    button.html("Play");
  }
}

function draw() {
  xspacing = sliderPan.value() * 90;
  // background(random(200, 220));
  song.pan(sliderPan.value()); //left vs right speaker
  song.rate(sliderRate.value()); //speed
  
  rate = 10 + sliderRate.value() * 175;

  frameRate(rate);
  fill(myColour);

  if(song.isPlaying()){
  calcWave();
  renderWave();
  // fill(myColour);

  //when the counter reaches 30,
  if (counter > 19) {
    //switch the colour to a new random colour:
    myColour = color(random(255), random(255), random(255), 20);

    //and reset the counter to zero:
    counter = 0;}
  }

  //At the end of each frame increase the counter
  counter = counter + 1;
  
  
  




 //   }

  


 
   //     fill(0, 109, 203)
     //   rect(i, y, 2, y, 25) //(x, y, w, h, radius)
 //   }



   


  


  
}

//Extra functions

// function  preload(){
//     song = loadSound('pixel_dance.mp3')

// }

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(myColour);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}
