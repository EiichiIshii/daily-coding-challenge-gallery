let canvas;
let num = 30;
let sc = new Array(num);
let W;

function canvasSetup() {
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasSetup();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');
  canvasSetup();

  W = width / 3;

  for (let i = 0; i < num; i++) {
    sc[i] = new scene();
  }
}

function draw() {
  background(0);

  for (let i = 0; i < num; i++) {
    sc[i].update();
    sc[i].display();
  }
}

class scene {
  constructor() {
    this.mx = random(width);
    this.my = random(height);
    this.amx = random(-1, 1);
    this.amy = random(-1, 1);
    this.mr = random(width / 100, width / 10);
    this.xnoise = random(-W, W);
    this.ynoise = random(-W, W);
    this.tin = random(100);
    this.amt = random(-10, 10);
  }

  update() {
    this.mx += this.amx;
    this.my += this.amy;
    if (this.mx > width || this.my < 0) {
      this.amx = -this.amx;
      this.amy = -this.amy;
    }

    this.tin += this.amt;
    if (this.tin < 0 || this.tin > 100) {
      this.amt = -this.amt;
    }
  }

  display() {
    fill(255, this.tin);
    noStroke();
    let adx = map(noise(this.xnoise), 0, 1, -W, W);
    let ady = map(noise(this.ynoise), 0, 1, -W, W);
    for (let r = this.mr; r >= 0; r -= this.mr / 30) {
      ellipse(this.mx + adx, this.my + ady, r, r);
    }

    this.xnoise += 0.004;
    this.ynoise += 0.004;
  }
}
