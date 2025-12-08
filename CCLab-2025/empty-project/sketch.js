let s = [];
let box;     
let btn; 
let check = false;
let sound;

function preload() {
  sound = loadSound("assets/galaxy2.mp3");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 150; i++) {
    s[i] = new Star();
  }

  colorMode(HSB, 100);

  box = createInput();
  box.position(200, 450);
  box.size(300);

  btn = createButton('Enter Galaxy');
  btn.position(510, 450);
  btn.mousePressed(enterGalaxy);
}

function draw() {
  background(0);

  for (let i = 0; i < s.length; i++) {
    s[i].update();
    s[i].display();
  }

  if (check == false) {
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    text("Write a short opinion", width / 2, height / 2 - 20);
  }
}

function enterGalaxy() {
 check = true;
  box.hide();
  btn.hide();

  userStartAudio();
  if (sound.isPlaying() == false) {
    sound.play();
  }
}

class Star {
  constructor(x, y) {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 5);
    this.c = random(100);

    let angle = atan2(this.y - height / 2, this.x - width / 2);
    let speed = random(1, 3);
    this.dx = cos(angle) * speed;
    this.dy = sin(angle) * speed;

    this.growth = random(0.1, 0.2);
  }

  update() {
    if (check) {
      this.x += this.dx * 5;
      this.y += this.dy * 5;
      this.size += this.growth * 3;
    } else {
      this.x += this.dx;
      this.y += this.dy;
      this.size += this.growth;
    }

    if (this.isOutCanvas()) {
      this.x = random(width);
      this.y = random(height);
      this.size = random(2, 5);
      this.c = random(100);

      let angle = atan2(this.y - height / 2, this.x - width / 2);
      let speed = random(1, 3);
      this.dx = cos(angle) * speed;
      this.dy = sin(angle) * speed;

      this.growth = random(0.1, 0.2);
    }
  }

  isOutCanvas() {
    return (
      this.x + this.size < 0 ||
      this.x - this.size > width ||
      this.y + this.size < 0 ||
      this.y - this.size > height
    );
  }

  display() {
    noStroke();
    fill(this.c, 100, 100);
    if (check) {
      let angle = atan2(this.dy, this.dx);
      push();
      translate(this.x, this.y);
      rotate(angle);
      ellipse(0, 0, this.size * 4, this.size);
      pop();
    } else {
      circle(this.x, this.y, this.size);
    }
  }
}
