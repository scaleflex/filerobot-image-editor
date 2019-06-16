/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Various math-heavy helpers that are used throughout CamanJS.
class Calculate {
  // Calculates the distance between two points.

  // @param [Number] x1 1st point x-coordinate.
  // @param [Number] y1 1st point y-coordinate.
  // @param [Number] x2 2nd point x-coordinate.
  // @param [Number] y2 2nd point y-coordinate.
  // @return [Number] The distance between the two points.
  static distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  // Generates a pseudorandom number that lies within the max - mix range. The number can be either
  // an integer or a float depending on what the user specifies.

  // @param [Number] min The lower bound (inclusive).
  // @param [Number] max The upper bound (inclusive).
  // @param [Boolean] getFloat Return a Float or a rounded Integer?
  // @return [Number] The pseudorandom number, either as a float or integer.
  static randomRange(min, max, getFloat) {
    if (getFloat == null) { getFloat = false; }
    const rand = min + (Math.random() * (max - min));
    if (getFloat) { return rand.toFixed(getFloat); } else { return Math.round(rand); }
  }

  // Calculates the luminance of a single pixel using a special weighted sum.
  // @param [Object] rgba RGBA object describing a single pixel.
  // @return [Number] The luminance value of the pixel.
  static luminance(rgba) { return (0.299 * rgba.r) + (0.587 * rgba.g) + (0.114 * rgba.b); }

  // Generates a bezier curve given a start and end point, with control points in between.
  // Can also optionally bound the y values between a low and high bound.
  //
  // This is different than most bezier curve functions because it attempts to construct it in such
  // a way that we can use it more like a simple input -> output system, or a one-to-one function.
  // In other words we can provide an input color value, and immediately receive an output modified
  // color value.
  //
  // Note that, by design, this does not force X values to be in the range [0..255]. This is to
  // generalize the function a bit more. If you give it a starting X value that isn't 0, and/or a
  // ending X value that isn't 255, you may run into problems with your filter!
  //
  // @param [Array] 2-item arrays describing the x, y coordinates of the control points. Minimum two.
  // @param [Number] lowBound (optional) Minimum possible value for any y-value in the curve.
  // @param [Number] highBound (optional) Maximum posisble value for any y-value in the curve.
  // @return [Array] Array whose index represents every x-value between start and end, and value
  //   represents the corresponding y-value.
  static bezier(start, ctrl1, ctrl2, end, lowBound, highBound) {
    //(controlPoints, lowBound, highBound) ->
    // 4.0 shim - change declaration to (controlPoints, lowBound, highBound) at 5.0
    let controlPoints;
    if (lowBound == null) { lowBound = 0; }
    if (highBound == null) { highBound = 255; }
    if (start[0] instanceof Array) {
      controlPoints = start;
      lowBound = ctrl1;
      highBound = ctrl2;
    } else {
      controlPoints = [start, ctrl1, ctrl2, end];
    }

    if (controlPoints.length < 2) {
      throw "Invalid number of arguments to bezier";
    }

    let bezier = {};
    const lerp = (a, b, t) => (a * (1 - t)) + (b * t);
    const clamp = (a, min, max) => Math.min(Math.max(a, min), max);

    for (let i = 0; i < 1000; i++) {
      const t = i / 1000;
      let prev = controlPoints;

      while (prev.length > 1) {
        const next = [];

        for (let j = 0, end1 = prev.length - 2, asc = 0 <= end1; asc ? j <= end1 : j >= end1; asc ? j++ : j--) {
          next.push([
            lerp(prev[j][0], prev[j + 1][0], t),
            lerp(prev[j][1], prev[j + 1][1], t)
          ]);
        }

        prev = next;
      }

      bezier[Math.round(prev[0][0])] = Math.round(clamp(prev[0][1], lowBound, highBound));
    }

    const endX = controlPoints[controlPoints.length - 1][0];
    bezier = Caman.Calculate.missingValues(bezier, endX);

    // Edge case
    if ((bezier[endX] == null)) { bezier[endX] = bezier[endX - 1]; }

    return bezier;
  }

  // Generates a hermite curve given a start and end point, with control points in between.
  // Can also optionally bound the y values between a low and high bound.
  //
  // This is different than most hermite curve functions because it attempts to construct it in such
  // a way that we can use it more like a simple input -> output system, or a one-to-one function.
  // In other words we can provide an input color value, and immediately receive an output modified
  // color value.
  //
  // Note that, by design, this does not force X values to be in the range [0..255]. This is to
  // generalize the function a bit more. If you give it a starting X value that isn't 0, and/or a
  // ending X value that isn't 255, you may run into problems with your filter!
  //
  // @param [Array] 2-item arrays describing the x, y coordinates of the control points. Minimum two.
  // @param [Number] lowBound (optional) Minimum possible value for any y-value in the curve.
  // @param [Number] highBound (optional) Maximum possible value for any y-value in the curve.
  // @return [Array] Array whose index represents every x-value between start and end, and value
  //   represents the corresponding y-value.
  static hermite(controlPoints, lowBound, highBound) {
    if (controlPoints.length < 2) {
      throw "Invalid number of arguments to hermite";
    }

    let ret = {};

    const lerp = (a, b, t) => (a * (1 - t)) + (b * t);
    const add = (a, b, c, d) => [a[0] + b[0] + c[0] + d[0], a[1] + b[1] + c[1] + d[1]];
    const mul = (a, b) => [a[0] * b[0], a[1] * b[1]];
    const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
    const clamp = (a, min, max) => Math.min(Math.max(a, min), max);

    let count = 0;
    for (let i = 0, end = controlPoints.length - 2, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
      const p0 = controlPoints[i];
      const p1 = controlPoints[i + 1];

      const pointsPerSegment = p1[0] - p0[0];
      let pointsPerStep = 1 / pointsPerSegment;

      // the last point of the last segment should reach p1
      if(i === (controlPoints.length - 2)) {
        pointsPerStep = 1 / (pointsPerSegment - 1);
      }

      let p = i > 0 ? controlPoints[i - 1] : p0;
      const m0 = mul(sub(p1, p), [0.5, 0.5]);

      p = i < (controlPoints.length - 2) ? controlPoints[i + 2] : p1;
      const m1 = mul(sub(p, p0), [0.5, 0.5]);

      for (let j = 0, end1 = pointsPerSegment, asc1 = 0 <= end1; asc1 ? j <= end1 : j >= end1; asc1 ? j++ : j--) {
        const t = j * pointsPerStep;

        const fac0 = ((2.0 * t * t * t) - (3.0 * t * t)) + 1.0;
        const fac1 = ((t * t * t) - (2.0 * t * t)) + t;
        const fac2 = (-2.0 * t * t * t) + (3.0 * t * t);
        const fac3 = (t * t * t) - (t * t);

        const pos = add(mul(p0, [fac0, fac0]), mul(m0, [fac1, fac1]), mul(p1, [fac2, fac2]), mul(m1, [fac3, fac3]));

        ret[Math.round(pos[0])] = Math.round(clamp(pos[1], lowBound, highBound));

        count += 1;
      }
    }

    // add missing values
    const endX = controlPoints[controlPoints.length - 1][0];
    ret = Caman.Calculate.missingValues(ret, endX);

    return ret;
  }

  // Calculates possible missing values from a given value array. Note that this returns a copy
  // and does not mutate the original. In case no values are missing the original array is
  // returned as that is convenient.
  //
  // @param [Array] 2-item arrays describing the x, y coordinates of the control points.
  // @param [Number] end x value of the array (maximum)
  // @return [Array] Array whose index represents every x-value between start and end, and value
  //   represents the corresponding y-value.
  static missingValues(values, endX) {
    // Do a search for missing values in the bezier array and use linear
    // interpolation to approximate their values
    if (Object.keys(values).length < (endX + 1)) {
      const ret = {};

      for (let i = 0, end = endX, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
        if (values[i] != null) {
          ret[i] = values[i];
        } else {
          var rightCoord;
          const leftCoord = [i - 1, ret[i - 1]];

          // Find the first value to the right. Ideally this loop will break
          // very quickly.
          for (let j = i, end1 = endX, asc1 = i <= end1; asc1 ? j <= end1 : j >= end1; asc1 ? j++ : j--) {
            if (values[j] != null) {
              rightCoord = [j, values[j]];
              break;
            }
          }

          ret[i] = leftCoord[1] +
            (((rightCoord[1] - leftCoord[1]) / (rightCoord[0] - leftCoord[0])) *
              (i - leftCoord[0]));
        }
      }

      return ret;
    }

    return values;
  }
}

Caman.Calculate = Calculate;