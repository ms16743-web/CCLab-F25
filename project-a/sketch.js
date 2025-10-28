/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let dotX, dotY;
let dotVisible = false;
let pacX, pacY;
let speed = 3;
let pacSize = 160;
let eatCounter = 0;
let rotationAngle = 0;
let targetAngle = 0;
let facingRight = true;
let facingUp = true;
let moveVertical = false;
let transparency = 170;
let s = 10;
let angry = false;
let waveSpeed = 0.05;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Hello PAC!", width / 2, height / 2);
  pacX = width / 2;
  pacY = height / 2;
}

function draw() {
  background(0, 20);

  // background
  noFill();
  stroke(0, 0, 255, 10);
  strokeWeight(1);
  for (let i = 0; i < width; i += s) {
    for (let j = 0; j < width; j += s) {
      rect(i, j, s, s);
    }
  }

  // glowing aura after 5th dot
  if (eatCounter >= 5) drawEnergyLines(pacX, pacY);

  // blue transparency
  fill(0, 200, 255, 150);
  noStroke();
  ellipse(pacX, pacY, transparency, transparency);

  // blue border
  stroke(0, 0, 255);
  strokeWeight(20);
  noFill();
  rect(0, 0, width, height);

  //movement
  if (eatCounter >= 5) {
    let dx = mouseX - pacX;
    let dy = mouseY - pacY;
    let d = sqrt(dx * dx + dy * dy);
    if (d > speed) {
      pacX += (dx / d) * speed;
      pacY += (dy / d) * speed;
    }
    if (dx * dx > dy * dy) {
      moveVertical = false;
      facingRight = dx > 0;
    } else {
      moveVertical = true;
      facingUp = dy < 0;
    }
  } else if (dotVisible) {
    let dx = dotX - pacX;
    let dy = dotY - pacY;
    let d = sqrt(dx * dx + dy * dy);
    if (d > speed) {
      pacX += (dx / d) * speed;
      pacY += (dy / d) * speed;
    } else {
      dotVisible = false;
      pacSize -= 25;
      transparency -= 25;
      eatCounter++;
    }
    if (dx * dx > dy * dy) {
      moveVertical = false;
      facingRight = dx > 0;
    } else {
      moveVertical = true;
      facingUp = dy < 0;
    }
  }

  // Pac-Man body
  push();
  translate(pacX, pacY);
  if (eatCounter >= 5) {
    rotationAngle += 0.05;
    rotate(rotationAngle);
  }

  noStroke();
  let mouth = map(sin(frameCount * 0.15), -1, 1, PI / 30, PI / 4);
  if (angry) {
    fill(255, 0, 0);
  } else {
    fill(255, 255, 0);
  }
  if (moveVertical) {
    if (facingUp) {
      arc(0, 0, pacSize, pacSize, -HALF_PI + mouth, -HALF_PI - mouth + TWO_PI);
      fill(0);
      circle(pacSize * 0.25, -pacSize * 0.1, pacSize * 0.08);
    } else {
      arc(0, 0, pacSize, pacSize, HALF_PI + mouth, HALF_PI - mouth + TWO_PI);
      fill(0);
      circle(pacSize * 0.25, pacSize * 0.1, pacSize * 0.08);
    }
  } else {
    if (facingRight) {
      arc(0, 0, pacSize, pacSize, mouth, TWO_PI - mouth);
      fill(0);
      circle(pacSize * 0.07, -pacSize * 0.25, pacSize * 0.08);
    } else {
      arc(0, 0, pacSize, pacSize, PI + mouth, PI - mouth);
      fill(0);
      circle(-pacSize * 0.07, -pacSize * 0.25, pacSize * 0.08);
    }
  }
  pop();
  if (dotVisible) {
    // target decoration
    fill(255, 0, 0);
    translate(dotX, dotY)
    rotate(targetAngle);
    stroke(0);
    strokeWeight(1);
    circle(0, 0, 6);
    targetAngle += 0.05;


    for (let Angle = 0; Angle < 2 * PI; Angle += PI / 4) {
      rotate(Angle);
      fill(255);
      stroke(0);
      strokeWeight(1)
      circle(10, 0, 5);
      fill(255, 0, 0);
      noStroke();
      circle(20, 0, 10)
    }
  }
  // Target
  if (dotVisible && eatCounter < 5) {
    fill(255, 0, 0);
    push();
    translate(dotX, dotY);
    rotate(frameCount * 0.05);
    circle(0, 0, 6);
    pop();
  }

  // Red aura flicker if angry
  if (angry) drawCircleEffect();
}

// dot-AURA 
function drawEnergyLines(cx, cy) {
  push();
  translate(cx, cy);
  if (angry) {
    stroke(color(255, 0, 0, 150));
  } else {
    stroke(color(0, 150, 255, 150));
  }
  strokeWeight(2);
  noFill();

  let waveAmp = 10 + 5 * sin(frameCount * 0.05);
  let len = 80;
  let len2 = 110; // a bit longer than short lines

  // 4 main wavy lines
  drawWavyLine(0, 0, len, 0, waveAmp);
  drawWavyLine(0, 0, -len, 0, waveAmp);
  drawWavyLine(0, 0, 0, len, waveAmp);
  drawWavyLine(0, 0, 0, -len, waveAmp);

  // 4 vertex-style beams (slower)
  drawBeamVertex(len2, QUARTER_PI);
  drawBeamVertex(len2, -QUARTER_PI);
  drawBeamVertex(len2, (3 * QUARTER_PI));
  drawBeamVertex(len2, (-3 * QUARTER_PI));
  pop();
}

//  line-AURA
function drawWavyLine(x1, y1, x2, y2, amp) {
  beginShape();
  let steps = 20;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);
    let speedFactor;
    if (angry) {
      speedFactor = 0.3;
    } else {
      speedFactor = waveSpeed;
    }

    let offset = sin(frameCount * speedFactor + t * TWO_PI) * amp * 0.5;
    let nx = y2 - y1;
    let ny = -(x2 - x1);
    let mag = sqrt(nx * nx + ny * ny);
    nx /= mag; ny /= mag;
    vertex(x + nx * offset, y + ny * offset);
  }
  endShape();
}

//dot aura
function drawVertexBeam(len, angle) {
  push();
  rotate(angle);
  beginShape();
  for (let i = 0; i < 60; i += 10) { // fewer points = smoother
    let v = 2 * i + i * sin(frameCount * 0.05 + angle); // slower oscillation
    vertex(0, -v);
    ellipse(0, -v, 4);
  }
  endShape();
  pop();
}

//random bacterias
function drawCircleEffect() {
  let c = map(cos(frameCount * 0.01), -1, 1, 0, 100);
  stroke(0, 0, 255)
  fill(255, 0, 0);
  circle(random(0, 800), random(0, 800), 40)
  noStroke()
  textSize(32);
  textAlign(CENTER);
  text('Angry Pac!', width / 2, 50);
}

function mousePressed() {
  if (eatCounter >= 5) {  // PAC has evolved
    let d = dist(mouseX, mouseY, pacX, pacY);

    if (d < pacSize / 2) {
      if (angry == true) {
        angry = false;
      } else {
        angry = true;
      }
    } else {
      dotX = mouseX;
      dotY = mouseY;
      dotVisible = true;
    }
  } else {
    dotX = mouseX;
    dotY = mouseY;
    dotVisible = true;
  }
}
