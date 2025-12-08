let s2 = function(p) {

  let img;
  let block = 20;

  p.preload = function() {
    img = p.loadImage("img/hokusai.jpg");
  };

  p.setup = function() {
    let c = p.createCanvas(600, 600, p.WEBGL);
    c.parent("pixelCanvas");
  };

  p.draw = function() {
    p.background(0);
    p.noStroke();
    p.rotateY(p.millis() * 0.0003);

    img.loadPixels();

    for (let x = 0; x < img.width; x += block) {
      for (let y = 0; y < img.height; y += block) {

        let idx = (x + y * img.width) * 4;
        let r = img.pixels[idx];
        let g = img.pixels[idx+1];
        let b = img.pixels[idx+2];

        p.push();
        let z = p.map(b, 0, 255, -80, 80);
        p.translate(x - img.width/2, y - img.height/2, z);
        p.fill(r, g, b);
        p.box(block, block, block * 0.3);
        p.pop();
      }
    }
  };
};

new p5(s2, "pixelCanvas");
