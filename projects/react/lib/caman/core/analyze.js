/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Various image analysis methods
class Analyze {
  constructor(c) {
    this.c = c;
  }

  // Calculates the number of occurances of each color value throughout the image.
  // @return {Object} Hash of RGB channels and the occurance of each value
  calculateLevels() {
    let i;
    let end;
    const levels = {
      r: {},
      g: {},
      b: {}
    };

    // Initialize all values to 0 first so there are no data gaps
    for (i = 0; i <= 255; i++) {
      levels.r[i] = 0;
      levels.g[i] = 0;
      levels.b[i] = 0;
    }

    // Iterate through each pixel block and increment the level counters
    for (i = 0, end = this.c.pixelData.length; i < end; i += 4) {
      levels.r[this.c.pixelData[i]]++;
      levels.g[this.c.pixelData[i+1]]++;
      levels.b[this.c.pixelData[i+2]]++;
    }

    // Normalize all of the numbers by converting them to percentages between
    // 0 and 1.0
    const numPixels = this.c.pixelData.length / 4;

    for (i = 0; i <= 255; i++) {
      levels.r[i] /= numPixels;
      levels.g[i] /= numPixels;
      levels.b[i] /= numPixels;
    }

    return levels;
  }
}

Caman.Analyze = Analyze;