//https://editor.p5js.org/jcamsfo/sketches/DZPfF2xGb

// Big_pixel flock v10b with verbose annotations
//https://editor.p5js.org/novo/sketches/e-aIfDd54

// changes to code are indicated by comments with a bunch of > as in:
// comment about code change >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// changed array and class names:
// from Shaped_Pixel to to Big_pixel (Capitals for Class names)
// trying to distinguish between video pixels and Big_pixels on Canvas
// also capitalized Avg_accum 



/************************************ TO ADD FEATURES  *********************************/
//  add an array of setups for demoing
//  add an array of setup destinations for sequencing progressions
//  add rectangle as a shape
//  add video as pixel
//  add size change based om content (long term accum of colors of a pixel)
//  add speed change based on content (long term accum of colors of a pixel)
//  add varying resolution   (left to right   top to bottom   polar from center)
//  add varying shape size  (left to right   top to bottom   polar from center)
//  add sampling start point options (left to right   right to left  bottom to top and from corners)
//  add zoom
//  try a few custom shapes or distorting triangles changing over time
//  try staggering the samples
//  add individual buttons for images so quicker access
//  add a background image like a constellation or a normal image (instead of black)
//  add lots of pixel movement stuff
//    example:  for swimmer: blue moves differently than fleshtones (like water)
//    example:  brownian motion
//    example:  image starts small pixels all together in the center maybe 1/8 size 
//              and they break out to fill the screen with gaps with noise on the way
//    example:  image starts vertical colums of pixels overlapping 
//              and they break out to fill the screen with gaps with noise on the way


//  DONE  add time filter
//  DONE REV10  create shape canvas class
//  DONE REV11 (SLOW ON LAPTOP PAST 36) add pixel resolution adjust (4 pix resolution horizontally 8,12,16 ... 64)
//  (TRIED... BLURS TOO MUCH TRY A DIFFERENT TYPE AND ALSO TRY THE REAL VIDEO)
//  (DOESNT REALLY WORK  TOO STACCATO) add video speed slo mo
//  DONE   add adjustable reolution
//  DONE pixel speed adjust
//  DONE add stroke size and other stroke options
//  DONE add shuffle mode where shapes move but their sample points stay the grid



/************************************ TO FIXXXXXXXXXXXXXXXXXXXXXXXXXXX  *********************************/
//  MOVE Display function to main class
//  add a bunch of timing measurements
//  fix wrap glitching
//  fix stroke on triangles
//  FIX reset always going up afetr (order of scanning)

//  FIXED  (SEEMS GONE NOT HAPPENING)  fix maybe a big problem when multiple one are running the image goes black  see if it happens on previous revs
//  FIXED fix color level going to B&W does not work  negative value issue ??
//  (FIXED BUT WITH A BANDAID) fix green squares on bottom (maybe sampling off screen)  actually issue is in the videos


let mainCanvas;    // background canvas  can get rid of if I move buttons

let video_selected;

let shapesCanvas;    // canvas in class

let temp_video_canvas;

let Canvas_Class_1;  // clas of canvas containing pixel shapes


let mulll = 1;

// let Canvas_Height;
// let Canvas_Width;
// let Shapes_Canvas_Width;
// let Shapes_Canvas_Height;
// let Image_In_H_Size;  // do automatically
// let Image_In_V_Size;  // do automatically
// let Small_Image_Out_H_Size;
// let Small_Image_Out_V_Size;

// trying using constants instead
const Canvas_Width = 1696;  // bigger 16x9 canvas to fit video image, sliders and buttons
const Canvas_Height = 954;
const Shapes_Canvas_Width = 1400; // square area 1400 x 788 is 16x9
const Shapes_Canvas_Height = 788;
const Image_In_H_Size = 320; // video input image size (do this automatically)
const Image_In_V_Size = 180;
const Small_Image_Out_H_Size = 96; // small image size put on screen
const Small_Image_Out_V_Size = 54;

let Pixels_Horizontal_Initial = 50;
let Pixels_Vertical_Initial = 28;



/** button variables and defaults **/
let reset_shape_location = false;
let filter_on = false;
let stroke_adapt = 0;
let enable_process = true;
let reset_processing = false;
let time_filter_on = false;
let stroke_enable = true;
let vd_bkgnd_select = 0;
let enable_zoom = false;
let enable_rotate = false;




/** selector variables **/
let rst_opt = 100;

let setup_opt = 100;


let fps_30_selected = true;


let col_on;
let col_off;
let col;

const Num_Of_Videos = 8;  // should be 1 more than video files for random squares

let cross_hairs_on = false;  // for calibration

let choose_random_colors = true;// boolean: random or !random means video


let fps_30_selected_last = true;

// memory variables for change detection
let choose_random_colors_last;
// boolean to enable calling video.loop just once in draw
// theoretically should not be needed if video.loop is in setup

// used for measuring loop lngth
let start;
let end;



let control = [];

let control_last = [];  // for change detection

control = {
  vd_sel: 0, vd_pse: 0,
  px_blk: 10, px_gam: 0, px_gnx: 24, px_cnx: 18,
  px_res: 50, px_sze: 50, px_spd: 75, px_ftc: 7, px_blr: 0, sk_sze: 1,
  px_shp: 0, sk_opt: 0, px_pse: 0, px_pol: 0, px_wrp: 0, px_shf: 0, px_rst: 0, px_bkg: 0
};

control_last = {  // for change detection
  px_res: 32, px_spd: 20
};

let keys_main = Object.keys(control);


// let setups = [];


// setups[0] = {
//   vd_sel: 1, vd_pse: 0,
//   px_blk: 10, px_gam: 0, px_gnx: 24, px_cnx: 18,
//   px_res: 32, px_sze: 70, px_spd: 20, px_ftc: 7, px_blr: 0, sk_sze: 1,
//   px_shp: 0, sk_opt: 0, px_pse: 0, px_pol: 0, px_wrp: 0, px_shf: 0, px_rst: 0, px_bkg:0
// };


// setups[1] = {
//   vd_sel: 1, vd_pse: 0,
//   px_blk: 10, px_gam: 0, px_gnx: 24, px_cnx: 18,
//   px_res: 32, px_sze: 6, px_spd: 20, px_ftc: 7, px_blr: 0, sk_sze: 1,
//   px_shp: 2, sk_opt: 0, px_pse: 0, px_pol: 0, px_wrp: 0, px_shf: 0, px_rst: 0
// };


// setups[2] = {
//   vd_sel: 1, vd_pse: 0,
//   px_blk: 10, px_gam: 0, px_gnx: 24, px_cnx: 18,
//   px_res: 32, px_sze: 3, px_spd: 200, px_ftc: 7, px_blr: 0, sk_sze: 1,
//   px_shp: 0, sk_opt: 0, px_pse: 0, px_pol: 0, px_wrp: 0, px_shf: 0, px_rst: 0
// };


// setups[3] = {
//   vd_sel: 1,
//   sk_sze: 0
// };


let setups_from_file = undefined;



// pre load the videos  // not sure why ??  necessary if there is only one video
let video_names = [
  "assets/swimFP.mp4",
  "assets/nyc.mp4",
  "assets/swirlP.mp4",
  "assets/flags.mp4",
  "assets/calibrate.mp4",
  "assets/Vstripe30.mp4",
  "assets/bars.mp4",
];
let videos = [];
function preload() {
  for (var i = 0; i < video_names.length; i++) {
    videos[i] = createVideo(video_names[i]);
    videos[i].hide();
  }
}


let button_save;

let buttons_C0 = [];
let buttons_C1 = [];
let buttons_C2 = [];
let buttons_C3 = [];
let buttons_C4 = [];
let buttons_C5 = [];
let buttons_C6 = [];
let buttons_C7 = [];

let slider_X = [];

let sliders_all = {};

let slider_keys = ['px_blk', 'px_gam', 'px_gnx', 'px_cnx',
  'px_res', 'px_sze', 'px_spd', 'px_ftc', 'px_blr', 'sk_sze'];

/******************************************************************************************/
/********************************** SETUP *************************************************/

function setup() {


  // randomSeed(99);

  // class constructor for the canvas
  Canvas_Class_1 = new Shaped_Pixel_Canvas(Shapes_Canvas_Width, Shapes_Canvas_Height, Pixels_Horizontal_Initial, Pixels_Vertical_Initial, 0, 100, 0);

  mainCanvas = createCanvas(Canvas_Width, Canvas_Height);

  col_on = color(180, 240, 180, 255);
  col_off = color(200, 200, 200, 255);
  col = color(200, 200, 200, 255);




  // format of buttons
  // name_of_variable 
  // button_name_of_variable  is button name
  // toggle_name_of_variable  is function name if 2 states
  // if more than 2 selector call it change_name

  /***************************** IMAGE PROCESSING GUI ****************************/

  // GUI general locations
  xloc = Shapes_Canvas_Width - 200;  // GUI rectangle area offset variable for position of all the gui
  yloc = Shapes_Canvas_Height + 10;

  // FPS canvas location
  fps_locx = xloc - 1100;
  fps_locy = Shapes_Canvas_Height + 100;

  // small video canvas location
  vid_locx = fps_locx + 40;
  vid_locy = Shapes_Canvas_Height + 50;

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

  buttons_C1[0].style('background-color', col_on);

  video_selected = videos[1];

  let slider_Z = [];
  let slider_Z_range = [100, 16, 32, 32];
  let slider_Z_defaults = [10, 0, 24, 16];
  for (var i = 0; i < 4; i++) {
    slider_Z[i] = createSlider(0, slider_Z_range[i], slider_Z_defaults[i], 1);
    slider_Z[i].position(xloc - 260, 0 + (yloc - 2) + 25 * i);
    slider_Z[i].style('width', '120px');
    sliders_all[slider_keys[i]] = slider_Z[i];  // add to the object full of sliders
  }

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

  let button_names_col3 = ['undefined', 'shape', 'speed rst', 'time filt', 'blur filt', 'stroke'];
  let button_funcs_col3 = [dummy, change_shape, toggle_reset_speed, toggle_time_filter, toggle_filter, toggle_stroke_enable];
  for (var i = 0; i < 6; i++) {
    buttons_C3[i] = createButton(button_names_col3[i]);            // shape select button
    buttons_C3[i].position(1200, yloc + i * 25);
    buttons_C3[i].size(x_button_size, y_button_size);
    buttons_C3[i].mousePressed(button_funcs_col3[i]);
  }

  buttons_C3[5].style('background-color', col_on);


  let slider_U = [];
  let slider_U_start = [8, 1, 5, 0, 0, 0];
  let slider_U_range = [64, 240, 300, 15, 24, 10];
  let slider_U_defaults = [50, 50, 100, 4, 0, 1];
  let slider_U_step = [4, 1, 5, 1, 1, 1];
  for (var i = 0; i < 6; i++) {
    slider_U[i] = createSlider(slider_U_start[i], slider_U_range[i], slider_U_defaults[i], slider_U_step[i]);
    slider_U[i].position(xloc + 100, 0 + (yloc - 2) + 25 * i);
    slider_U[i].style('width', '120px');

    sliders_all[slider_keys[i + 4]] = slider_U[i];   // add to the object full of sliders
  }



  let button_names_col0 = ['0', '1', '2', '3', '4', '5'];
  let button_funcs_col0 = [tg0, tg1, tg2, tg3, tg4, tg5];
  for (var i = 0; i < 6; i++) {
    buttons_C0[i] = createButton(button_names_col0[i]);            // shape select button
    buttons_C0[i].position(675, yloc + i * 25);
    buttons_C0[i].size(40, 20);
    buttons_C0[i].mousePressed(button_funcs_col0[i]);
  }

  let button_names_col4 = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5'];
  let button_funcs_col4 = [s0, s1, s2, s3, s4, s5];
  for (var i = 0; i < 6; i++) {
    buttons_C4[i] = createButton(button_names_col4[i]);            // shape select button
    buttons_C4[i].position(400, yloc + i * 25);
    buttons_C4[i].size(40, 20);
    buttons_C4[i].mousePressed(button_funcs_col4[i]);
  }

  let button_names_col5 = ['S6', 'S7', 'S8', 'S9', 'S10', 'S11'];
  let button_funcs_col5 = [s6, s7, s8, s9, s10, s11];
  for (var i = 0; i < 6; i++) {
    buttons_C5[i] = createButton(button_names_col5[i]);            // shape select button
    buttons_C5[i].position(450, yloc + i * 25);
    buttons_C5[i].size(40, 20);
    buttons_C5[i].mousePressed(button_funcs_col5[i]);
  }

  let button_names_col6 = ['S12', 'S13', 'S14', 'S15', 'S16', 'S17'];
  let button_funcs_col6 = [s12, s13, s14, s15, s16, s17];
  for (var i = 0; i < 6; i++) {
    buttons_C6[i] = createButton(button_names_col6[i]);            // shape select button
    buttons_C6[i].position(500, yloc + i * 25);
    buttons_C6[i].size(40, 20);
    buttons_C6[i].mousePressed(button_funcs_col6[i]);
  }

  let button_names_col7 = ['S18', 'S19', 'S20', 'S21', 'S22', 'S23'];
  let button_funcs_col7 = [s18, s19, s20, s21, s22, s23];
  for (var i = 0; i < 6; i++) {
    buttons_C7[i] = createButton(button_names_col7[i]);            // shape select button
    buttons_C7[i].position(550, yloc + i * 25);
    buttons_C7[i].size(40, 20);
    buttons_C7[i].mousePressed(button_funcs_col7[i]);
  }




  button_fps = createButton('fps');            // shape select button
  button_fps.position(100, yloc + 100);
  button_fps.size(80, 20);
  button_fps.mousePressed(toggle_fps);


  button_save = createButton('sx');            // shape select button
  button_save.position(10, yloc + 130);
  button_save.size(40, 20);
  button_save.mousePressed(save_to_file);


  button_vd_bkgnd = createButton('bkg');            // shape select button
  button_vd_bkgnd.position(275, yloc + 130);
  button_vd_bkgnd.size(40, 20);
  button_vd_bkgnd.mousePressed(select_vd_bkgnd);


  /***************************** SHAPES GUI DONE *********************************/

  start = 10;
  end = 10;

  frameRate(30); // make frameRate 60 FPS

  loop_time = new avg_accum(30, fps_locx, fps_locy); // average accumulator every 30 frames

  // angleMode(DEGREES);
  imageMode(CENTER);
  textSize(15);



}

/********************************** SETUP DONE  *******************************************/
/******************************************************************************************/




/******************************************************************************************/
/********************************** DRAW **************************************************/

function draw() {


  // wait for async file load
  if (setup_opt < 24)
    if (setups_from_file) {
      load_setup_local(setups_from_file);
      setups_from_file = undefined;
      setup_opt = 100;
    }


  background(0);    // set the background to black

  if (control.px_bkg == 1)
    fill(40, 48, 80); // 60,60,60);
  else
    fill(0);
  rect(0, 0, Shapes_Canvas_Width, Shapes_Canvas_Height);    // set the background to black  



  // read all the sliders  this goes away with the final program
  for (var i = 0; i < slider_keys.length; i++)
    control[keys_main[i + 2]] = sliders_all[slider_keys[i]].value();

  // drawingContext.filter = (filter_on) ? 'blur(' + str(control.px_blr) + 'px)' : 'blur(0px)';

  // measure the loop time and send it to the console
  // alternative is to use frameRate()
  end = millis();
  let elapsed = end - start;
  start = millis();
  // console.log("This took: " + elapsed + "ms.")

  draw_labels();  // put all of the text up for the sliders temporary controls

  // change how many shapes there are horizintally  vertical is calculated based om 16x9
  if (control_last.px_res != control.px_res)
    Canvas_Class_1.change_num_of_shapes(control.px_res, int(((control.px_res * 9) / 16) + .5));


  if (control.px_bkg == 2)
    image(video_selected, Shapes_Canvas_Width / 2, Shapes_Canvas_Height / 2, Shapes_Canvas_Width, Shapes_Canvas_Height);  // put it in the lower corner

  Canvas_Class_1.update_shape_locations_and_colors();    // update all the shapes and their colors

  // display the updated canvas on the screen
  image(shapesCanvas, Shapes_Canvas_Width / 2, Shapes_Canvas_Height / 2);  // RENDER THE IMAGE to the screen!!!

  if (!choose_random_colors) // only display the tny video if vides are up vs random colors
  {
    image(video_selected, vid_locx, vid_locy, Small_Image_Out_H_Size, Small_Image_Out_V_Size);  // put it in the lower corner
    image(temp_video_canvas, vid_locx + 100, vid_locy, Small_Image_Out_H_Size, Small_Image_Out_V_Size);  // put it in the lower corner
  }



  loop_time.update(frameRate());  // average the frame rate over 30 frames using built in function 

  reset_shape_location = false;   // reset shape location to a grid is a momentary button
  reset_processing = false;       // reset processing is a momentary button
  choose_random_colors_last = choose_random_colors;  // random colors only happens once when it's changed

  fps_30_selected_last = fps_30_selected;

  control_last.px_res = control.px_res;
  control_last.px_spd = control.px_spd;




  rst_opt = 100;
  setup_opt = 100;

  // text(setup_opt , 300, 850);

}

/********************************** DRAW **************************************************/
/******************************************************************************************/







/***************************************************************/
/********* BUTTON AND SLIDER FUNCTIONS *************************/

function change_shape() {                   //select the shape of the pixels
  control.px_shp++;                         // square circle triangle up down right left
  if (control.px_shp >= 9)
    control.px_shp = 0;

}

function toggle_filter() {                  // blur on / off
  filter_on = !filter_on;
  col = col_off;
  if (filter_on)
    col = col_on;
  buttons_C3[2].style('background-color', col);
}

function toggle_time_filter() {             // time blur on / off
  time_filter_on = !time_filter_on;
  col = col_off;
  if (time_filter_on)
    col = col_on;
  buttons_C3[3].style('background-color', col);
}


function toggle_reset_speed() {    // put the shapes back to a grid setup
  sliders_all.px_spd.value(20);
}

function toggle_stroke_enable() {    // put the shapes back to a grid setup
  stroke_enable = !stroke_enable;
  col = col_off;
  if (stroke_enable)
    col = col_on;
  buttons_C3[5].style('background-color', col);
}


function toggle_reset_shape_location() {    // put the shapes back to a grid setup
  reset_shape_location = true;
}

function toggle_pause_shapes() {            // pause the shapes movements                     
  control.px_pse = !control.px_pse;
  col = col_off;
  if (control.px_pse)
    col = col_on;
  buttons_C2[1].style('background-color', col);
}

function toggle_wrap() {            // pause the shapes movements                     
  control.px_wrp = !control.px_wrp;
  col = col_off;
  if (control.px_wrp)
    col = col_on;
  buttons_C2[3].style('background-color', col);
}

function toggle_shuffle() {            // pause the shapes movements                     
  control.px_shf = !control.px_shf;
  col = col_off;
  if (control.px_shf)
    col = col_on;
  buttons_C2[4].style('background-color', col);
}

function toggle_polar() {            // pause the shapes movements                     
  control.px_pol = !control.px_pol;
  col = col_off;
  if (control.px_pol)
    col = col_on;
  buttons_C2[2].style('background-color', col);
}



function toggle_enable_process() {       // bypass the color processing
  enable_process = !enable_process;
  col = col_off;
  if (enable_process)
    col = col_on;
  buttons_C1[0].style('background-color', col);
}//

function toggle_reset_processing() {        // reset the color processing to defaults
  reset_processing = true;
}

function toggle_zoom() {        // reset the color processing to defaults
  enable_zoom = !enable_zoom;
}

function toggle_rotate() {        // reset the color processing to defaults
  enable_rotate = !enable_rotate;
}


function toggle_pause_video() {             // pause or play the current video
  control.vd_pse = !control.vd_pse;
  col = col_off;
  if (control.vd_pse) {
    video_selected.pause();
    col = col_on;
  }
  else video_selected.loop();
  buttons_C1[2].style('background-color', col);
}

function toggle_stroke_adapt() {            // change the stroke options
  control.sk_opt++;
  if (control.sk_opt >= 5)
    control.sk_opt = 0;

}

function toggle_fps() {            // change the stroke options
  fps_30_selected = !fps_30_selected;
  if (fps_30_selected)
    frameRate(30);
  else
    frameRate(60);
}


function select_vd_bkgnd() {            // change the stroke options
  control.px_bkg++;
  if (control.px_bkg > 2)
    control.px_bkg = 0;
}




function tg0() {
  rst_opt = 0;
}
function tg1() {
  rst_opt = 1;
}
function tg2() {
  rst_opt = 2;
}
function tg3() {
  rst_opt = 3;
}
function tg4() {
  rst_opt = 4;
}
function tg5() {
  rst_opt = 5;
}

function s0() {
  setup_opt = 0;
  load_setups_file("setups/su0.json");
  // load_setup_local(setups[0]);
}
function s1() {
  setup_opt = 1;
  load_setups_file("setups/su1.json");
  // load_setup_local(setups[1]);
}
function s2() {
  setup_opt = 2;
  load_setups_file("setups/su2.json");
  // load_setup_local(setups[2]);
}
function s3() {
  setup_opt = 3;
  load_setups_file("setups/su3.json");
  // load_setup_local(setups[0]);
  // load_setup_local(setups[3]);
}
function s4() {
  setup_opt = 4;
  load_setups_file("setups/su4.json");
}
function s5() {
  setup_opt = 5;
  load_setups_file("setups/su5.json");
}


function s6() {
  setup_opt = 6;
  load_setups_file("setups/su6.json");
}
function s7() {
  setup_opt = 7;
  load_setups_file("setups/su7.json");
}
function s8() {
  setup_opt = 8;
  load_setups_file("setups/su8.json");
}
function s9() {
  setup_opt = 9;
  load_setups_file("setups/su9.json");
}
function s10() {
  setup_opt = 10;
  load_setups_file("setups/su10.json");
}
function s11() {
  setup_opt = 11;
  load_setups_file("setups/su11.json");
}


function s12() {
  setup_opt = 12;
  load_setups_file("setups/su12.json");
}
function s13() {
  setup_opt = 13;
  load_setups_file("setups/su13.json");
}
function s14() {
  setup_opt = 14;
  load_setups_file("setups/su14.json");
}
function s15() {
  setup_opt = 15;
  load_setups_file("setups/su15.json");
}
function s16() {
  setup_opt = 16;
  load_setups_file("setups/su16.json");
}
function s17() {
  setup_opt = 17;
  load_setups_file("setups/su17.json");
}

function s18() {
  setup_opt = 18;
  load_setups_file("setups/su18.json");
}
function s19() {
  setup_opt = 19;
  load_setups_file("setups/su19.json");
}
function s20() {
  setup_opt = 20;
  load_setups_file("setups/su20.json");
}
function s21() {
  setup_opt = 21;
  load_setups_file("setups/su21.json");
}
function s22() {
  setup_opt = 22;
  load_setups_file("setups/su22.json");
}
function s23() {
  setup_opt = 23;
  load_setups_file("setups/su23.json");
}





function save_to_file() {
  save(control, "xxxZ.json");

}





function dummy() {            // change the stroke options
}




function load_setup_local(setup_in) {   // video selector
  let in_keys = Object.keys(setup_in);
  for (var i = 0; i < in_keys.length; i++) {
    control[in_keys[i]] = setup_in[in_keys[i]];
    // sliders are 2 - 11]
    if (in_keys[i] in sliders_all)
      sliders_all[in_keys[i]].value(control[in_keys[i]]);
  }
  change_video(control.vd_sel);
  rst_opt = control.px_rst;
  if (control.px_ftc > 0)
    time_filter_on = true;
  if (control.sk_sze > 0)
    stroke_enable = true;
}



function load_setups_file(filename_in) {   // video selector
  loadJSON(filename_in, getJSONdata);
}


function getJSONdata(data_in) {
  setups_from_file = data_in;
}




function change_video(sel_in = 7) {   // video selector

  if (sel_in < 7)
    control.vd_sel = sel_in;
  else {
    control.vd_sel++;
    if (control.vd_sel >= Num_Of_Videos)  // Num_Of_Videos i
      control.vd_sel = 0;
  }

  for (var i = 0; i < video_names.length; i++)
    videos[i].pause();

  if (control.vd_sel == 0)
    choose_random_colors = true;
  else {
    choose_random_colors = false;
    videos[control.vd_sel - 1].loop();
    // videos[control.vd_sel - 1].speed(1);
    video_selected = videos[control.vd_sel - 1];
  }
}


function draw_labels() {
  // put all of the text up for the sliders temporary controls
  fill(255);

  text(
    "shape res  " + control.px_res,
    sliders_all[slider_keys[4]].x + 130,
    sliders_all[slider_keys[4]].y + 14
  );
  text(
    "shape size " + control.px_sze,
    sliders_all[slider_keys[5]].x + 130,
    sliders_all[slider_keys[5]].y + 14
  );
  text(
    "shape speed " + control.px_spd,
    sliders_all[slider_keys[6]].x + 130,
    sliders_all[slider_keys[6]].y + 14
  );

  text(
    "time filt " + control.px_ftc,
    sliders_all[slider_keys[7]].x + 130,
    sliders_all[slider_keys[7]].y + 14
  );

  text(
    "filter   " + control.px_blr,
    sliders_all[slider_keys[8]].x + 130,
    sliders_all[slider_keys[8]].y + 14
  );

  text(
    "stroke  " + control.sk_sze,
    sliders_all[slider_keys[9]].x + 130,
    sliders_all[slider_keys[9]].y + 14
  );


  text(
    "black    " + control.px_blk,
    sliders_all[slider_keys[0]].x - 80,
    sliders_all[slider_keys[0]].y + 14
  );
  text(
    "gamma    " + control.px_gam,
    sliders_all[slider_keys[1]].x - 80,
    sliders_all[slider_keys[1]].y + 14
  );
  text(
    "gain     " + control.px_gnx,
    sliders_all[slider_keys[2]].x - 80,
    sliders_all[slider_keys[2]].y + 14
  );
  text(
    "col gain " + control.px_cnx,
    sliders_all[slider_keys[3]].x - 80,
    sliders_all[slider_keys[3]].y + 14
  );

  text(
    "reset\noptions",
    615,
    850
  );

  text(
    "setups",
    330,
    850
  );

}


function saveAsJSON() {
  let exampleObj = [
    {
      name: "Samuel",
      age: 23,
    },
    {
      name: "Axel",
      age: 15,
    },
  ];
  save(exampleObj, "output_text.json");
}



/********* BUTTON AND SLIDER FUNCTIONS DONE ********************/
/***************************************************************/



/************************** OTHER FUNCTIONS ********************/
/***************************************************************/

// use this until I use the artblocks class
function randomX(first, second) {
  return random(first, second);
}



/******************************************************************/
/****************************** CLASSES   *************************/

class Shaped_Pixel {
  constructor(shapesCanvas_in, num_in, x, y, xSpeed, ySpeed, rPolarSpeed, aPolarSpeed, R, G, B) { //, diam) {
    this.shapesCanvas_local = shapesCanvas_in;
    this.num = num_in;
    this.initialx = x;      // initial x location for reset and shuffle mode (not used yet except for reset)
    this.initialy = y;      // initial y location for reset and shuffle mode (not used yet except for reset)
    this.x = x;             // x location
    this.y = y;             // y location

    this.shape = 0;
    this.angle = PI / 3;
    this.angle_delta = 0;


    this.xSpeed = xSpeed;   // x speed
    this.ySpeed = ySpeed;   // y speed

    this.acceleration = 0;


    this.rPolarSpeed = rPolarSpeed;   // x speed
    this.aPolarSpeed = aPolarSpeed;   // y speed    
    this.R = R;              // red 
    this.G = G;              // green 
    this.B = B;              // blue 

    this.rgbx = [R, G, B];  // create an red green blue single pixel array

    this.R_Accum = 0;
    this.G_Accum = 0;
    this.B_Accum = 0;



    let num_of_shape_types = 10;
    this.vertices = [];

    this.vertices[0] = [-.5, -.5, .5, -.5, .5, .5, -.5, .5]; // square
    this.vertices[1] = [0, 0];
    this.vertices[2] = [0, .6, .6, 0, 0, -.6, -.6, 0]; // diamond
    this.vertices[3] = [.6, 0, 0, -.6, -.6, 0];
    this.vertices[4] = [0, .6, .6, 0, -.6, 0];
    this.vertices[5] = [0, .6, 0, -.6, -.6, 0];
    this.vertices[6] = [0, .6, .6, 0, 0, -.6,];
    //  vertices[7] = [-.5, -.5, .5, -.5, .5, .5, -.5, .5]; // square   
    this.vertices[7] = [-.75, -.5, .75, -.5, .75, .5, -.75, .5]; // rectangle     
    // vertices[8] = [-.5 + randomX(-.1,.1), -.5+ randomX(-.1,.1), .5+ randomX(-.1,.1), -.5+ randomX(-.1,.1), .5+ randomX(-.1,.1), .5+ randomX(-.1,.1), -.5+ randomX(-.1,.1), .5+ randomX(-.1,.1)];       // rectangle       




    // vector more efficient use of code but cant get working  (not necessarily faster)
    // this.rgb = createVector(0, 0, 0);  // vector processing for simplifing code
    // this.rgb[0] = this.R;
    // this.rgb[1] = this.G;
    // this.rgb[2] = this.B;

    // FOR TIME FILTER
    // this.R_RC = 0;
    // this.G_RC = 0;
    // this.B_RC = 0;

    // this.R_store = [0, 0, 0, 0, 0];
    // this.G_store = [0, 0, 0, 0, 0];
    // this.B_store = [0, 0, 0, 0, 0];

    // this.fifo_pointer = 0;
    // this.fifo_pointer_1 = 0;
    // this.fifo_pointer_2 = 0;
    // this.fifo_pointer_3 = 0;    
  }


  move(wrap_in = 0) { // move the Shaped_Pixel locations

    if (control.px_pol) {
      this.xSpeed = this.rPolarSpeed * cos(this.aPolarSpeed);
      this.ySpeed = this.rPolarSpeed * sin(this.aPolarSpeed);
    }

    this.x += this.xSpeed; // increment the x location with the x speed value
    this.y += this.ySpeed;  // increment the y location with the y speed value
    // if (this.x <= 0 || this.x >= (Shapes_Canvas_Width)) { // bounce back if at edge
    //   this.xSpeed *= -1;

    //   this.aPolarSpeed = 3.14159 - this.aPolarSpeed ;
    //   this.x += this.xSpeed

    // }

    if (this.x <= 0) { // bounce back if at edge
      this.xSpeed *= -1;
      this.aPolarSpeed = 3.14159 - this.aPolarSpeed;
      this.x += this.xSpeed
    }
    else if (this.x >= (Shapes_Canvas_Width)) { // bounce back if at edge
      this.xSpeed *= -1;
      this.aPolarSpeed = 3.14159 - this.aPolarSpeed;
      this.x = (wrap_in == 0) ? this.x += this.xSpeed : 0; // wrap_in // this.x += this.xSpeed
    }


    if (this.y <= 0 || this.y >= Shapes_Canvas_Height - 5) { // bounce back if at edge
      this.ySpeed *= -1;

      this.aPolarSpeed = 2 * 3.14159 - this.aPolarSpeed;
      this.y += this.ySpeed;
    }
  }

  // if (i % 2 == 0) {
  //   this.shapedPixelsLocal[i].reset_location(1, 100, 400);   // shapedPixel class function
  //   // this.shapedPixelsLocal[i].xSpeed = randomX(-control.px_spd, control.px_spd) / 100;   
  //   // this.shapedPixelsLocal[i].ySpeed = randomX(-control.px_spd, control.px_spd) / 100;  
  // }
  // else {
  //   this.shapedPixelsLocal[i].reset_location(1, 100, 400);   // shapedPixel class function     
  //   // this.shapedPixelsLocal[i].xSpeed = randomX(-control.px_spd, control.px_spd) / 100;
  //   // this.shapedPixelsLocal[i].ySpeed = randomX(-control.px_spd, control.px_spd) / 100;
  // }

  reset_location() {

    if ((rst_opt >= 6) || rst_opt == 0) {
      this.x = this.initialx;
      this.y = this.initialy;  // 150; //
    }
    else if (rst_opt == 1) {
      this.x = 100;
      this.y = this.initialy;  // 150; //
    }
    else if (rst_opt == 2) {
      this.x = 100;
      this.y = 100;  // 150; //
    }
    else if (rst_opt == 3) {
      this.x = 700;
      this.y = 400;  // 150; //
    }
    else if (rst_opt == 4) {
      this.x = this.num % 2 == 0 ? 300 : 1100;
      this.y = 400;  // 150; //
    }

  }


  // process the image 
  process(black, gamma, gain, c_gain, RC) {
    for (var i = 0; i < 3; i++) {
      // first subtract the black value
      this.rgbx[i] = this.rgbx[i] - black;
      // gamma gain  fade between straight video and video squared  range 0-16
      this.rgbx[i] = (((this.rgbx[i] * this.rgbx[i]) / 256) * gamma + this.rgbx[i] * (16 - gamma)) / 16;
      // main gain range 0-32 with 16 as straight gain
      this.rgbx[i] = (this.rgbx[i] * gain) / 16;
    }

    // calculate luminance (B&W value) for doing the chroma gain range 0-32 with 16 as straight gain    
    let lum = .299 * this.rgbx[0] + .587 * this.rgbx[1] + .114 * this.rgbx[2];

    // // DOES NOT WORK AT 0 chroma ?????
    // // separate colors R-Y G-Y B-Y and multiply and add it back to Y
    for (var i = 0; i < 3; i++)
      this.rgbx[i] = (((this.rgbx[i] - lum) * c_gain) / 16) + lum;

    this.R_Accum = (control.px_ftc * this.R_Accum + (16 - control.px_ftc) * this.rgbx[0]) / 16;
    this.G_Accum = (control.px_ftc * this.G_Accum + (16 - control.px_ftc) * this.rgbx[1]) / 16;
    this.B_Accum = (control.px_ftc * this.B_Accum + (16 - control.px_ftc) * this.rgbx[2]) / 16;

    if (time_filter_on) {
      this.rgbx[0] = this.R_Accum;
      this.rgbx[1] = this.G_Accum;
      this.rgbx[2] = this.B_Accum;
    }
  }





  change_shape_local(shape_in, range_in) {
    if (this.shape != shape_in) {
      this.shape = shape_in;
      if (shape_in == 8)
        this.vertices[8] = [
          -.5 + randomX(-range_in, range_in), -.5 + randomX(-range_in, range_in),
          .5 + randomX(-range_in, range_in), -.5 + randomX(-range_in, range_in),
          .5 + randomX(-range_in, range_in), .5 + randomX(-range_in, range_in),
          -.5 + randomX(-range_in, range_in), .5 + randomX(-range_in, range_in)];
    }
  }







  display() {

    /**************************************************************************************/
    /*********************************** stroke *******************************************/

    // Use fill() function to fill color either random or video values
    this.shapesCanvas_local.fill(this.rgbx[0], this.rgbx[1], this.rgbx[2], 255);

    // stroke options so far
    if (!stroke_enable)
      this.shapesCanvas_local.noStroke();

    else if (control.sk_opt == 1) {
      this.shapesCanvas_local.stroke(this.rgbx[0] + 15, this.rgbx[1] + 15, this.rgbx[2] + 15);
      this.shapesCanvas_local.strokeWeight(control.sk_sze);  // stroke weight of 2
    }
    else if (control.sk_opt == 2) {
      this.shapesCanvas_local.stroke(this.rgbx[0] * 1.1, this.rgbx[1] * 1.1, this.rgbx[2] * 1.1);
      this.shapesCanvas_local.strokeWeight(control.sk_sze);  // stroke weight of 2
    }
    else if (control.sk_opt == 3) {
      this.shapesCanvas_local.stroke(this.rgbx[0] * 2, this.rgbx[1] * 2, this.rgbx[2] * 2);
      this.shapesCanvas_local.strokeWeight(control.sk_sze);  // stroke weight of 2
    }
    else if (control.sk_opt == 4) {
      this.shapesCanvas_local.stroke(this.rgbx[0] * .9, this.rgbx[1] * .9, this.rgbx[2] * .9);
      this.shapesCanvas_local.strokeWeight(control.sk_sze);  // stroke weight of 2
    }
    else { // default stroke
      this.shapesCanvas_local.stroke(0);        // stroke is black
      this.shapesCanvas_local.strokeWeight(control.sk_sze);  // stroke weight of 1
    }


    /**************************************************************************************/
    /*********************************** shapes *******************************************/

    /**************************************************************************************/
    // wrote my own rotation in on the p5js website  It might be faster than the transform shift
    // the stroke is the bottleneck
    /**************************************************************************************/

    // if (enable_rotate)
    //   this.angle = PI / 6;
    // else
    //   this.angle = 0;


    if (this.shape == 1) // Draw a CIRCLE
      this.shapesCanvas_local.circle(this.x, this.y, this.size);

    // if (this.shape == 1)  // Draw a SQUARE
    //   this.shapesCanvas_local.square(this.x - this.size / 2, this.y - this.size / 2, this.size);

    else if (this.vertices[this.shape].length == 6) // Draw a triangle
    {
      if (enable_rotate) {
        this.shapesCanvas_local.translate(this.x, this.y);
        this.shapesCanvas_local.rotate(this.angle);
        this.shapesCanvas_local.triangle(
          this.vertices[this.shape][0] * this.size, this.vertices[this.shape][1] * this.size,
          this.vertices[this.shape][2] * this.size, this.vertices[this.shape][3] * this.size,
          this.vertices[this.shape][4] * this.size, this.vertices[this.shape][5] * this.size);
        this.shapesCanvas_local.rotate(-this.angle);
        this.shapesCanvas_local.translate(-this.x, -this.y);
      }
      else
        this.shapesCanvas_local.triangle(
          this.x + this.vertices[this.shape][0] * this.size, this.y + this.vertices[this.shape][1] * this.size,
          this.x + this.vertices[this.shape][2] * this.size, this.y + this.vertices[this.shape][3] * this.size,
          this.x + this.vertices[this.shape][4] * this.size, this.y + this.vertices[this.shape][5] * this.size);
    }

    else if (this.vertices[this.shape].length == 8) // Draw a triangle
    {
      if (enable_rotate) {
        this.shapesCanvas_local.translate(this.x, this.y);
        this.shapesCanvas_local.rotate(this.angle);
        this.shapesCanvas_local.quad(
          this.vertices[this.shape][0] * this.size, this.vertices[this.shape][1] * this.size,
          this.vertices[this.shape][2] * this.size, this.vertices[this.shape][3] * this.size,
          this.vertices[this.shape][4] * this.size, this.vertices[this.shape][5] * this.size,
          this.vertices[this.shape][6] * this.size, this.vertices[this.shape][7] * this.size);
        this.shapesCanvas_local.rotate(-this.angle);
        this.shapesCanvas_local.translate(-this.x, -this.y);
      }
      else
        this.shapesCanvas_local.quad(
          this.x + this.vertices[this.shape][0] * this.size, this.y + this.vertices[this.shape][1] * this.size,
          this.x + this.vertices[this.shape][2] * this.size, this.y + this.vertices[this.shape][3] * this.size,
          this.x + this.vertices[this.shape][4] * this.size, this.y + this.vertices[this.shape][5] * this.size,
          this.x + this.vertices[this.shape][6] * this.size, this.y + this.vertices[this.shape][7] * this.size);
    }

    // this.angle += .01;

  }


}




class Shaped_Pixel_Canvas {
  constructor(
    x_canvas_resolution_in,
    y_canvas_resolution_in,
    initial_x_shapes_resolution,
    initial_y_shapes_resolution,
    initial_shape,
    initial_shape_size,
    initial_video) {

    shapesCanvas = createGraphics(x_canvas_resolution_in, y_canvas_resolution_in);

    temp_video_canvas = createGraphics(Image_In_H_Size, Image_In_V_Size);

    this.x_canvas_resolution = x_canvas_resolution_in;
    this.y_canvas_resolution = y_canvas_resolution_in;
    this.x_shapes_resolution = initial_x_shapes_resolution;
    this.y_shapes_resolution = initial_y_shapes_resolution;
    this.shape = initial_shape;
    this.size = initial_shape_size;
    this.video_num = initial_video;
    this.num_of_shape_pixels = initial_x_shapes_resolution * initial_y_shapes_resolution;

    this.shapedPixelsLocal = [];

    let x_mul = this.x_canvas_resolution / this.x_shapes_resolution; // x distance between subsamples
    let y_mul = this.y_canvas_resolution / this.y_shapes_resolution;  // y distance between subsamples
    let sample_x = 0;
    let sample_y = 0;

    this.mul = 1;


    for (let i = 0; i < this.num_of_shape_pixels; i++) {
      // for (let i = this.num_of_shape_pixels - 1; i >= 0; i--) {
      //POPULATING bigPixelArray shapes w/random drift & color
      this.shapedPixelsLocal[i] = new Shaped_Pixel(
        shapesCanvas,
        i,  // shapedPixel number in array of shapedPixels
        sample_x * x_mul + x_mul / 2, // x position
        sample_y * y_mul + y_mul / 2, // y position
        randomX(-100, 100) / 100, // xSpeed
        randomX(-100, 100) / 100, // ySpeed

        randomX(50) / 100, // polar speed
        randomX(0, 314159) / 50000, // polar angle 0 = 2pi


        randomX(0, 255), // R
        randomX(0, 255), // G
        randomX(0, 255) // B
      );

      sample_x++;
      if (sample_x >= this.x_shapes_resolution) {
        sample_x = 0; // when x finishes reset x
        sample_y++;   //  and increment y
      }
    }
  } // constructor end



  change_num_of_shapes(x_resolution_in, y_resolution_in) {
    this.x_shapes_resolution = x_resolution_in;
    this.y_shapes_resolution = y_resolution_in;
    this.num_of_shape_pixels = x_resolution_in * y_resolution_in;

    let x_mul = this.x_canvas_resolution / this.x_shapes_resolution; // x distance between subsamples
    let y_mul = this.y_canvas_resolution / this.y_shapes_resolution;  // y distance between subsamples
    let sample_x = 0;
    let sample_y = 0;
    print(this.num_of_shape_pixels);
    this.shapedPixelsLocal.length = this.num_of_shape_pixels;


    for (let i = 0; i < this.num_of_shape_pixels; i++) {
      //POPULATING bigPixelArray shapes w/random drift & color
      this.shapedPixelsLocal[i] = new Shaped_Pixel(
        shapesCanvas,
        i,  // shapedPixel number in array of shapedPixels
        sample_x * x_mul + x_mul / 2, // x position
        sample_y * y_mul + y_mul / 2, // y position
        randomX(-control.px_spd, control.px_spd) / 100,
        randomX(-control.px_spd, control.px_spd) / 100,

        randomX(control.px_spd) / 100, // polar speed
        randomX(0, 314159) / 50000, // polar angle 0 = 2pi

        randomX(0, 255), // R
        randomX(0, 255), // G
        randomX(0, 255) // B
      );

      sample_x++;
      if (sample_x >= this.x_shapes_resolution) {
        sample_x = 0; // when x finishes reset x
        sample_y++;   //  and increment y
      }
    }
  }



  update_shape_locations_and_colors() {



    video_selected.loadPixels();  // load all pixels from video



//    if (enable_zoom) {
      temp_video_canvas.image(video_selected, 0,0, 320*2, 180*2); //  (320-320*mulll)/2, (180-180*mulll)/2, 320*mul, 180*mulll);
      temp_video_canvas.loadPixels();
//    }
    



    shapesCanvas.clear();

    let x_index, y_index;
    let x_scale = Image_In_H_Size / this.x_canvas_resolution;
    let y_scale = Image_In_V_Size / this.y_canvas_resolution;

    for (let i = 0; i < this.shapedPixelsLocal.length; i++) {
      // method to subsample the image
      // according to shapedPixel dimensions

      this.shapedPixelsLocal[i].change_shape_local(control.px_shp, .4);


      if (reset_shape_location || (rst_opt < 6)) {
        this.shapedPixelsLocal[i].reset_location();
      }
      else if (!control.px_pse) {
        this.shapedPixelsLocal[i].move(control.px_wrp);
      }


      if ((reset_shape_location || (rst_opt < 6)) || (control_last.px_spd != control.px_spd)) {
        this.shapedPixelsLocal[i].xSpeed = randomX(-control.px_spd, control.px_spd) / 100;
        this.shapedPixelsLocal[i].ySpeed = randomX(-control.px_spd, control.px_spd) / 100;
        this.shapedPixelsLocal[i].rPolarSpeed = randomX(control.px_spd) / 100; // polar speed
        this.shapedPixelsLocal[i].aPolarSpeed = randomX(0, 314159) / 50000; // polar angle 0 = 2pi
      }


      if (control.px_shf) {
        x_index = int(this.shapedPixelsLocal[i].initialx * x_scale); // x sub sample points in large image array
        y_index = Image_In_H_Size * int(this.shapedPixelsLocal[i].initialy * y_scale);// y sub sample points in large image array
      }
      else {
        x_index = int(this.shapedPixelsLocal[i].x * x_scale); // x sub sample points in large image array
        y_index = Image_In_H_Size * int(this.shapedPixelsLocal[i].y * y_scale); // y sub sample points in large image array
      }

      

      let index = 4 * (x_index + y_index);  // multiply by 4 for RGBA (alpha)

      if (!choose_random_colors_last & choose_random_colors) {
        // generate new random colors array only once when first selected
        this.shapedPixelsLocal[i].rgbx[0] = randomX(0, 255);  // red
        this.shapedPixelsLocal[i].rgbx[1] = randomX(0, 255);  // green
        this.shapedPixelsLocal[i].rgbx[2] = randomX(0, 255);  // blue
      }
      else if (!choose_random_colors_last & !choose_random_colors) {
        // sub sample the large image array  only rgb  ignore alpha

        if (enable_zoom) {
          this.shapedPixelsLocal[i].rgbx[0] = temp_video_canvas.pixels[index];     // red
          this.shapedPixelsLocal[i].rgbx[1] = temp_video_canvas.pixels[index + 1]; // green 
          this.shapedPixelsLocal[i].rgbx[2] = temp_video_canvas.pixels[index + 2]; // blue
        }
        else {
          this.shapedPixelsLocal[i].rgbx[0] = video_selected.pixels[index];     // red
          this.shapedPixelsLocal[i].rgbx[1] = video_selected.pixels[index + 1]; // green 
          this.shapedPixelsLocal[i].rgbx[2] = video_selected.pixels[index + 2]; // blue 
        }



        if (reset_processing) {   // reset the color processing functions
          sliders_all[slider_keys[0]].value(0);
          sliders_all[slider_keys[1]].value(0);
          sliders_all[slider_keys[2]].value(16);
          sliders_all[slider_keys[3]].value(16);
        }
        if (enable_process)  // enable the color processing functions else bypass processing
          this.shapedPixelsLocal[i].process(
            control.px_blk,
            control.px_gam,
            control.px_gnx,
            control.px_cnx,
            control.px_ftc
          );
      }

      if (this.shapedPixelsLocal[i].size != control.px_sze) {
        // change shape size if different than what it was
        this.shapedPixelsLocal[i].size = control.px_sze;
      }

      this.shapedPixelsLocal[i].display();  // draw the shapes onto the canvas
    }

    // draw cross hairs for calibration
    if (cross_hairs_on) {
      shapesCanvas.fill(255);
      shapesCanvas.rect(Shapes_Canvas_Width / 2 - 1, 0, 2, Shapes_Canvas_Height);
      shapesCanvas.rect(0, Shapes_Canvas_Height / 2 - 1, Shapes_Canvas_Width, 2);
    }

  }

}







// class Random {
//   constructor() {
//     this.useA = false;
//     let sfc32 = function (uint128Hex) {
//       let a = parseInt(uint128Hex.substr(0, 8), 16);
//       let b = parseInt(uint128Hex.substr(8, 8), 16);
//       let c = parseInt(uint128Hex.substr(16, 8), 16);
//       let d = parseInt(uint128Hex.substr(24, 8), 16);
//       return function () {
//         a |= 0; b |= 0; c |= 0; d |= 0;
//         let t = (((a + b) | 0) + d) | 0;
//         d = (d + 1) | 0;
//         a = b ^ (b >>> 9);
//         b = (c + (c << 3)) | 0;
//         c = (c << 21) | (c >>> 11);
//         c = (c + t) | 0;
//         return (t >>> 0) / 4294967296;
//       };
//     };
//     // seed prngA with first half of tokenData.hash
//     this.prngA = new sfc32(tokenData.hash.substr(2, 32));
//     // seed prngB with second half of tokenData.hash
//     this.prngB = new sfc32(tokenData.hash.substr(34, 32));
//     for (let i = 0; i < 1e6; i += 2) {
//       this.prngA();
//       this.prngB();
//     }
//   }
//   // random number between 0 (inclusive) and 1 (exclusive)
//   random_dec() {
//     this.useA = !this.useA;
//     return this.useA ? this.prngA() : this.prngB();
//   }
//   // random number between a (inclusive) and b (exclusive)
//   random_num(a, b) {
//     return a + (b - a) * this.random_dec();
//   }
//   // random integer between a (inclusive) and b (inclusive)
//   // requires a < b for proper probability distribution
//   random_int(a, b) {
//     return Math.floor(this.random_num(a, b + 1));
//   }
//   // random boolean with p as percent liklihood of true
//   random_bool(p) {
//     return this.random_dec() < p;
//   }
//   // random value in an array of items
//   random_choice(list) {
//     return list[this.random_int(0, list.length - 1)];
//   }
// }



// general averager of a sequence of numbers over time n time samples
class avg_accum {
  constructor(nums_per_average, xloc, yloc) {
    // number of samples per average and where to print it
    this.nums_per_average = nums_per_average;
    this.xloc = xloc;         // x location for printing the .average
    this.yloc = yloc;         // y location for printing the .average
    this.local_accum = 0.0;   // accumulator for summing all the input numbers
    this.local_count = 0;     // counter for keeping track of how many samples
    this.local_avg = 0.0;     // calculated average updated every nums_per_average samples
  }

  update(input_num) {
    this.local_count++;  // count to the number of samples requested
    this.local_accum += input_num;  // update the accumulator with the new value
    if (this.local_count == this.nums_per_average - 1) {  // if counter has reached the number of samples  
      this.local_avg = this.local_accum / this.nums_per_average;  // caculate the average
      this.local_accum = input_num;   // start the new accumulator with the first value
      this.local_count = 0;           // reset the counter
    }
    fill(255);
    // put on the screen the average
    text("FPS " + str(this.local_avg.toFixed(1)) + ' / ' + str(fps_30_selected ? 30 : 60), this.xloc, this.yloc);
  }

}

/****************************** CLASSES   *************************/
/******************************************************************/
