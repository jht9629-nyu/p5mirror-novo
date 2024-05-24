// Big_pixel flock v10b with verbose annotations
//https://editor.p5js.org/novo/sketches/e-aIfDd54

// changes to code are indicated by comments with a bunch of > as in:
// comment about code change >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// changed array and class names:
// from pixel_masks to bigPixelArray
// from pixel_mask to to Big_pixel (Capitals for Class names)
// trying to distinguish between video pixels and Big_pixels on Canvas
// also capitalized Avg_accum 

//let mask_total, vid, submask, submask_temp;
// let image_Clone;
// variables from previous flashlight version

let squaresCanvas, mainCanvas;

let start;
let end;
let frame_counter;

let Main_Width;
let Main_Height;
let Image_In_H_Size;
let Image_In_V_Size;

let choose_random; // boolean: random or !random means video
let choose_random_last;
// boolean to enable calling video.loop just once in draw
// theoretically should not be needed if video.loop is in setup

let filter_on;
let slider_filter;
let circle_square;
let slider_diameter;
let reset_on;
let pause_on;
let bypass;
let reset_proc;
let pause_video;
let slider_time_const; // equivalent to ease ?

let bigPixelArray = []; // a better name than pixel_masks :) ???
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
function preload() {
  // test_img = loadImage('new_test2.jpg');
  test_img = createVideo("swimF.mp4");
}

/******************************************************************/
/****************************** SETUP *****************************/

function setup() {
  // if (pause_video)
  //   test_img.pause();
  // else

  test_img.loop(); // moved from draw >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  test_img.hide();

  Main_Height = 788; // square area 1400 x 788 is 16x9
  Main_Width = 1400;
  Image_In_H_Size = 320; // video input image inside canvas
  Image_In_V_Size = 180; //
  Canvas_Height = 900; // bigger 16x9 canvas to fit video image, sliders and buttons
  Canvas_Width = 1600;

  Pixels_Horizontal = 16;
  Pixels_Vertical = 9;
  Pixels_Total = Pixels_Horizontal * Pixels_Vertical; // 151 squares

  mainCanvas = createCanvas(Canvas_Width, Canvas_Height);
  squaresCanvas = createGraphics(Main_Width, Main_Height);
  mask_total = createGraphics(Main_Width, Main_Height);

  let x_mul; // mul = multiplier = increment
  let y_mul;
  x_mul = Main_Width / Pixels_Horizontal; // square width is 87.5 pixels
  y_mul = Main_Height / Pixels_Vertical;

  xx = 0;
  yy = 0;
  
  for (let i = 0; i < Pixels_Total; i++) {
    //POPULATING bigPixelArray shapes w/random drift & color
    bigPixelArray[i] = new Big_pixel(
      //constructor(num, x, y, xSpeed, ySpeed, R, G, B)
      // changed class name from pixel_mask >>>>>>>>>>>>>>>>>>>>>>>>>

      (num = i), // does the pixel need to know its index position?
      xx * x_mul + x_mul / 2, // x position spans 1.5x square
      yy * y_mul + y_mul / 2, // y position
      random(-10, 10) / 100, // xSpeed
      random(-10, 10) / 100, // ySpeed
      random(255), // R
      random(255), // G
      random(255)
    ); // B

    bigPixelArray[i].diam = 45; //size_ square side or circle diameter

    xx++;
    if (xx >= Pixels_Horizontal) {
      // if square past edge go to next line
      xx = 0;
      yy++;
    }
  }

  /********************* SHAPES GUI ********************/

  // GUI Locations
  xloc = Main_Width - 200; // GUI rectangle area offset variable for position of all the gui
  yloc = Main_Height + 25;

  fps_locx = xloc - 600;
  fps_locy = Main_Height + 100;

  vid_locx = fps_locx + 40;
  vid_locy = Main_Height + 50;

  // choose_random = false; // commented out to start with video >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // should all this be in a loop?
  choose_random_last = true;
  button_random = createButton("rand col");
  button_random.position(xloc, yloc);
  button_random.mousePressed(toggle_random);

  filter_on = false;
  button_filter = createButton("filt on/off"); // blur filter button
  button_filter.position(xloc, yloc + 25);
  button_filter.mousePressed(toggle_filter);

  reset_on = false;
  button_reset = createButton("reset loc");
  button_reset.position(xloc - 75, yloc);
  button_reset.mousePressed(toggle_reset);

  pause_on = false;
  button_pause = createButton("pause"); // pause video button
  button_pause.position(xloc - 75, yloc + 25);
  button_pause.mousePressed(toggle_pause);

  fill(100, 100, 100);
  circle_square = true;
  circle_square_button = createButton("circle/sq"); // circle/square button
  circle_square_button.position(xloc, yloc + 50);
  circle_square_button.mousePressed(toggle_circle);

  slider_filter = createSlider(0, 24, 0, 1); // blur slider
  slider_filter.position(xloc + 100, yloc + 25);
  slider_filter.style("width", "120px");

  slider_diameter = createSlider(1, 240, 120, 1);
  slider_diameter.position(xloc + 100, yloc + 50);
  slider_diameter.style("width", "120px");

  slider_time_const = createSlider(0, 9, 0, 1);
  slider_time_const.position(xloc + 100, yloc);
  slider_time_const.style("width", "120px");
  /********************* SHAPES GUI DONE ***************/

  /********************* IMAGE PROCESSING GUI ********************/
  bypass = false;
  button_bypass = createButton("bypass");
  button_bypass.position(xloc - 450, yloc);
  button_bypass.mousePressed(toggle_bypass);

  reset_proc = false;
  button_reset_proc = createButton("reset proc");
  button_reset_proc.position(xloc - 450, yloc + 25);
  button_reset_proc.mousePressed(toggle_reset_proc);

  pause_video = false;
  button_pause_video = createButton("pause vid");
  button_pause_video.position(xloc - 450, yloc + 50);
  button_pause_video.mousePressed(toggle_pause_video);

  slider_blacks = createSlider(0, 100, 10, 1);
  slider_blacks.position(xloc - 280, yloc - 15);
  slider_blacks.style("width", "120px");

  slider_gamma = createSlider(0, 16, 0, 1);
  slider_gamma.position(xloc - 280, yloc + 10);
  slider_gamma.style("width", "120px");

  slider_gain = createSlider(0, 32, 24, 1);
  slider_gain.position(xloc - 280, yloc + 35);
  slider_gain.style("width", "120px");

  slider_col_gain = createSlider(0, 32, 16, 1);
  slider_col_gain.position(xloc - 280, yloc + 60);
  slider_col_gain.style("width", "120px");

  /********************* IMAGE PROCESSING GUI DONE ****************/

  start = 10;
  end = 10;
  // frame_counter = 0;

  frameRate(60); // make frameRate 10 FPS

  loop_time = new Avg_accum(30, fps_locx, fps_locy); // average accumulator every 30 fps
  // class constructor
}
/****************************** END SETUP *****************************/
/******************************************************************/

/******************************************************************/
/****************************** DRAW ******************************/

function draw() {
  //   if (pause_video)
  //     test_img.pause();
  //   else
  //     test_img.loop(); // commented out and moved to setup >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  background(0); // this appears sufficient to prevent superimpostions?
  imageMode(CENTER); // j noticed most people do this
  textSize(15);
  // noStroke();

  //  squaresCanvas.noStroke();
  // squaresCanvas.clear();  
  // clear method is to prevent superimpostion of trails notably the fps text etc
  // does not appear to be necessary when video is in setup, hence commented out >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  test_img.loadPixels(); // load all pixels from video
  // Loads the pixels data into the [pixels] attribute
  // this method loads the pixel data for the display window 
  // into the pixels[] array. 
  // This function must always be called before 
  // reading from or writing to pixels[].

  for (let i = 0; i < bigPixelArray.length; i++) {
    // method to subsample the image
    // according to BigPixel dimensions
  
    // psychedelic past bigPixelArray[i].colorize(i*8,random(200),50);

    if (reset_on) bigPixelArray[i].reset_location();
    // Big_pixel class function
    
    else if (!pause_on) bigPixelArray[i].move(); 
    // class function moving sample point to different position
    // and eventually drawing square in that position

    let x_index = int((bigPixelArray[i].x * Image_In_H_Size) / Main_Width);
    // traveling horizontally from Big_pixel to Big_pixel -- to get x index of array

    let y_index =
      Image_In_H_Size *
      int((bigPixelArray[i].y * Image_In_V_Size) / Main_Height);
    // traveling vertically -- to get y index of array
    let index = 4 * (x_index + y_index); //
    
    ///////////////////// THIS IS WHERE WE LEFT OFF

    if (!choose_random_last & choose_random) {
      // bigPixelArray[i].rgb[0] = random(255);
      // bigPixelArray[i].rgb[1] = random(255);
      // bigPixelArray[i].rgb[2]= random(255);
      bigPixelArray[i].rgbx[0] = random(255);
      bigPixelArray[i].rgbx[1] = random(255);
      bigPixelArray[i].rgbx[2] = random(255);
    } else if (!choose_random_last & !choose_random) {
      // bigPixelArray[i].R = test_img.pixels[index];
      // bigPixelArray[i].G = test_img.pixels[index + 1];
      // bigPixelArray[i].B = test_img.pixels[index + 2];
      bigPixelArray[i].rgbx[0] = test_img.pixels[index];
      bigPixelArray[i].rgbx[1] = test_img.pixels[index + 1];
      bigPixelArray[i].rgbx[2] = test_img.pixels[index + 2];

      if (reset_proc) {
        slider_blacks.value(0);
        slider_gamma.value(0);
        slider_gain.value(16);
        slider_col_gain.value(16);
      }
      if (!bypass)
        // bigPixelArray[i].process(slider_blacks.value(), slider_gamma.value(), slider_gain.value(), slider_col_gain.value(), slider_time_const.value());
        bigPixelArray[i].processV(
          slider_blacks.value(),
          slider_gamma.value(),
          slider_gain.value(),
          slider_col_gain.value(),
          slider_time_const.value()
        );
    }

    if (bigPixelArray[i].diam != slider_diameter.value()) {
      bigPixelArray[i].diam = slider_diameter.value();
    }

    bigPixelArray[i].display();
  }
  reset_on = false;
  reset_proc = false;

  choose_random_last = choose_random;

  // frame_counter++
  // not sure what this is but it's key!!!!!!!!!!!!!!!!
  //  (imgClone = squaresCanvas.get()).mask(mask_total.get());
  //(imgClone = squaresCanvas.get());

  let filt = slider_filter.value();
  if (filter_on) {
    let temp = "blur(" + str(filt) + "px)";
    drawingContext.filter = temp;
  } else drawingContext.filter = "blur(0px)";

  fill(255);
  text(
    "filter   " + slider_filter.value(),
    slider_filter.x + 130,
    slider_filter.y + 14
  );
  text(
    "diameter " + slider_diameter.value(),
    slider_diameter.x + 130,
    slider_diameter.y + 14
  );

  text(
    "black    " + slider_blacks.value(),
    slider_blacks.x - 80,
    slider_blacks.y + 14
  );
  text(
    "gamma    " + slider_gamma.value(),
    slider_gamma.x - 80,
    slider_gamma.y + 14
  );
  text(
    "gain     " + slider_gain.value(),
    slider_gain.x - 80,
    slider_gain.y + 14
  );
  text(
    "col gain " + slider_col_gain.value(),
    slider_col_gain.x - 80,
    slider_col_gain.y + 14
  );

  end = millis();
  let elapsed = round(end - start); // timing the draw function frame
  // alternative is to use frameRate()
  start = millis();
  console.log("This draw frame took: " + elapsed + " ms");

  // draw cross hairs
  // squaresCanvas.fill(255);
  // squaresCanvas.rect(Main_Width/2-1, 0, 2, Main_Height);
  // squaresCanvas.rect(0, Main_Height/2-1, Main_Width, 2);

  image(squaresCanvas, Main_Width / 2, Main_Height / 2);

  if (!choose_random) image(test_img, vid_locx, vid_locy, 96, 54); // put it in the lower corner

  loop_time.update(frameRate());
}

/****************************** END DRAW ******************************/
/******************************************************************/

/******************************************************************/
/****************************** FUNCTIONS *************************/

function toggle_circle() {
  circle_square = !circle_square;
}

function toggle_filter() {
  filter_on = !filter_on;
  print(filter_on);
}

function toggle_random() {
  choose_random = !choose_random;
}

function toggle_reset() {
  reset_on = true;
}

function toggle_pause() {
  pause_on = !pause_on;
}

function toggle_bypass() {
  bypass = !bypass;
}

function toggle_reset_proc() {
  reset_proc = true;
}

function toggle_pause_video() {
  pause_video = !pause_video;
}

/****************************** END FUNCTIONS *************************/
/******************************************************************/

/******************************************************************/
/****************************** CLASSES   *************************/

class Big_pixel {
  // changed class name from pixel_mask >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  constructor(num, x, y, xSpeed, ySpeed, R, G, B) {
    //, diam) {
    this.num = num;
    this.initialx = x;
    this.initialy = y;
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.R = R;
    this.G = G;
    this.B = B;

    this.rgb = createVector(0, 0, 0);

    this.rgb[0] = this.R;
    this.rgb[1] = this.G;
    this.rgb[2] = this.B;

    this.rgbx = [R, G, B];

    this.yy = 0;
  }

  move() {
    this.x += this.xSpeed;
    if (this.x < 0 || this.x > Main_Width) {
      this.xSpeed *= -1;
    }

    this.y += this.ySpeed;
    if (this.y < 0 || this.y > Main_Height) {
      this.ySpeed *= -1;
    }
  }

  reset_location() {
    this.x = this.initialx;
    this.y = this.initialy;
  }

  processV(black, gamma, gain, c_gain, RC) {
    //  let zz =  [20,20,20];
    //  this.rgbx = this.rgbx - zz; //  = this.rgb - [20,20,20]; //   =  this.rgbe - {black,black,black};
    for (var i = 0; i < 3; i++) {
      this.rgbx[i] = this.rgbx[i] - black;
      this.rgbx[i] =
        (((this.rgbx[i] * this.rgbx[i]) / 255) * gamma +
          this.rgbx[i] * (16 - gamma)) /
        16;
      this.rgbx[i] = (this.rgbx[i] * gain) / 16;
    }
    let lum = 0.299 * this.R + 0.587 * this.G + 0.114 * this.B;
    for (var i = 0; i < 3; i++)
      this.rgbx[i] = ((this.rgbx[i] - lum) * c_gain) / 16 + lum;
  }

  process(black, gamma, gain, c_gain, RC) {
    this.R = this.R - black;
    this.G = this.G - black;
    this.B = this.B - black;

    this.R = (((this.R * this.R) / 255) * gamma + this.R * (16 - gamma)) / 16;
    this.G = (((this.G * this.G) / 255) * gamma + this.G * (16 - gamma)) / 16;
    this.B = (((this.B * this.B) / 255) * gamma + this.B * (16 - gamma)) / 16;

    this.R = (this.R * gain) / 16;
    this.G = (this.G * gain) / 16;
    this.B = (this.B * gain) / 16;

    this.Y = 0.299 * this.R + 0.587 * this.G + 0.114 * this.B;
    this.RY = ((this.R - this.Y) * c_gain) / 16;
    this.GY = ((this.G - this.Y) * c_gain) / 16;
    this.BY = ((this.B - this.Y) * c_gain) / 16;

    this.R = this.Y + this.RY;
    this.G = this.Y + this.GY;
    this.B = this.Y + this.BY;
  }

  display() {
    // Use fill() function to fill color
    squaresCanvas.fill(this.rgbx[0], this.rgbx[1], this.rgbx[2], 255);
    // Draw a square

    if (circle_square)
      squaresCanvas.square(
        this.x - this.diam / 2,
        this.y - this.diam / 2,
        this.diam
      );
    else squaresCanvas.circle(this.x, this.y, this.diam);

    // mask_total.copy(submask, 0, 0, 70, 70, this.x, this.y, 70, 70);
  }
}

class Avg_accum {
  constructor(nums_per_average, xloc, yloc) {
    //, diam) {
    this.nums_per_average = nums_per_average;
    this.xloc = xloc;
    this.yloc = yloc;
    this.local_accum = 0.0;
    this.local_count = 0;
    this.local_avg = 0.0;
  }

  update(input_num) {
    this.local_count++;
    this.local_accum += input_num;
    if (this.local_count == this.nums_per_average - 1) {
      this.local_avg = this.local_accum / this.nums_per_average;
      this.local_accum = input_num;
      this.local_count = 0;
    }
    fill(255);
    text("FPS " + str(this.local_avg.toFixed(1)), this.xloc, this.yloc);
  }
}

/****************************** END CLASSES   *************************/
/******************************************************************/

// based on jim sketch rev 6
// J Flock 8b
//https://editor.p5js.org/novo/sketches/nXYok5qSN
// fixed Media play method error
// by moving video.loop() method
// from draw to setup, and with correct video name
//https://editor.p5js.org/novo/sketches/nXYok5qSN
