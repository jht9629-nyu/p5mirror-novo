// Perlin noise illustration v2
// https://editor.p5js.org/novo/sketches/TKksbuB0G

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
    line(x, mouseY+noiseVal*80, x, height);
  }
  describe(`horizontal wave pattern effected by mouse x-position
    & updating noise values.`);
}



// Returns the Perlin noise value at specified coordinates. Perlin noise is a random sequence generator producing a more naturally ordered, harmonic succession of numbers compared to the standard random() function. It was invented by Ken Perlin in the 1980s and been used since in graphical applications to produce procedural textures, natural motion, shapes, terrains etc.

// The main difference to the random() function is that Perlin noise is defined in an infinite n-dimensional space where each pair of coordinates corresponds to a fixed semi-random value (fixed only for the lifespan of the program; see the noiseSeed() function). p5.js can compute 1D, 2D and 3D noise, depending on the number of coordinates given. The resulting value will always be between 0.0 and 1.0. The noise value can be animated by moving through the noise space as demonstrated in the example above. The 2nd and 3rd dimensions can also be interpreted as time.

// The actual noise is structured similar to an audio signal, in respect to the function's use of frequencies. Similar to the concept of harmonics in physics, Perlin noise is computed over several octaves which are added together for the final result.

// Another way to adjust the character of the resulting sequence is the scale of the input coordinates. As the function works within an infinite space the value of the coordinates doesn't matter as such, only the distance between successive coordinates does (eg. when using noise() within a loop). As a general rule the smaller the difference between coordinates, the smoother the resulting noise sequence will be. Steps of 0.005-0.03 work best for most applications, but this will differ depending on use.



// coding train videos on perlin noise

// I.2: Introduction - Perlin Noise and p5.js Tutorial
// with discussion of octaves 
// https://www.youtube.com/watch?v=Qf4dIN99e2w

// I.3: noise() vs random() - Perlin Noise and p5.js Tutorial

// https://www.youtube.com/watch?v=YcdldZ1E9gU
// I.4: Graphing 1D Perlin Noise - Perlin Noise and p5.js Tutorial

// I.5: 2D Noise - Perlin Noise and p5.js Tutorial
// creation of blur visualiztion of 2D noise
// https://www.youtube.com/watch?v=ikwNrFvnL3g

// I.6: noiseDetail() - Perlin Noise and p5.js Tutorial
// noiseDetail(octaves,falloff) controls number of octaves
// https://www.youtube.com/watch?v=D1BBj2VaBl4

// I.7 : What is OpenSimplex Noise?
// https://www.youtube.com/watch?v=Lv9gyZZJPE0


