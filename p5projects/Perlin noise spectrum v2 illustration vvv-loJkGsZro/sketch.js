// Perlin noise spectrum illustration vvv

let noiseScale=0.03;
// Steps of 0.005-0.03 work best for most applications

function setup() {
  
  createCanvas(520,240);
}

function draw() {
  background(0);
  for (let x=0; x < width; x++) {
    let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
    stroke(noiseVal*255);
    // line(x, mouseY+noiseVal*80, x, height);
        line(x, noiseVal*80, x, height);

  }
  describe(`horizontal wave pattern effected by mouse x-position
    & updating noise values.`);
}



// Returns the Perlin noise value at specified coordinates. Perlin noise is a random sequence generator producing a more naturally ordered, harmonic succession of numbers compared to the standard random() function. It was invented by Ken Perlin in the 1980s and been used since in graphical applications to produce procedural textures, natural motion, shapes, terrains etc.

// The main difference to the random() function is that Perlin noise is defined in an infinite n-dimensional space where each pair of coordinates corresponds to a fixed semi-random value (fixed only for the lifespan of the program; see the noiseSeed() function). p5.js can compute 1D, 2D and 3D noise, depending on the number of coordinates given. The resulting value will always be between 0.0 and 1.0. The noise value can be animated by moving through the noise space as demonstrated in the example above. The 2nd and 3rd dimensions can also be interpreted as time.

// The actual noise is structured similar to an audio signal, in respect to the function's use of frequencies. Similar to the concept of harmonics in physics, Perlin noise is computed over several octaves which are added together for the final result.

// Another way to adjust the character of the resulting sequence is the scale of the input coordinates. As the function works within an infinite space the value of the coordinates doesn't matter as such, only the distance between successive coordinates does (eg. when using noise() within a loop). As a general rule the smaller the difference between coordinates, the smoother the resulting noise sequence will be. Steps of 0.005-0.03 work best for most applications, but this will differ depending on use.