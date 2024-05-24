// sliders with gang slider v2
// 

let redSlider, greenSlider, blueSlider, masterSlider;

function setup() {
  createCanvas(400, 200);
  
  // Create the red slider
  redSlider = createSlider(0, 255, 100);
  redSlider.position(20, 20);

  // Create the green slider
  greenSlider = createSlider(0, 255, 100);
  greenSlider.position(20, 50);

  // Create the blue slider
  blueSlider = createSlider(0, 255, 100);
  blueSlider.position(20, 80);

  // Create the master slider
  masterSlider = createSlider(-20, 20, 0);
  masterSlider.position(20, 110);
  masterSlider.input(updateSliders);
}

function draw() {
  background(220);

  // Display the values of the sliders
  fill(0);
  text(" RED: " + redSlider.value(), 150, 35);
  text(" GREEN: " + greenSlider.value(), 150, 65);
  text(" BLUE: " + blueSlider.value(), 150, 95);
  text(" brightness tweak: " + masterSlider.value(), 100, 125);
  
  // Calculate the R, G, B values based on slider positions
  let r = redSlider.value();
  let g = greenSlider.value();
  let b = blueSlider.value();

  // Display colored rectangle
  fill(r, g, b);
  rect(250, 0, 250, 250);
}

////////// END DRAW ////////////////////////////

function updateSliders() {
  // Calculate the difference between the master slider value and the current slider values
  // let diff1 = masterSlider.value() - redSlider.value();
  // let diff2 = masterSlider.value() - greenSlider.value();
  // let diff3 = masterSlider.value() - blueSlider.value();
  
  // Update the sliders by adding masterSlider value
  redSlider.value(redSlider.value() + masterSlider.value()/2);
  greenSlider.value(greenSlider.value() + masterSlider.value()/2);
  blueSlider.value(blueSlider.value() + masterSlider.value()/2);
}
