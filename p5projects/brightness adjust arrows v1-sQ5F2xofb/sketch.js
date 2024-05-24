let variableValue = 0;
let buttonWidth = 20;
let buttonHeight = 20;
let buttonMargin = 20;

function setup() {
  createCanvas(400, 200);
  
  // Set up the "increase" button
  increaseButton = new TriangularButton(width / 3 - buttonWidth / 2, height / 2, buttonWidth, buttonHeight, "increase");

  // Set up the "decrease" button
  decreaseButton = new TriangularButton(width / 4 - buttonWidth / 2, height / 2, buttonWidth, buttonHeight, "decrease");
}

function draw() {
  background(220);
  
  // Display the current value of the variable
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(variableValue, width / 2, height / 2);
  
  // Display the buttons
  increaseButton.display();
  decreaseButton.display();
}

function mousePressed() {
  // Check if the increase button was clicked
  if (increaseButton.clicked(mouseX, mouseY)) {
    variableValue++;
  }
  
  // Check if the decrease button was clicked
  if (decreaseButton.clicked(mouseX, mouseY)) {
    variableValue--;
  }
}

class TriangularButton {
  constructor(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
  }
  
  display() {
    fill(150);
    beginShape();
    if (this.type === "increase") {
      vertex(this.x, this.y);
      vertex(this.x + this.w, this.y + this.h / 2);
      vertex(this.x, this.y + this.h);
    } else if (this.type === "decrease") {
      vertex(this.x + this.w, this.y);
      vertex(this.x, this.y + this.h / 2);
      vertex(this.x + this.w, this.y + this.h);
    }
    endShape(CLOSE);
  }
  
  clicked(mx, my) {
    return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
  }
}

// 
