/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/
// let dancer = [];
let n = 5;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  // for (let i = 0; i < n; i++) {
  //   dancer[i] = new Cloud(random(-width, -width * 0.1), random(height * 0.2, height * 0.8), random(30, 100));
  // }
  // change name below to match your dancer class name
  dancer = new AlienDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor(); // for reference only
  dancer.update();
  dancer.display();
}

class AlienDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
  }

  update() {
    this.angle += 0.008;
  }

  display() {
    push();
    translate(this.x, this.y);
    let speed = 0.002;
    let nx = map(noise(frameCount * speed), 0, 1, -width / 4, width / 4);
    let ny = map(noise(frameCount * speed), 0, 1, -height / 4, height / 4);

    translate(nx, ny);

    beginShape();
    fill(255, 255, 0, 100);
    stroke(253, 216, 8);
    strokeWeight(2);
    vertex(180, 200);
    vertex(220, 200);
    vertex(240, 330);
    vertex(160, 330);
    endShape(CLOSE);

    beginShape();
    fill(255, 255, 0, 200);
    noStroke();
    vertex(190, 200);
    vertex(210, 200);
    vertex(220, 300);
    vertex(180, 300);
    endShape(CLOSE);

    //body
    fill(128, 128, 128);
    stroke(0);
    strokeWeight(1);
    arc(200, 200, 140, 50, 0, TWO_PI);

    push();
    noFill();
    stroke(0);
    translate(200, 200);

    let r = 70;
    let c = 8;

    for (let i = 0; i < c; i++) {
      let a = this.angle + (TWO_PI / c) * i;
      let cx = r * 0.8 * cos(a);
      let cy = r * 0.28 * sin(a);
      fill(255, 0, 0);
      circle(cx, cy, 4);
      fill(0);
      line(cx, cy, 0, 0);
    }

    this.drawReferenceShapes()

    pop();

    //face
    fill(0, 255, 255, 180);
    arc(200, 200, 60, 80, PI, 0);
    strokeWeight(5);
    stroke(0, 0, 255);
    arc(200, 200, 60, 10, 0, PI);
    fill(0, 255, 255);
    strokeWeight(1)
    stroke(0, 0, 255);
    circle(200, 158, 5);

    //head sin
    push();
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    let steps = 40;
    for (let i = 0; i <= 1; i += 1 / steps) {
      let x = lerp(200, 200, i);
      let y = lerp(158, 128, i);
      let v = 3 * sin(frameCount * 0.2 - i * 15);
      vertex(x + v, y);
    }
    endShape();
    fill(255, 0, 0);
    circle(200, 128, 8);
    pop();

    //eyes
    stroke(0);
    strokeWeight(1);
    fill(255);
    arc(200 - 7, 200 - 20, 12, 15, 0, TWO_PI);
    arc(200 + 7, 200 - 20, 12, 15, 0, TWO_PI);
    fill(0);
    circle(200 + 7, 200 - 20, 2);
    circle(200 - 7, 200 - 20, 2);

    arc(200, 190, 5, 5, 0, PI);
    //this.drawReferenceShapes()
    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}
/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
