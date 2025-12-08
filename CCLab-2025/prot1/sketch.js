let s = [];
let inputBox;
let submitBtn;
let warpMode = false;
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


 inputBox = createInput();
 inputBox.position(200, 450);
 inputBox.size(300);


 submitBtn = createButton('Enter Galaxy');
 submitBtn.position(510, 450);
 submitBtn.mousePressed(enterGalaxy);


 
}

// function mousePressed(){

// }

function draw() {
 background(0);
 for (let i = 0; i < s.length; i++){
 s[i].update();
 s[i].display();
 }

if (warpMode == false) {
   textAlign(CENTER, CENTER);
   textSize(24);
   fill(255);
   text("A message to your future self", width/2, height/2-20);
 }

}


function enterGalaxy() {
 
   warpMode = true;
   inputBox.hide();
   submitBtn.hide();


   userStartAudio();
   if (sound.isPlaying() == false) {
     sound.play();
   }
 }



class Star {
 constructor(x,y) {
 this.x = random(width);
   this.y = random(height);
   this.size = random(2, 5);
   this.c = random(100);


   let angle = atan2(this.y - height/2, this.x - width/2);
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


   let angle = atan2(this.y - height/2, this.x - width/2);
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
   fill(this.h, 100, 100);


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



// let s = [];

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   background(10);

//   for (let i = 0; i < 100; i++) {
//     let x = random(width);
//     let y = random(height);
//     let c = color(random(50, 255), random(50, 255), random(50, 255));
//     s.push(new Star(x, y, c));
//   }
// }

// function draw() {
//   background(0, 30);

//   for (let i = 0; i < s.length; i++) {
//     s[i].update();
//     s[i].display();
//   }
// }

// class Star {
//   constructor(x, y, c) {
//     this.x = x;
//     this.y = y;
//     this.c = c;
//     this.size = random(3, 12);
//       this.vel = createVector(random(-1, 1), random(-1, 1));
//   }

//   update() {
  
//     this.x += this.vel.x;
//     this.y += this.vel.y;

//     if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
//     this.x = random(width);
//     this.y = random(height);
//   }
//   }

//   display() {
//     noStroke();
//     drawingContext.shadowBlur = 12;
//     drawingContext.shadowColor = this.c;
//     fill(this.c);
//     circle(this.x, this.y, this.size);
//   }
// }

