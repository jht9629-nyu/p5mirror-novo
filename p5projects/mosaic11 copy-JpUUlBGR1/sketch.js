// https://editor.p5js.org/jcamsfo/sketches/WNj0g-jvl

let img;

let new_loc_x_upper = 0;
let new_loc_x_lower = 0;

let old_loc_x_upper = -5;
let old_loc_x_lower = -5;

let new_loc_y = 0;
let cnt_x = 0;
let cnt_y = 0;
let length_random;
let old_loc_x;
let old_length_random;
let length_random_offset;
let old_length_random_offset;

let perlin1;
let perlin2;

let enable_noise = true;

let center_x;
let center_y;

let pix;

let scale_fac;

let length_noise_main_gain;
let length_min;

let length_lower_noise_gain;
let length_lower_noise_offset;

let y_size;

let people_a = "people-blur/Cortlandt_Test_";

let rgbx = [0, 0, 0];

let first_time = true;

let buttons_M = [];

let buttons_S = [];

let sliders_all = [];

let image_selected;

let image_selected_local;

let image_changed = false;

let enable_proc = false;

let img_arr = [];
let pep_arr = [];
let msc_arr = [];

let weight = 2;

let res = 2;

let col_on;
let col_off;


var num_of_misc = 29;

  let slider_Z = [];

function preload() {
  for (var i = 0; i < 25; i++) {
    let zz = "fens/marsh" + str(i + 1) + ".jpg";
    img_arr[i] = loadImage(zz);
  }

  for (var i = 0; i < 24; i++) {
    let zz = "people-blur/people (" + str(i + 1) + ").jpg";
    pep_arr[i] = loadImage(zz);
  }

  for (var i = 0; i < num_of_misc; i++) {
    let zz = "miscX/misc (" + str(i + 1) + ").jpg";
    msc_arr[i] = loadImage(zz);
  }

  image_selected = img_arr[14];
}

function setup() {
  
  
  col_on = color(180, 240, 240, 255);
  col_off = color(200, 200, 200, 255);
  
  
  let yloc = 1550;

  for (var i = 0; i < 6; i++) {
    buttons_M[i] = createButton("res" + str(i)); // shape select button
    buttons_M[i].position(50 + i * 50, yloc);
    buttons_M[i].size(40, 20);
    buttons_M[i].mousePressed(eval("s" + str(i)));
  }

  for (var i = 0; i < 4; i++) {
    buttons_S[i] = createButton("grout" + str(i + 1)); // shape select button
    buttons_S[i].position(400 + i * 70, yloc);
    buttons_S[i].size(60, 20);
    buttons_S[i].mousePressed(eval("g" + str(i)));
  }

  

  let slider_Z_range = [100, 16, 32, 32];
  let slider_Z_defaults = [10, 0, 24, 16];
  for (var i = 0; i < 4; i++) {
    slider_Z[i] = createSlider(0, slider_Z_range[i], slider_Z_defaults[i], 1);
    slider_Z[i].position(750 + i * 175, yloc);
    slider_Z[i].style('width', '120px');
 //   sliders_all[slider_keys[i]] = slider_Z[i];  // add to the object full of sliders
  }

  cnt = 0;
  background(0);
  //  strokeWeight(1);
  //  noStroke();
  // stroke(100);

  frameRate(60);

  new_loc_y = 0;
  old_loc_x_upper = 0;
  
  
  s4();
  g1();


  createCanvas(14000, 1600);
  //   image_selected.width * scale_fac,
  //   200 + image_selected.height * scale_fac
  // );

  thumbs = createGraphics(2400, 150);
  thumbs.background(50);
}

function draw() {
  
 //  process(blk, gamma, gainX, c_gain) {
     
     
  let blk = slider_Z[0].value();
     
  let gamma = slider_Z[1].value();  
  
  let gainX = slider_Z[2].value();  
  
  let c_gain = slider_Z[3].value();    
  
  
  
  image_selected.loadPixels();

//   if (image_selected.width / image_selected.height >= 2000 / 1366)
//     scale_fac = 2000 / image_selected.width;
//   else scale_fac = 1366 / image_selected.height;

 scale_fac = 1366 / image_selected.height;  
  
  cnt_y = 0;
  while (new_loc_y < scale_fac * image_selected.height - 5) {
    cnt_x = 0;
    while (old_loc_x_upper < scale_fac * image_selected.width) {
      // generate a noise based length of tile
      // perlin1 = int( noise(cnt_x, cnt_y) * 15 ) ;  // LOW RES
      // perlin1 = int(noise(cnt_x, cnt_y) * 7); // HIGHER RES
      perlin1 = int(noise(cnt_x, cnt_y) * length_noise_main_gain); // HIGHER RES

      // length_random = 10 + perlin1 ;     // LOW RES
      length_random = length_min + perlin1; // HIGHER RES

      //length_random = 10 +  int(random(0,20) ) ;

      // generate a random difference between the upper right corner and the lower right corner
      // length_random_offset = int( noise(cnt_x) * 7) - 3  ;  // LOW RES
      length_random_offset =
        int(noise(cnt_x) * length_lower_noise_gain) - length_lower_noise_offset; // HIGHER RES

      // length_random_offset = int( random(7) ) - 3  ;

      new_loc_x_upper = old_loc_x_upper + length_random;
      new_loc_x_lower = old_loc_x_upper + length_random + length_random_offset;

      center_x = (new_loc_x_upper + old_loc_x_upper) / 2;
      center_y = new_loc_y + y_size;

      //  pix = image_selected.get(center_x/4, center_y/4);
      //  fill(pix[0], pix[1], pix[2]);

      let img_loc =
        (image_selected.width * int(center_y / scale_fac) +
          int(center_x / scale_fac)) *
        4;

      fill(
        image_selected.pixels[img_loc],
        image_selected.pixels[img_loc + 1],
        image_selected.pixels[img_loc + 2]
      );

      //       if((cnt_x%2 ==0) && (cnt_y%2==0))
      //       fill(
      //         img.pixels[img_loc],
      //         img.pixels[img_loc + 1],
      //         img.pixels[img_loc + 2]
      //       );
      //       else
      //         fill(0);

      //  fill(180, 250, 250);

      //   console.log(new_loc_x_upper + " " + new_loc_y);

      strokeWeight(weight);
      stroke(10);
      // stroke(
      //   image_selected.pixels[img_loc],
      //   image_selected.pixels[img_loc + 1],
      //   image_selected.pixels[img_loc + 2]
      // );

      rgbx = [
        image_selected.pixels[img_loc],
        image_selected.pixels[img_loc + 1],
        image_selected.pixels[img_loc + 2],
      ];

  //    if (enable_proc) process(0, 0, 20, 16);
      // if (enable_proc) 
      //     process(blk, gamma, gainX, c_gain);

      fill(rgbx);
      // fill(
      //   0
      // );

      quad(
        old_loc_x_upper,
        new_loc_y + random(0, 0),
        new_loc_x_upper,
        new_loc_y + random(0, 0),
        new_loc_x_lower,
        new_loc_y + y_size + random(0, 0),
        old_loc_x_lower,
        new_loc_y + y_size + random(0, 0)
      );

      old_loc_x_upper = new_loc_x_upper;
      old_loc_x_lower = new_loc_x_lower;
      cnt_x++;
    }

    old_loc_x_upper = -5;
    old_loc_x_lower = -5;
    // new_loc_y += 15;   // LO RES
    new_loc_y += y_size; // HI RES
    cnt_y++;
  }

  first_time = false;
  image(
    image_selected,
    20,
    20,
    300,
    (300 * image_selected.height) / image_selected.width
  );

  draw_the_small_stills();

  image(thumbs, 0, 1375);

  if (image_changed) {
    new_loc_y = 0;
    old_loc_x_upper = 0;
    image_changed = false;
    fill(255);
    rect(0, 0, width, 1366);
  }

  if (cnt_y != 0)
    console.log(
      "x " +
        cnt_x +
        "  y " +
        cnt_y +
        "  ppf " +
        int(cnt_y / 7) +
        "  res" +
        res +     
        "  grout" +
        weight
    );
}

function process(blk, gamma, gain, c_gain) {
  for (var i = 0; i < 3; i++) {
    // first subtract the black value
    rgbx[i] = rgbx[i] - blk;
    // gamma gain  fade between straight video and video squared  range 0-16
    rgbx[i] =
      (((rgbx[i] * rgbx[i]) / 256) * gamma + rgbx[i] * (16 - gamma)) / 16;
    // main gain range 0-32 with 16 as straight gain
    rgbx[i] = (rgbx[i] * gain) / 16;
  }

  // calculate luminance (B&W value) for doing the chroma gain range 0-32 with 16 as straight gain
  let lum = 0.299 * rgbx[0] + 0.587 * rgbx[1] + 0.114 * rgbx[2];

  // // separate colors R-Y G-Y B-Y and multiply and add it back to Y
  for (var i = 0; i < 3; i++) rgbx[i] = ((rgbx[i] - lum) * c_gain) / 16 + lum;
}

function draw_the_small_stills() {
  for (var i = 0; i < 25; i++) {
    i;
    image_selected_local = img_arr[i];
    thumbs.image(
      image_selected_local,
      80 * i,
      0,
      80,
      (80 * image_selected_local.height) / image_selected_local.width
    );
  }

  for (var i = 0; i < 24; i++) {
    image_selected_local = pep_arr[i];
    thumbs.image(
      image_selected_local,
      80 * i,
      50,
      80,
      (80 * image_selected_local.height) / image_selected_local.width
    );
  }

  for (var i = 0; i < num_of_misc; i++) {
    image_selected_local = msc_arr[i];
    thumbs.image(
      image_selected_local,
      80 * i,
      100,
      80,
      (80 * image_selected_local.height) / image_selected_local.width
    );
  }
}

function mouseClicked() {
  let y_range = mouseY > 1375 && mouseY < 1425;
  let y_range_2 = mouseY > 1425 && mouseY < 1475;
  let y_range_3 = mouseY > 1475 && mouseY < 1525;
  let x_range = mouseX > 0 && mouseX < 2400;

  let val = int(mouseX / 80);

  // console.log(mouseX + " " + val + "  " + mouseY);

  if (x_range && y_range) {
    if (val >= 0 && val < 25) {
      image_selected = img_arr[val];
      image_changed = true;
      enable_proc = false;
    }
  } else if (x_range && y_range_2) {
    if (val >= 0 && val < 24) {
      image_selected = pep_arr[val];
      image_changed = true;
      enable_proc = true;
    }
  } else if (x_range && y_range_3) {
    if (val >= 0 && val < num_of_misc) {
      image_selected = msc_arr[val];
      image_changed = true;
      enable_proc = true;
    }
  }
}



function s0() {
  length_noise_main_gain = 48; //   7 nominal
  length_min = 32; //   5 + noise * 7
  length_lower_noise_gain = 25; // 5 nominal
  length_lower_noise_offset = 12; // 2 nominal
  y_size = 48;
  res = 0;
  image_changed = true;
  for(var i=0; i<6; i++)
    buttons_M[i].style('background-color', col_off);
  buttons_M[res].style('background-color', col_on);  
}



function s1() {
  length_noise_main_gain = 30; //   7 nominal
  length_min = 20; //   5 + noise * 7
  length_lower_noise_gain = 15; // 5 nominal
  length_lower_noise_offset = 7; // 2 nominal
  y_size = 30;
  res = 1;
  image_changed = true;
  for(var i=0; i<6; i++)
    buttons_M[i].style('background-color', col_off);
  buttons_M[res].style('background-color', col_on);  
}



function s2() {
  length_noise_main_gain = 15; //   7 nominal
  length_min = 10; //   5 + noise * 7
  length_lower_noise_gain = 7; // 5 nominal
  length_lower_noise_offset = 3; // 2 nominal
  y_size = 15;
  res = 2;
  image_changed = true;
  for(var i=0; i<5; i++)
    buttons_M[i].style('background-color', col_off);
  buttons_M[res].style('background-color', col_on);  
}

function s3() {
  length_noise_main_gain = 11; //   7 nominal
  length_min = 7; //   5 + noise * 7
  length_lower_noise_gain = 7; // 5 nominal
  length_lower_noise_offset = 3; // 2 nominal
  y_size = 11;
  res = 3;
  image_changed = true;
  for(var i=0; i<6; i++)
    buttons_M[i].style('background-color', col_off);
  buttons_M[res].style('background-color', col_on);    
}

function s4() {
  length_noise_main_gain = 9; //   7 nominal
  length_min = 6; //   5 + noise * 7
  length_lower_noise_gain = 7; // 5 nominal
  length_lower_noise_offset = 3; // 2 nominal
  y_size = 9;
  res = 4;
  image_changed = true;
  for(var i=0; i<6; i++)
    buttons_M[i].style('background-color', col_off);
  buttons_M[res].style('background-color', col_on);     
}

function s5() {
  length_noise_main_gain = 7; //   7 nominal
  length_min = 5; //   5 + noise * 7
  length_lower_noise_gain = 5; // 5 nominal
  length_lower_noise_offset = 2; // 2 nominal
  y_size = 7;
  res = 5;
  image_changed = true;
  for(var i=0; i<6; i++)
    buttons_M[i].style('background-color', col_off);
  buttons_M[res].style('background-color', col_on);     
}

function g0() {
  weight = 1;
  image_changed = true;
  for(var i=0; i<4; i++)
    buttons_S[i].style('background-color', col_off);
  buttons_S[weight-1].style('background-color', col_on);       
}

function g1() {
  weight = 2;
  image_changed = true;
  for(var i=0; i<4; i++)
    buttons_S[i].style('background-color', col_off);
  buttons_S[weight-1].style('background-color', col_on);    
}

function g2() {
  weight = 3;
  image_changed = true;
  for(var i=0; i<4; i++)
    buttons_S[i].style('background-color', col_off);
  buttons_S[weight-1].style('background-color', col_on);    
}

function g3() {
  weight = 4;
  image_changed = true;
  for(var i=0; i<4; i++)
    buttons_S[i].style('background-color', col_off);
  buttons_S[weight-1].style('background-color', col_on);    
}

