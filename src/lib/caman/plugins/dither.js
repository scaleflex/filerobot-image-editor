/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
/*
Dither - a plugin for CamanJS
by Andy Isaacson
andygetshismail@gmail.com

based on info from:
http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
... and some other sources
*/

Caman.Filter.register("dither", function(algo) {
  if (algo == null) { algo = "floyd-steinberg"; }
  return this.processPlugin("dither", [algo]);
});


Caman.Plugin.register("dither", function(algo) {
  let x, y;
  let asc2, end2;
  let asc4, end4;
  let asc8, end8;
  let i, j;
  const pixels = this.pixelData;
  const { width } = this.dimensions;
  const { height } = this.dimensions;

  const output = ((() => {
    let asc, end;
    const result = [];
    for (i = 0, end = width, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
      result.push(((() => {
        let asc1, end1;
        const result1 = [];
        for (j = 0, end1 = height, asc1 = 0 <= end1; asc1 ? j < end1 : j > end1; asc1 ? j++ : j--) {
          result1.push(0);
        }
        return result1;
      })()));
    }
    return result;
  })());

  // configurable for !floyd-steinberg
  const algos = {
    "floyd-steinberg": {
      matrix: [[0,0,7],[3,5,1]],
      divisor: 16
    },
    "jarvis-judice-ninke": {
      matrix: [[0,0,0,7,5],[3,5,7,5,3],[1,3,5,3,1]],
      divisor: 48
    },
    "stucki": {
      matrix: [[0,0,0,8,4], [2,4,8,4,2], [1,2,4,2,1]],
      divisor: 42
    },
    "atkinson": {
      matrix: [[0,0,0,1,1], [0,1,1,1,0], [0,0,1,0,0]],
      divisor: 8
    },
    "burkes": {
      matrix: [[0,0,0,8,4],[2,4,8,4,2]],
      divisor: 32
    },
    "sierra": {
      matrix: [[0,0,0,5,3],[2,4,5,4,2], [0,2,3,2,0]],
      divisor: 32
    },
    "two-row-sierra": {
      matrix: [[0,0,0,4,3],[1,2,3,2,1]],
      divisor: 16
    },
    "sierra-lite": {
      matrix: [[0,0,2],[1,1,0]],
      divisor: 4
    }
  };

  const curAlgo = algos[algo];

  // Make sure we know to subtract a pixel, so as to contribute to the down-left of the current pixel
  const matrixWidthAdj = Math.floor(curAlgo.matrix[0].length/2);

  const ind = (x,y) => {
    return ((y*width) + x) * 4;
  };

  // First convert the image into grayscale
  for (y = 0, end2 = height, asc2 = 0 <= end2; asc2 ? y < end2 : y > end2; asc2 ? y++ : y--) {
    var asc3, end3;
    for (x = 0, end3 = width, asc3 = 0 <= end3; asc3 ? x < end3 : x > end3; asc3 ? x++ : x--) {
      // Unpack the RGB color channels for each pixel from the flat array
      const r = pixels[ind(x,y)];
      const g = pixels[ind(x,y) + 1];
      const b = pixels[ind(x,y) + 2];

      // The formula used to convert color to grayscale is a more accurate representation
      // of how our eyes see color.  See http://en.wikipedia.org/wiki/Lab_color_space
      const luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
      output[x][y] = luminance;
    }
  }

  // Now derive the B/W output into the output array
  for (y = 0, end4 = height, asc4 = 0 <= end4; asc4 ? y < end4 : y > end4; asc4 ? y++ : y--) {
    var asc5, end5;
    for (x = 0, end5 = width, asc5 = 0 <= end5; asc5 ? x < end5 : x > end5; asc5 ? x++ : x--) {
      // Determine whether this pixel is black or white by taking the initial luminance
      // plus the partial errors contributed by the surrounding pixels
      var asc6, end6;
      const newVal = output[x][y] > 128 ? 255 : 0;

      // The difference between the current value and the full B/W value will determine
      // the magnitude of the error we pass along to the neighboring pixels.  Since we only
      // pass on fractions with a common divisor, divide it now too.
      const clampedVal = Math.max(0, Math.min(output[x][y], 255));
      const error = (clampedVal - newVal) / curAlgo.divisor;
      output[x][y] = newVal;

      for (i = 0, end6 = curAlgo.matrix.length, asc6 = 0 <= end6; asc6 ? i < end6 : i > end6; asc6 ? i++ : i--) {
        var asc7, end7;
        for (j = 0, end7 = curAlgo.matrix[i].length, asc7 = 0 <= end7; asc7 ? j < end7 : j > end7; asc7 ? j++ : j--) {
          const errorX = (x + j) - matrixWidthAdj;
          const errorY = y + i;

          // Bounds checking - don't want to write past the end of the array
          if (!(errorX < 0) && !(errorX >= width) && !(errorY >= height)) {
            output[errorX][errorY] += error * curAlgo.matrix[i][j];
          }
        }
      }
    }
  }

  // Now copy the output array back into our image
  for (y = 0, end8 = height, asc8 = 0 <= end8; asc8 ? y < end8 : y > end8; asc8 ? y++ : y--) {
    var asc9, end9;
    for (x = 0, end9 = width, asc9 = 0 <= end9; asc9 ? x < end9 : x > end9; asc9 ? x++ : x--) {
      const isBlack = output[x][y] < 128;
      const value = isBlack ? 0 : 255;
      pixels[ind(x,y)]     = value;
      pixels[ind(x,y) + 1] = value;
      pixels[ind(x,y) + 2] = value;
    }
  }

  return this;
});
