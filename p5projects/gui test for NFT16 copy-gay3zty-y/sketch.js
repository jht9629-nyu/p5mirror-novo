let sli;
let button;
let button2;
let slider_on = false;

// square area 1400 x 788 is 16x9
const Shapes_Canvas_Width = 1400;
const Shapes_Canvas_Height = 788;

function setup() {
  mainCanvas = createCanvas(Shapes_Canvas_Width, Shapes_Canvas_Height);
  mainCanvas.position(0, 0);
}

function draw() {
  let x = 100;
  let y = 100;
  let x_temp = sli.value();

  background(100);
  fill(255);
  ellipse(x_temp, y, 50, 50);
  
    testerY();
  


}

const Gui_Canvas_Width = 1400; // square area 1400 x 788 is 16x9
const Gui_Canvas_Height = 196;

function create_gui2(){
  
    button = createButton("hello"); // shape select button
    button.position(100, Shapes_Canvas_Height + 50);
    button.size(100, 20);
    button.mousePressed(tester);
  
}


function create_gui(){

    // format of buttons
  // name_of_variable 
  // button_name_of_variable  is button name
  // toggle_name_of_variable  is function name if 2 states
  // if more than 2 selector call it change_name

  /***************************** IMAGE PROCESSING GUI ****************************/


    // GUI general locations
    xloc = Shapes_Canvas_Width - 200;  // GUI rectangle area offset variable for position of all the gui
    yloc = Shapes_Canvas_Height + 10;
  
    const x_button_size = 90;
    const y_button_size = 20;

    let button_names_col1 = ['process', 'reset proc', 'pause vid', 'select vid', 'zoom', 'rotate'];
  let button_funcs_col1 = [toggle_enable_process, toggle_reset_processing, toggle_pause_video, change_video, toggle_zoom, toggle_rotate];
  for (var i = 0; i < 6; i++) {
    buttons_C1[i] = createButton(button_names_col1[i]);            // shape select button
    buttons_C1[i].position(760, yloc + i * 25);
    buttons_C1[i].size(x_button_size, y_button_size);
    buttons_C1[i].mousePressed(button_funcs_col1[i]);
  }

  let slider_Z = [];
  let slider_Z_range = [100, 16, 32, 32];
  let slider_Z_defaults = [10, 0, 24, 16];
  for (var i = 0; i < 4; i++) {
    slider_Z[i] = createSlider(0, slider_Z_range[i], slider_Z_defaults[i], 1);
    slider_Z[i].position(xloc - 260, 0 + (yloc - 2) + 25 * i);
    slider_Z[i].style('width', '120px');
    sliders_all[slider_keys[i]] = slider_Z[i];  // add to the object full of sliders
  }

  buttons_C1[0].style('background-color', col_on);

    /***************************** IMAGE PROCESSING GUI DONE ***********************/



  /***************************** SHAPES GUI ***************************************/

  let button_names_col2 = ['reset loc', 'pause loc', 'polar coord', 'wrap left', 'shuffle', 'stroke opt'];
  let button_funcs_col2 = [toggle_reset_shape_location, toggle_pause_shapes, toggle_polar, toggle_wrap, toggle_shuffle, toggle_stroke_adapt];
  for (var i = 0; i < 6; i++) {
    buttons_C2[i] = createButton(button_names_col2[i]);            // shape select button
    buttons_C2[i].position(1090, yloc + i * 25);
    buttons_C2[i].size(x_button_size, y_button_size);
    buttons_C2[i].mousePressed(button_funcs_col2[i]);
  }

  let button_names_col3 = ['direction', 'shape', 'speed rst', 'time filt', 'blur filt', 'stroke'];
  let button_funcs_col3 = [change_direction, change_shape, toggle_reset_speed, toggle_time_filter, toggle_filter, toggle_stroke_enable];
  for (var i = 0; i < 6; i++) {
    buttons_C3[i] = createButton(button_names_col3[i]);            // shape select button
    buttons_C3[i].position(1200, yloc + i * 25);
    buttons_C3[i].size(x_button_size, y_button_size);
    buttons_C3[i].mousePressed(button_funcs_col3[i]);
  }

  buttons_C3[5].style('background-color', col_on);

  let slider_U = [];
  let slider_U_start = [8, 1, 5, 0, 0, 0];
  let slider_U_range = [64, 240, 500, 15, 24, 10];
  let slider_U_defaults = [50, 50, 100, 4, 0, 1];
  let slider_U_step = [4, 1, 5, 1, 1, 1];
  for (var i = 0; i < 6; i++) {
    slider_U[i] = createSlider(slider_U_start[i], slider_U_range[i], slider_U_defaults[i], slider_U_step[i]);
    slider_U[i].position(xloc + 200, 0 + (yloc - 2) + 25 * i);
    slider_U[i].style('width', '120px');

    sliders_all[slider_keys[i + 4]] = slider_U[i];   // add to the object full of sliders
  }



  let button_names_col0 = ['0', '1', '2', '3', '4', '5'];
  let button_funcs_col0 = [tg0, tg1, tg2, tg3, tg4, tg5];
  for (var i = 0; i < 6; i++) {
    buttons_C0[i] = createButton(button_names_col0[i]);            // shape select button
    buttons_C0[i].position(700, yloc + i * 25);
    buttons_C0[i].size(40, 20);
    buttons_C0[i].mousePressed(button_funcs_col0[i]);
  }

  S_Button_x0 = 400;  // 275

  let button_names_col4 = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5'];
  let button_funcs_col4 = [s0, s1, s2, s3, s4, s5];
  for (var i = 0; i < 6; i++) {
    buttons_C4[i] = createButton(button_names_col4[i]);            // shape select button
    buttons_C4[i].position(S_Button_x0, yloc + i * 25);
    buttons_C4[i].size(40, 20);
    buttons_C4[i].mousePressed(button_funcs_col4[i]);
  }

  let button_names_col5 = ['S6', 'S7', 'S8', 'S9', 'S10', 'S11'];
  let button_funcs_col5 = [s6, s7, s8, s9, s10, s11];
  for (var i = 0; i < 6; i++) {
    buttons_C5[i] = createButton(button_names_col5[i]);            // shape select button
    buttons_C5[i].position(S_Button_x0 + 50, yloc + i * 25);
    buttons_C5[i].size(40, 20);
    buttons_C5[i].mousePressed(button_funcs_col5[i]);
  }

  let button_names_col6 = ['S12', 'S13', 'S14', 'S15', 'S16', 'S17'];
  let button_funcs_col6 = [s12, s13, s14, s15, s16, s17];
  for (var i = 0; i < 6; i++) {
    buttons_C6[i] = createButton(button_names_col6[i]);            // shape select button
    buttons_C6[i].position(S_Button_x0 + 100, yloc + i * 25);
    buttons_C6[i].size(40, 20);
    buttons_C6[i].mousePressed(button_funcs_col6[i]);
  }

  let button_names_col7 = ['S18', 'S19', 'S20', 'S21', 'S22', 'S23'];
  let button_funcs_col7 = [s18, s19, s20, s21, s22, s23];
  for (var i = 0; i < 6; i++) {
    buttons_C7[i] = createButton(button_names_col7[i]);            // shape select button
    buttons_C7[i].position(S_Button_x0 + 150, yloc + i * 25);
    buttons_C7[i].size(40, 20);
    buttons_C7[i].mousePressed(button_funcs_col7[i]);
  }

  if (S_Button_x0 == 275) // extra presets
  {
    let button_names_col8 = ['S24', 'S25', 'S26', 'S27', 'S28', 'S29'];
    let button_funcs_col8 = [s24, s25, s26, s27, s28, s29];
    for (var i = 0; i < 6; i++) {
      buttons_C8[i] = createButton(button_names_col8[i]);            // shape select button
      buttons_C8[i].position(S_Button_x0 + 200, yloc + i * 25);
      buttons_C8[i].size(40, 20);
      buttons_C8[i].mousePressed(button_funcs_col8[i]);
    }

    let button_names_col9 = ['S30', 'S31', 'S32', 'S33', 'S34', 'S35'];
    let button_funcs_col9 = [s30, s31, s32, s33, s34, s35];
    for (var i = 0; i < 6; i++) {
      buttons_C9[i] = createButton(button_names_col9[i]);            // shape select button
      buttons_C9[i].position(S_Button_x0 + 250, yloc + i * 25);
      buttons_C9[i].size(40, 20);
      buttons_C9[i].mousePressed(button_funcs_col9[i]);
    }

    let button_names_col10 = ['S36', 'S37', 'S38', 'S39', 'S40', 'S41'];
    let button_funcs_col10 = [s36, s37, s38, s39, s40, s41];
    for (var i = 0; i < 6; i++) {
      buttons_C10[i] = createButton(button_names_col10[i]);            // shape select button
      buttons_C10[i].position(S_Button_x0 + 300, yloc + i * 25);
      buttons_C10[i].size(40, 20);
      buttons_C10[i].mousePressed(button_funcs_col10[i]);
    }
  }
  /***************************** SHAPES GUI DONE *********************************/


  // mis gui stuff
  button_fps = createButton('fps');            // frame rate select button
  button_fps.position(100, yloc + 100);
  button_fps.size(80, 20);
  button_fps.mousePressed(toggle_fps);


  button_save = createButton('sav');            // save  button
  button_save.position(10, yloc + 130);
  button_save.size(40, 20);
  button_save.mousePressed(save_to_file);


  button_vd_bkgnd = createButton('bkg');            // background behind swimmer select button
  button_vd_bkgnd.position(10, yloc + 50);
  button_vd_bkgnd.size(40, 20);
  button_vd_bkgnd.mousePressed(select_vd_bkgnd);


  button_full_scrn = createButton('full');            // full screen select button
  button_full_scrn.position(10, yloc + 85);
  button_full_scrn.size(40, 20);
  button_full_scrn.mousePressed(select_full_screen);
  
}

let sketch = function (g) {
  let x = 30;
  let y = 40;
  
  let cnv;

  g.setup = function () {
    
    cnv = g.createCanvas(Gui_Canvas_Width, Gui_Canvas_Height);
    cnv.position(0, Shapes_Canvas_Height);
    
    create_gui2();
    

    
    sli = createSlider(0, 200, 50, 1);
    sli.position(300, Shapes_Canvas_Height + 10);
    sli.style("width", "120px");


    console.log("hello");
    

    
  };

  g.draw = function () {
    g.background(240);
    testerX();
    
 //    g.txx();
  };
  
    g.txx = function () {
     console.log("hello 17");
    testerX();
  };
  
  
  testerX = function()
  {
    console.log(sli.value());
  }
  
      testerY = function()
  {
    console.log("ff " + sli.value());
  }
     
     

};

let myp5 = new p5(sketch);


// global function
 function tester()
  {
    console.log(sli.value(20));
  }
     





function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}


