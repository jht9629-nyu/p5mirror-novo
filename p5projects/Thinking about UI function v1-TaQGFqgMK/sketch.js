// Thinking about UiLine Class v1
// function UIbb (sliders,buttons,checkboxes,pulldowns);

class UiLine (sliders,buttons,checkboxes,pulldowns) {
  // parameters are 
  // number of sliders, buttons, checkboxes, pulldowns
  // in UiLine 
  // so for a single slider it would simply be
  // redValue = new UiLine (1,0,0,0);
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

