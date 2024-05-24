// v slit v2 with checkbox vvv
// https://editor.p5js.org/benjamin.bergery/sketches/LjP_Tq2Rv

let rx = 0;

let video;
let moveSlit = true;
let checkbHideVideo;

function setup() {
  createCanvas(600, 240);
  createP();
   // createCheckbox([label], [value])
  createCheckbox('move the slit', moveSlit).changed(function() {
    moveSlit = this.checked();
  });
  createP();

  
  // checkbHideVideo = createCheckbox('hide video', false);
  // checkbHideVideo.changed(checkVideohide);


  video = createCapture(VIDEO);

  // change video display size
  video.size(320, 240);
  // hide video source
  // video.hide();
}

function draw() {
  let slitty = width / 2;
  let h = height;
  let wido = 1;

  if (moveSlit) {
    copy(video, width / 2, 0, wido, h, rx, 0, wido, h);
  rx = rx + 1;
  if (rx == width) {
    rx = 0;
  }
  }
}

function checkVideohide() {
  if (checkbHideVideo.checked()) {
video.hide();
  }
}


//-------- NOTES ----------------------------//
/* copy method 
copy(sourceImage, rectx,recty,rectw,recth,
                  rect2x,rect2y,rect2w,rect2h)
*/


// other checkbox method
/*  
let checkbox; //global before setup

checkbox = createCheckbox('label', false);
  checkbox.changed(myCheckedEvent);
}

function myCheckedEvent() {
  if (checkbox.checked()) {
    console.log('Checking!');
  } else {
    console.log('Unchecking!');
  }
*/

// https://editor.p5js.org/benjamin.bergery/sketches/VmxHBu2zG
// https://editor.p5js.org/benjamin.bergery/sketches/-llRdBMku
//https://editor.p5js.org/benjamin.bergery/sketches/-llRdBMku
// 
