//Normal vs Slider with Anonymous function
//https://editor.p5js.org/novo/sketches/LP6JDqxwi

let bg_color = 222;

function setup() {
  createCanvas(400, 250);
  normalSlider();
  // top slider changes circle color
  sliderWithAnonymousF();
  // bottom slider changes background using anonymous function
}

function draw() {
  background(bg_color);
  let circle_color = topSlider.value();
  fill(circle_color);
  circle(200, 60, 100);
}

function normalSlider() {
  topSlider = createSlider(0, 255, 150);
  topSlider.position(130, 120);
}

function sliderWithAnonymousF() {
  let bg_slider = createSlider(0, 255, bg_color).input(function () {
    bg_color = bg_slider.value();
  });
}

// NOTES ON ANONYMOUS FUNCTION

//---- DECODING LINE BY LINE

//-- bg_slider is the slider defined by createSlider
// this slider is an html p5 element that has many properties
// these properties include 2 methods: .input() and .value()

//-- .input is a method that calls a function
// to obtain the user's input,
// in this case changes to the slider
// https://p5js.org/reference/#/p5/input

//-- function() is the function called by .input
// it's an anonymous (or unnamed) function
// it doesn't need a name because it's not external:
// it's contained right in the createSlider statement

//-- bg_color is the number returned by
// .value() which is another method
// of the slider element named bg_slider
// .value() evaluates the slider position between 0 and 255

// WHAT SEEMS STRANGE
// are two self-references in the code:
// -- bg_slider.input is defined by a function
// that involves bg_slider.value()
// and indeed we can rewrite the code as:
// bg_color = this.value();

function sliderWithAnonymousF_Commented() {
  //  a slider named bg_slider
  let bg_slider = createSlider(0, 255, bg_color)
    //.input method of the slider
    .input(
      // anonymous function () called by .input
      // to get user input
      function () {
        // bg_color and bg_slider.value()
        bg_color = bg_slider.value();
      }
    ); //end of function called by .input
} // end of sliderWithAnonymousF function

// SLIDER OBJECT HAS SEVERAL METHODS
// it is helpful to research and review
// a list of all the methods associated with
// the object you're using, in this case "createSlider"
// unfortunately, the .input method is not documented

// .input method of slider html element
// .input 's argument is a function
// function() anonymous
// bg_value is updated by changing the slider
// this is bg_slider
// bg_slider references a slider object
// slider object has an input method with a function as an argument
// the anonuymous function evaluates the bg_slider value
// .input method is refering to another method of its object
// bg_slider has a slot input(value)
// when slider value has changed it calls input(value) function
// input(value) function refers to another function of the slider
// slider.value() function.
// slider has slots or properties

// function () { }
// () => { }

// function sliderWithAnonymousF_NONO() {
//   let bg_slider = createSlider(0, 255, bg_value).input( () => {
//     bg_value = floor(bg_slider.value());
//     // getting value() of slider directly inside the slider
//   });
// }

// CODE CEMETERY
// bg_value = floor(bg_slider.value()
