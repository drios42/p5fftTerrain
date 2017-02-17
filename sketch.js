//all code highly based off of Dan Shiffman's processing tutorials https://www.youtube.com/watch?v=IKB1hWWedMk

var fft;
var mic;
var bands = 512; // resolution of the FFT
var spectrum;
var terrain = [];

var lines = 60;
var scl = 8;
var w = 1024;
var h = 60;
var counter = 0;
var flying = 0;

var r = 255;
var g = 0;
var b = 0;
var angle = 0;

var rotZ;
var ext = 10;

function setup() {
  createCanvas(1440, 900, WEBGL);
 
  fft = new p5.FFT(0.85, bands);
  // create audion in
  mic = new p5.AudioIn();

  //// start the Audio Input
  mic.start();

  //// patch the AudioIn
  fft.setInput(mic);

  for (var y = 0; y < lines; y++) {
    terrain[y] = [];
    for (var x = 0; x < bands; x++) {
      terrain[y][x] = 0;
    }
  }

}

function draw() {
  background(125);
  rotZ = mouseX;

  flying -= 10;
  var yoff = flying;

  var c = color(0, 255, 255);
  stroke(c);
  noFill();
  translate(-width / 2, 0, -40);
  rotateX(radians(-60));

  translate(0, -200);
 
  var spectrum = fft.analyze();

  // update the terrain

  for (var y = 0; y < terrain.length; y++) {
    beginShape();
    for (var x = 0; x < spectrum.length; x++) {

      if (y < lines - 1) {
        if (y > 0) {
          vertex(x * scl, y * scl, terrain[y - 1][x]);
        }
        if (x < bands - 1) {
          vertex(x * scl, (y + 1) * scl, terrain[y][x]);
        }
        if (x < bands - 2) {
          vertex((x + 1) * scl, (y + 1) * scl, terrain[y][x + 1]);
        }
        if (y > 0) {
          vertex(x * scl, y * scl, terrain[y - 1][x]);
        }

      } else {}
    }
    endShape();
  }



  for (var y = lines - 1; y >= 0; y--) {
    terrain[0] = spectrum;
    if (y > 0) {
      if (y < lines) {
        terrain[y] = terrain[y - 1];
      }
    }
  }
}
