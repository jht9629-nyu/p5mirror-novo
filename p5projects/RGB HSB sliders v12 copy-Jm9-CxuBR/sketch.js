// looking at recursive-seeming slider definition
// https://editor.p5js.org/novo/sketches/Jm9-CxuBRrg/novo/sketches/zdUOeeLvy


///////// GLOBAL VARIABLES //////////////////
// let rSlider, gSlider, bSlider;

// let huSlider;

// let a_hue; 
// a_hue = number result of random() method
// QUESTION do we need to declare a_hue as global var?
// it appears in external function create_ui()
// this seems to work anyway when commented out

// let saSlider, brSlider;
//////////// END GLOBAL VARIABLES ///////////


/////////// SETUP //////////////////
function setup() {
  createCanvas(700, 400);
  textSize(15);
  noStroke();
  background(200);

  // writeTextBox(); // right-hand text

  createRGBsliders();
  createHSBsliders();

  createP();
  createSpan("---> looking at anonymous f slider");
  
  create_ui();
}
///////// END SETUP //////////////


function draw() {
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();

  colorMode(RGB);
  // draw top slider area
  fill(222);
  rect(0, 0, 380, 200);
  // draw top color rectangle
  fill(r, g, b);
  rect(0, 110, 380, 200);
  
 textSize(18); // changes size of letters and numbers on left
  // display RGB labels and values
  fill(0);
  text("R", 25, 35);
  text(r, 25 + rSlider.width + 30, 35);
  text("G", 25, 65);
  text(g, 25 + gSlider.width + 30, 65);
  text("B", 25, 95);
  text(b, 25 + bSlider.width + 30, 95);

  // switch to Hue Saturation Brightness mode
  colorMode(HSB, 360, 100, 100, 1);

  //  let hu = huSlider.value();
  let hu = a_hue;
  
  let sa = saSlider.value();
  let br = brSlider.value();

  // draw bottom color rectangle
  fill(hu, sa, br);
  rect(0, 200, 380, 300);
  // draw bottom slider area
  fill(111,0,90);
  rect(0, 300, 380, 400);

  // display HSB labels and values
  // fill(0, 0, 0);
  // text("H", 10, 335);
  // text(hu, 25 + huSlider.width + 10, 235);
  // text("S", 10, 365);
  // text(sa, 25 + gSlider.width + 10, 365);
  // text("B", 10, 395);
  // text(br, 25 + bSlider.width + 10, 395);

  // update_ui();
}
/////////////// end DRAW /////////////////

function create_ui() {
  // createP();
  // createSpan("Hue. ");

  // huSlider = createSlider(0, 360, random(0,360));

  a_hue = floor(random(0, 360));
  //  a_hue is variable that equals random hue number
  
  let huSlider = createSlider(0, 360, a_hue).input(function () {
    a_hue = floor(this.value());
    // getting value() of slider directly inside the slider
    
  });

  huSlider.position(25, 320);
  huSlider.style("width", "300px");

  // let hue_span = createSpan().id('ia_hue');
  createSpan().id("ia_hue");
  // we create a  html element containing onscreen text     
  // with the unique id 'ia_hue' 
  // as a place to put the a_hue variable


  // text(hu, 25 + huSlider.width + 10, 235);
  select("#ia_hue").position(25 + huSlider.width + 10, 320);
  // to tell select function to look for the id ia_hue,     
  // we put a # (pound sign aka bang) in front
  createElement("br");
  // adding line break after hue number on screen 
}

function update_ui() {
  // select('#ia_hue').html('[a_hue=' + a_hue + '] ')
  select("#ia_hue").html(a_hue);
  
  // the current value of the slider is going to be put into the ia_hue html span every frame
  // select call is hue_span
  // #ia_hue is the id of the onscreen html element that is showing the text
  // a_hue is the variable
}

// these 2 functions need to be replaced
// with new approach where the slider is referred to
// using its id and selected with the select function
//
// this is how html and css work by identifying either instances or for an entire class

function createRGBsliders() {
  rSlider = createSlider(0, 255, random(0, 255));
  rSlider.position(45, 20);
  gSlider = createSlider(0, 255, random(0, 255));
  gSlider.position(45, 50);
  bSlider = createSlider(0, 255, random(0, 255));
  bSlider.position(45, 80);
}

function createHSBsliders() {
  // huSlider = createSlider(0, 360, random(0,360));
  // huSlider.position(25, 220);
  // huSlider.style("width", "300px");
  
  saSlider = createSlider(0, 100, random(0, 100));
  saSlider.position(25, 350);
  brSlider = createSlider(0, 100, random(0, 100));
  brSlider.position(25,380);
}

function writeTextBox() {
  titletext = `
  USE SLIDERS 
  TO MATCH THE 2 COLORS 

  RGB (Red Green Blue)
  and
  HSB (Hue Saturation Brightness)

  It's EASIER to change HSB (the bottom)
  to match RGB (the top) than it is
  to change the top to match the bottom.
   
  HSB is more INTUITIVE
  for building colors 
  because it's easy to find a hue.
   
  But the RGB DIFFICULTY is also about
  changing brightness, which involves
  CHANGING 2 SLIDERS at a time

  © Benjamin Bergery 2023
  `;
  text(titletext, 400, 0, 400, 400);
}





//////////////////////////////////////////////////////
//////////////// old code graveyard //////////////////
//////////////////////////////////////////////////////

function writeTitle() {
  createP(`
  COLORIST GAME`);
}

// let s = 'The quick brown fox jumped over the lazy dog.';
// fill(50);
// text(s, 10, 10, 70, 80); // Text wraps within text box


/////////////// older versions //////////////////
// v6 //https://editor.p5js.org/benjamin.bergery/sketches/uAZuz9rfw

// v8
//https://editor.p5js.org/benjamin.bergery/sketches/L3c3chAPI

// v9
////https://editor.p5js.org/benjamin.bergery/sketches/iFMrqJNnc

// v10
// https://editor.p5js.org/novo/sketches/q_y-cEUsv

