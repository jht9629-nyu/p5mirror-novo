//https://editor.p5js.org/jcamsfo/sketches/C9vkxMYxW

let mask_total, vid, submask, submask_temp;
let squaresCanvas, mainCanvas;
let image_Clone;

let start;
let end;

let frame_counter;

let Main_Width;
let Main_Height;
let Image_In_H_Size;
let Image_In_V_Size;

let choose_random;
let choose_random_last;


let filter_on;
let slider_filter;

let slider_diameter;

let pixel_masks = [];

function preload() {
  test_img = loadImage('new_test.jpg');
  //  waves = createVideo('waves-MPZ.mp4');
}

function setup() {
  mainCanvas = createCanvas(800, 900);
  squaresCanvas = createGraphics(800, 600);
  mask_total = createGraphics(800, 600);



  submask = createGraphics(70, 70);
  submask.noStroke();1
  submask.fill(255);    // try adding an alpha value here!
  submask.circle(35, 35, 40);
  submask.filter(BLUR, 12);

  submask_temp = createGraphics(70, 70);
  submask_temp.noStroke();

  Main_Height = 600;
  Main_Width = 800;
  Image_In_H_Size = 320;
  Image_In_V_Size = 240;


  for (let i = 0; i < 60; i++) {
    pixel_masks[i] = new pixel_mask(
      i,
      random(Main_Width),
      random(Main_Height),
      random(-10, 10) / 10,
      random(-10, 10) / 10,
      random(255),
      random(255),
      random(255),
      45);
  }

  choose_random = true;
  choose_random_last = true;
  button_random = createButton('random color');
  button_random.position(600, 700);
  button_random.mousePressed(toggle_random);

  filter_on = false;
  button_filter = createButton('filter on');
  button_filter.position(600, 750);
  button_filter.mousePressed(toggle_filter);


  slider_filter = createSlider(1, 24, 1, 1);
  slider_filter.position(600, 800);
  slider_filter.style('width', '80px');

  slider_diameter = createSlider(1, 60, 45, 1);
  slider_diameter.position(600, 850);
  slider_diameter.style('width', '80px');

  //slider_filter = 12;


  start = 10;
  end = 10;
  frame_counter = 0;

}



function draw() {

  frameRate(30); // make frameRate 10 FPS
  background(0);
  imageMode(CENTER);
  textSize(15);
  noStroke();

  // mask_total.circle(400, 300, 300);
  // // this lines up with the square at 100,100
  // mask_total.circle(135, 135, 70);



  // for (var i = 0; i < 150; i++) {
  //   let c = color(random(255), random(255), random(255), 255);
  //   squaresCanvas.noStroke();
  //   // Use fill() function to fill color
  //   squaresCanvas.fill(c);
  //   // Draw a square
  //   squaresCanvas.square(random(700), random(500), 70);
  // }


  // squaresCanvas.fill(100,200,50);

  // // // lines up with the circle at 135,135
  //  squaresCanvas.square(100,100,70);
  squaresCanvas.noStroke();
  squaresCanvas.clear();
  mask_total.clear();

  test_img.loadPixels();
  for (let i = 0; i < pixel_masks.length; i++) {
    //  pixel_masks[i].colorize(i*8,random(200),50);
    pixel_masks[i].move();

    let x_index = int((pixel_masks[i].x * Image_In_H_Size) / Main_Width);
    let y_index = Image_In_H_Size * int((pixel_masks[i].y * Image_In_V_Size) / Main_Height);
    let index = 4 * (x_index + y_index);


    if (!choose_random_last & !choose_random) {
      pixel_masks[i].R = test_img.pixels[index];
      pixel_masks[i].G = test_img.pixels[index + 1];
      pixel_masks[i].B = test_img.pixels[index + 2];
    }
    else if (!choose_random_last & choose_random) {
      pixel_masks[i].R = random(255);
      pixel_masks[i].G = random(255);
      pixel_masks[i].B = random(255);
    }


    if(pixel_masks[i].diam  !=  slider_diameter.value())
    {
      pixel_masks[i].diam = slider_diameter.value() ;
    }

    pixel_masks[i].display();
  }



  choose_random_last = choose_random;

  frame_counter++
  // not sure what this is but it's key!!!!!!!!!!!!!!!!
  //  (imgClone = squaresCanvas.get()).mask(mask_total.get());
  //(imgClone = squaresCanvas.get());

  let filt = slider_filter.value();
  print(filt);
  if (filter_on) {
    let temp = 'blur(' + str(filt) + 'px)';
    drawingContext.filter = temp;
  }
  else
    drawingContext.filter = 'blur(1px)';

  fill(255);
  text('filter',   slider_filter.x + 90, slider_filter.y + 14);
  text('diameter', slider_diameter.x + 90, slider_diameter.y + 14);

  end = millis();
  let elapsed = end - start;
  start = millis();
  // console.log("This took: " + elapsed + "ms.")

  image(squaresCanvas, 400, 300);


  image(test_img, 160, 780);  // put it in the lower corner

}



function toggle_filter() {
  filter_on = !filter_on;
  print(filter_on);
}

function toggle_random() {
  choose_random = !choose_random;
}



class pixel_mask {
  constructor(num, x, y, xSpeed, ySpeed, R, G, B, diam) {
    this.num = num;
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.R = R
    this.G = G;
    this.B = B;
    this.diam = diam;
    //  print(this.R);
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


  display() {
    // Use fill() function to fill color
    squaresCanvas.fill(this.R, this.G, this.B, 255);
    // Draw a square
    squaresCanvas.circle(this.x + 35, this.y + 35, this.diam);
    //squaresCanvas.square(this.x, this.y , 70);

    mask_total.copy(submask, 0, 0, 70, 70, this.x, this.y, 70, 70);
  }




}