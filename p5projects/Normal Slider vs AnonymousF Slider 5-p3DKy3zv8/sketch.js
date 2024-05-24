// Normal Slider vs AnonymousF Slider v5
// https://editor.p5js.org/novo/sketches/p3DKy3zv8
// exploration by benjaminb of code lesson by jht1493

let bg_color = 222;
// this global used in setup and in an external function
// must be assigned a value

function setup() {
  createCanvas(400, 250);
  normalSlider();
  // top slider will change circle fill color
  sliderWithAnonymousF();
  // bottom slider will change background 
  // using anonymous function
}

function draw() {
  background(bg_color);
  // bg_color defined in anonymous function

  let circle_color = topSlider.value();
  // fill color using .value() method
  fill(circle_color);
  circle(200, 60, 100);
}

function normalSlider() {
  topSlider = createSlider(0, 255, 150);
  topSlider.position(130, 120);
}

function sliderWithAnonymousF() {
  let bg_slider = createSlider(0, 255, 222).input(function () {
    bg_color = this.value();
    // "this.value()" is same as "bg_slider.value()"
  });
}

// NOTES ON NORMAL SLIDER FUNCTION
// the normalSlider() will run every frame
// even if the slider has not been touched

// NOTES ON ANONYMOUS FUNCTION
// More compact than "normalSlider"
// because it calls the value() method in createSlider
// Put another way: createSlider
// involves 2 methods (.input & .value) 
// of the slider object it defines

// ANONYMOUS FASTER THAN NORMAL IN FOR LOOPS
// Anonymous function is faster than a Normal Slider
// inside a big pixel for loop,
// because it will call the Slider function 
// in every iteration, even if it hasn't been touched
// whereas the Anonymous function is called inside the DOM
// only when the slider has been changed

//////////////////////////////

//---- DECODING LINE BY LINE

//-- bg_slider is the slider defined by createSlider
// this slider is an html p5 element that has many properties
// these properties include 2 methods: .input() and .value()

//-- .input is a method that calls a function
// to obtain the user's input,
// in this case changes to the slider
// https://p5js.org/reference/#/p5/input

//-- function() is the function called by .input
// it can also be said that function() is the argument of .input
// it's an anonymous (or unnamed) function
// it doesn't need a name because it's not external:
// it's contained right in the createSlider statement

//-- bg_color is the number returned by
// .value() which is another method
// of the slider element named bg_slider
// .value() evaluates the slider position between 0 and 255

//////////////////////////////////

// SELF-REFERENCING OF bg_slider
// bg_slider.input() is defined by an anonymous function
// that involves bg_slider.value()
// and indeed we can rewrite the code as:
// bg_color = this.value();
// to indicate this self-referencing
// or we could say that one of bg_slider's methods
// is defined by another of bg_slider's methods

///////////////////

function sliderWithAnonymousF_Commented() {
  //  create a slider named bg_slider2
  let bg_slider2 = createSlider(0, 255, bg_color)
    //.input method of this slider calls anonymous function
    .input(function () {
      // that uses .value to get updated slider number
      // to put in bg_color variable
      bg_color = this.value();
    }); // parenthesis ends function called by .input
} // last bracket ends sliderWithAnonymousF function

/////////////////////////////////////////////////
// MORE NOTES

// it is helpful to research and review
// a list of all the methods associated with
// the object you're using, in this case "createSlider"
// which shares methods of all p5 element objects
// https://p5js.org/reference/#/p5.Element

// unfortunately, .input is not documented
// as a method of p5 element objects
// but is explained here:
// https://p5js.org/reference/#/p5/input

////////////////////////////////
// PRUDENCE WITH THE HASHROCKET
// https://www.freecodecamp.org/news/what-does-the-hashrocket-symbol-mean-in-javascript/
// another way of writing function () { }
// is to write
// () => { }
// using equal and greater than sign =>
// also known as "hashrocket"
// which can be used to create "arrow functions"
// as well as our anonymous function,
// but it is arguably less readable than the word function

// function sliderWithAnonymousF_NONO() {
//   let bg_slider = createSlider(0, 255, 222).input( () => 
// OR 
// let bg_slider = createSlider(0, 255, 222).input( function () // {
//     bg_value = bg_slider.value();
//   });
// }

/////////////////////
// CODE CEMETERY
// bg_value = floor(bg_slider.value() 
// we don't seem to need floor

//https://editor.p5js.org/novo/sketches/LP6JDqxwi
// https://editor.p5js.org/novo/sketches/7zTwgtRcH
// https://editor.p5js.org/novo/sketches/cu735F4UA

