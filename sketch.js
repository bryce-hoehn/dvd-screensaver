let dvdLogo;

// Array 1: the DVD logo object
let dvd = {
  x: 100,
  y: 100,
  // played around via trial and error until I got speeds that felt right
  xSpeed: 1.5,
  ySpeed: 1.5,
  width: 128,
  height: 64
};

// Array 2: the color palette for tinting the logo
let colorPalette = [];

let colorIndex = 0;  // keep track of current color

function preload() {
  // Load black logo
  dvdLogo = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DVD-Video_Logo.svg/512px-DVD-Video_Logo.svg.png');
}

function setup() {
  createCanvas(512, 512);
  background(0);

  // Invert logo colors to white
  invertLogoColors(dvdLogo);

  // Loop 1
  // Generate 8 random colors for the palette
  for (let i = 0; i < 8; i++) {
    colorPalette.push(color(random(50, 255), random(50, 255), random(50, 255)));
  }
}

function draw() {
  background(0); // solid black background

  tint(colorPalette[colorIndex]); // use current color
  image(dvdLogo, dvd.x, dvd.y, dvd.width, dvd.height);

  // Move the logo
  dvd.x += dvd.xSpeed;
  dvd.y += dvd.ySpeed;

  let hit = false;

  // Conditional 1: bounce off left/right edges
  if (dvd.x <= 0 || dvd.x + dvd.width >= width) {
    dvd.xSpeed *= -1;
    hit = true;
  }

  // Conditional 2: bounce off top/bottom edges
  if (dvd.y <= 0 || dvd.y + dvd.height >= height) {
    dvd.ySpeed *= -1;
    hit = true;
  }

  // Conditional 3
  // Iterate to the next color in the palette on bounce
  if (hit) {
    colorIndex = (colorIndex + 1) % colorPalette.length;
  }
}

// Inverts black pixels to white so tint() works
function invertLogoColors(img) {
  img.loadPixels();
  
  // Loop 2
  for (let i = 0; i < img.pixels.length; i += 4) {
    img.pixels[i] = 255 - img.pixels[i];       // R
    img.pixels[i + 1] = 255 - img.pixels[i + 1]; // G
    img.pixels[i + 2] = 255 - img.pixels[i + 2]; // B
  }
  img.updatePixels();
}
