let s = [];
let t = [];
let inputBox;
let submitBtn;
let warpMode = false;
let sound;
let img;

let notes = [
  261.63,293.66,329.63,349.23,392.0,440.0,493.88,523.25,
  587.33,659.25,698.46,783.99,880.0,987.77,1046.5,1174.66,
  1318.51,1396.91,1567.98,1760.0,1975.53,2093.0
];

function preload() {
  sound = loadSound("assets/galaxy2.mp3");
  //img = loadImage("sprite.png");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  noCursor();

  for (let i = 0; i < 700; i++) {
    s[i] = new Star();
  }

  colorMode(HSB, 100);

  inputBox = createInput();
  inputBox.position(655, 500);
  inputBox.size(300);

  submitBtn = createButton("Enter Galaxy");
  submitBtn.position(1000, 500);
  submitBtn.mousePressed(enterGalaxy);
}

function draw() {
  // background if needed
  background(0,10);

  // glowing image following cursor
  // push();
  // blendMode(ADD);
  // tint(220, 120, 10, 40);
  // imageMode(CENTER);
  // image(img, mouseX, mouseY, 50, 50);
  // pop();

  // starfield
  for (let i = 0; i < s.length; i++) {
    s[i].update();
    s[i].display();
  }

  // text particles
  for (let i = t.length - 1; i >= 0; i--) {
    t[i].update();
    t[i].updateLifespan();
    t[i].display();
    if (t[i].isDone) t.splice(i, 1);
  }

  // message before entering galaxy
  if (warpMode == false) {
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    text("Write a short message to your future self", width / 2, height / 2 - 20);
  }
}

function enterGalaxy() {
  warpMode = true;
  inputBox.hide();
  submitBtn.hide();

  userStartAudio();
  if (!sound.isPlaying()) sound.play();
}

/* --------------------------------------------------
   KEY PRESSED (for input box typing sound + particles)
-----------------------------------------------------*/

function keyPressed() {
  // Only trigger when typing in the input box
  if (document.activeElement === inputBox.elt) {

    // Only letters, numbers, symbols → not Shift, Backspace, etc.
    if (key.length === 1) {

      let p = new TextParticle(key, random(width), random(height));
      t.push(p);

      p.playChar(); // play sound
    }
  }
}

/* --------------------------------------------------
    TEXT PARTICLE CLASS
-----------------------------------------------------*/

class TextParticle {
  constructor(letter, x, y) {
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.life = 255;
    this.isDone = false;
  }

  playChar() {
    let note = random(notes);
    let osc = new p5.Oscillator("sine");
    osc.freq(note);
    osc.start();
    osc.amp(0.2, 0.05);
    osc.amp(0, 0.5);
    osc.stop(1);
  }

  update() {
    this.y -= 1;
  }

  updateLifespan() {
    this.life -= 3;
    if (this.life <= 0) this.isDone = true;
  }

  display() {
    fill(255, this.life);
    textSize(24);
    text(this.letter, this.x, this.y);
  }
}

/* --------------------------------------------------
    STAR CLASS
-----------------------------------------------------*/

class Star {
  constructor() {
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
    if (warpMode) {
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

    if (warpMode) {
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
