import { Util } from '../../core/util';

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
/*
CompoundBlur - Blurring with varying radii for Canvas

Version:   0.1
Author:  Mario Klingemann
Contact:   mario@quasimondo.com
Website:  http://www.quasimondo.com/StackBlurForCanvas
Twitter:  @quasimondo
Modified By: Ryan LeFevre (@meltingice)

In case you find this class useful - especially in commercial projects -
I am not totally unhappy for a small donation to my PayPal account
mario@quasimondo.de

Copyright (c) 2011 Mario Klingemann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

// Wrapping this in a closure since there's a bunch of extra functions this plugin requires
// and we don't want them clogging up the global scope.
(function() {
  const mul_table = [
    512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];


  const shg_table = [
    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

  const getLinearGradientMap = function(width, height, centerX, centerY, angle, length, mirrored) {
    const cnv = document.createElement('canvas');
    cnv.width = width;
    cnv.height = height;

    const x1 = centerX + (Math.cos(angle) * length * 0.5);
    const y1 = centerY + (Math.sin(angle) * length * 0.5);

    const x2 = centerX - (Math.cos(angle) * length * 0.5);
    const y2 = centerY - (Math.sin(angle) * length * 0.5);

    const context = cnv.getContext("2d");
    const gradient = context.createLinearGradient(x1, y1, x2, y2);
    if (!mirrored) {
      gradient.addColorStop(0, "white");
      gradient.addColorStop(1, "black");
    } else {
      gradient.addColorStop(0, "white");
      gradient.addColorStop(0.5, "black");
      gradient.addColorStop(1, "white");
    }

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    return context.getImageData(0, 0, width, height);
  };

  const getRadialGradientMap = function(width, height, centerX, centerY, radius1, radius2) {
    const cnv = document.createElement('canvas');
    cnv.width = width;
    cnv.height = height;

    const context = cnv.getContext("2d");
    const gradient = context.createRadialGradient(centerX, centerY, radius1, centerX, centerY, radius2);

    gradient.addColorStop(1, "white");
    gradient.addColorStop(0, "black");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    return context.getImageData(0, 0, width, height);
  };

  const BlurStack = function() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    return this.next = null;
  };

  Caman.Plugin.register("compoundBlur", function(radiusData, radius, increaseFactor, blurLevels) {
    let i;
    let asc, end;
    const { width } = this.dimensions;
    const { height } = this.dimensions;

    const imagePixels = this.pixelData;
    const radiusPixels = radiusData.data;

    const wh = width * height;
    const wh4 = wh << 2;
    const pixels = [];

    for (i = 0, end = wh4, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) { pixels[i] = imagePixels[i]; }

    let currentIndex = 0;
    let steps = blurLevels;
    blurLevels -= 1;

    while (steps-- >= 0) {
      var asc1, end1;
      var b_in_sum, b_out_sum, b_sum, g_in_sum, g_out_sum, g_sum, p, pb, pg, pr, r_in_sum, r_out_sum, r_sum, rbs, x, y, yi;
      var asc2, end2;
      var asc6, end6;
      let iradius = (radius + 0.5) | 0;
      if (iradius === 0) { continue; }
      if (iradius > 256) { iradius = 256; }

      const div = iradius + iradius + 1;
      const w4 = width << 2;
      const widthMinus1 = width - 1;
      const heightMinus1 = height - 1;
      const radiusPlus1 = iradius + 1;
      const sumFactor = (radiusPlus1 * (radiusPlus1 + 1)) / 2;

      const stackStart = new BlurStack();
      let stackEnd = undefined;
      let stack = stackStart;

      for (i = 1, end1 = div, asc1 = 1 <= end1; asc1 ? i < end1 : i > end1; asc1 ? i++ : i--) {
        stack = (stack.next = new BlurStack());
        if (i === radiusPlus1) { stackEnd = stack; }
      }

      stack.next = stackStart;
      let stackIn = null;
      let stackOut = null;

      let yw = (yi = 0);

      const mul_sum = mul_table[iradius];
      const shg_sum = shg_table[iradius];

      for (y = 0, end2 = height, asc2 = 0 <= end2; asc2 ? y < end2 : y > end2; asc2 ? y++ : y--) {
        var asc3, end3;
        var asc4, end4;
        var asc5, end5;
        r_in_sum = (g_in_sum = (b_in_sum = (r_sum = (g_sum = (b_sum = 0)))));

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0, end3 = radiusPlus1, asc3 = 0 <= end3; asc3 ? i < end3 : i > end3; asc3 ? i++ : i--) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }

        for (i = 1, end4 = radiusPlus1, asc4 = 1 <= end4; asc4 ? i < end4 : i > end4; asc4 ? i++ : i--) {
          p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
          r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
          b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;

          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;

          stack = stack.next;
        }

        stackIn = stackStart;
        stackOut = stackEnd;

        for (x = 0, end5 = width, asc5 = 0 <= end5; asc5 ? x < end5 : x > end5; asc5 ? x++ : x--) {
          pixels[yi] = (r_sum * mul_sum) >> shg_sum;
          pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
          pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;

          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;

          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;

          p = (yw + ((p = x + radiusPlus1) < widthMinus1 ? p : widthMinus1)) << 2;

          r_in_sum += (stackIn.r = pixels[p]);
          g_in_sum += (stackIn.g = pixels[p + 1]);
          b_in_sum += (stackIn.b = pixels[p + 2]);

          r_sum += r_in_sum;
          g_sum += g_in_sum;
          b_sum += b_in_sum;

          stackIn = stackIn.next;

          r_out_sum += (pr = stackOut.r);
          g_out_sum += (pg = stackOut.g);
          b_out_sum += (pb = stackOut.b);

          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;

          stackOut = stackOut.next;

          yi += 4;
        }

        yw += width;
      }

      for (x = 0, end6 = width, asc6 = 0 <= end6; asc6 ? x < end6 : x > end6; asc6 ? x++ : x--) {
        var asc7, end7;
        var asc8, end8;
        var asc9, end9;
        g_in_sum = (b_in_sum = (r_in_sum = (g_sum = (b_sum = (r_sum = 0)))));

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0, end7 = radiusPlus1, asc7 = 0 <= end7; asc7 ? i < end7 : i > end7; asc7 ? i++ : i--) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }

        let yp = width;

        for (i = 1, end8 = radiusPlus1, asc8 = 1 <= end8; asc8 ? i < end8 : i > end8; asc8 ? i++ : i--) {
          yi = (yp + x) << 2;
          r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
          b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;
          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          stack = stack.next;
          if (i < heightMinus1) { yp += width; }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;

        for (y = 0, end9 = height, asc9 = 0 <= end9; asc9 ? y < end9 : y > end9; asc9 ? y++ : y--) {
          p = yi << 2;
          pixels[p] = (r_sum * mul_sum) >> shg_sum;
          pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
          pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;

          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;

          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;

          p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

          r_sum += (r_in_sum += (stackIn.r = pixels[p]));
          g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
          b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));

          stackIn = stackIn.next;

          r_out_sum += (pr = stackOut.r);
          g_out_sum += (pg = stackOut.g);
          b_out_sum += (pb = stackOut.b);

          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;

          stackOut = stackOut.next;

          yi += width;
        }
      }

      radius *= increaseFactor;

      i = wh;
      while (--i > -1) {
        const idx = i << 2;
        const lookupValue = ((radiusPixels[idx + 2] & 0xff) / 255.0) * blurLevels;
        const index = lookupValue | 0;

        if (index === currentIndex) {
          const blend = 256.0 * (lookupValue - (lookupValue | 0));
          const iblend = 256 - blend;

          imagePixels[idx] = ((imagePixels[idx] * iblend) + (pixels[idx] * blend)) >> 8;
          imagePixels[idx + 1] = ((imagePixels[idx + 1] * iblend) + (pixels[idx + 1] * blend)) >> 8;
          imagePixels[idx + 2] = ((imagePixels[idx + 2] * iblend) + (pixels[idx + 2] * blend)) >> 8;
        } else if (index === (currentIndex + 1)) {
          imagePixels[idx] = pixels[idx];
          imagePixels[idx + 1] = pixels[idx + 1];
          imagePixels[idx + 2] = pixels[idx + 2];
        }
      }
      currentIndex++;
    }

    return this;
  });

  Caman.Filter.register("tiltShift", function(opts) {
    const defaults = {
      center: {
        x: this.dimensions.width / 2,
        y: this.dimensions.height / 2
      },
      angle: 45,
      focusWidth: 200,
      startRadius: 3,
      radiusFactor: 1.5,
      steps: 3
    };

    opts = Util.extend(defaults, opts);
    opts.angle *= Math.PI / 180;
    const gradient = getLinearGradientMap(this.dimensions.width, this.dimensions.height, opts.center.x, opts.center.y, opts.angle, opts.focusWidth, true);

    return this.processPlugin("compoundBlur", [gradient, opts.startRadius, opts.radiusFactor, opts.steps]);
  });

  return Caman.Filter.register("radialBlur", function(opts) {
    const defaults = {
      size: 50,
      center: {
        x: this.dimensions.width / 2,
        y: this.dimensions.height / 2
      },
      startRadius: 3,
      radiusFactor: 1.5,
      steps: 3,
      radius: null
    };

    opts = Util.extend(defaults, opts);

    if (!opts.radius) {
      opts.radius = this.dimensions.width < this.dimensions.height ? this.dimensions.height : this.dimensions.width;
    }

    const radius1 = (opts.radius / 2) - opts.size;
    const radius2 = (opts.radius / 2);

    const gradient = getRadialGradientMap(this.dimensions.width, this.dimensions.height, opts.center.x, opts.center.y, radius1, radius2);

    return this.processPlugin("compoundBlur", [gradient, opts.startRadius, opts.radiusFactor, opts.steps]);
  });
})();
          