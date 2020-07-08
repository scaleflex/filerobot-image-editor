"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Tons of color conversion utility functions.
var Convert = /*#__PURE__*/function () {
  function Convert() {
    _classCallCheck(this, Convert);
  }

  _createClass(Convert, null, [{
    key: "hexToRGB",
    // Converts the hex representation of a color to RGB values.
    // Hex value can optionally start with the hash (#).
    //
    // @param  [String] hex  The colors hex value
    // @return [Array]       The RGB representation
    value: function hexToRGB(hex) {
      if (hex.charAt(0) === "#") {
        hex = hex.substr(1);
      }

      var r = parseInt(hex.substr(0, 2), 16);
      var g = parseInt(hex.substr(2, 2), 16);
      var b = parseInt(hex.substr(4, 2), 16);
      return {
        r: r,
        g: g,
        b: b
      };
    } // Converts an RGB color to HSL.
    // Assumes r, g, and b are in the set [0, 255] and
    // returns h, s, and l in the set [0, 1].
    //
    // @overload rgbToHSL(r, g, b)
    //   @param   [Number]  r   Red channel
    //   @param   [Number]  g   Green channel
    //   @param   [Number]  b   Blue channel
    //
    // @overload rgbToHSL(rgb)
    //   @param [Object] rgb The RGB object.
    //   @option rgb [Number] r The red channel.
    //   @option rgb [Number] g The green channel.
    //   @option rgb [Number] b The blue channel.
    //
    // @return  [Array]       The HSL representation

  }, {
    key: "rgbToHSL",
    value: function rgbToHSL(r, g, b) {
      var h, s;

      if (_typeof(r) === "object") {
        var _r = r;
        g = _r.g;
        var _r2 = r;
        b = _r2.b;
        var _r3 = r;
        r = _r3.r;
      }

      r /= 255;
      g /= 255;
      b /= 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        h = function () {
          switch (max) {
            case r:
              return (g - b) / d + (g < b ? 6 : 0);

            case g:
              return (b - r) / d + 2;

            case b:
              return (r - g) / d + 4;
          }
        }();

        h /= 6;
      }

      return {
        h: h,
        s: s,
        l: l
      };
    } // Converts an HSL color value to RGB. Conversion formula
    // adapted from http://en.wikipedia.org/wiki/HSL_color_space.
    // Assumes h, s, and l are contained in the set [0, 1] and
    // returns r, g, and b in the set [0, 255].
    //
    // @overload hslToRGB(h, s, l)
    //   @param   [Number]  h       The hue
    //   @param   [Number]  s       The saturation
    //   @param   [Number]  l       The lightness
    //
    // @overload hslToRGB(hsl)
    //   @param [Object] hsl The HSL object.
    //   @option hsl [Number] h The hue.
    //   @option hsl [Number] s The saturation.
    //   @option hsl [Number] l The lightness.
    //
    // @return  [Array]           The RGB representation

  }, {
    key: "hslToRGB",
    value: function hslToRGB(h, s, l) {
      var b, g, r;

      if (_typeof(h) === "object") {
        var _h = h;
        s = _h.s;
        var _h2 = h;
        l = _h2.l;
        var _h3 = h;
        h = _h3.h;
      }

      if (s === 0) {
        r = g = b = l;
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = this.hueToRGB(p, q, h + 1 / 3);
        g = this.hueToRGB(p, q, h);
        b = this.hueToRGB(p, q, h - 1 / 3);
      }

      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
    } // Converts from the hue color space back to RGB.
    //
    // @param [Number] p
    // @param [Number] q
    // @param [Number] t
    // @return [Number] RGB value

  }, {
    key: "hueToRGB",
    value: function hueToRGB(p, q, t) {
      if (t < 0) {
        t += 1;
      }

      if (t > 1) {
        t -= 1;
      }

      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }

      if (t < 1 / 2) {
        return q;
      }

      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }

      return p;
    } // Converts an RGB color value to HSV. Conversion formula
    // adapted from {http://en.wikipedia.org/wiki/HSV_color_space}.
    // Assumes r, g, and b are contained in the set [0, 255] and
    // returns h, s, and v in the set [0, 1].
    //
    // @param   [Number]  r       The red color value
    // @param   [Number]  g       The green color value
    // @param   [Number]  b       The blue color value
    // @return  [Array]           The HSV representation

  }, {
    key: "rgbToHSV",
    value: function rgbToHSV(r, g, b) {
      var h;
      r /= 255;
      g /= 255;
      b /= 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var v = max;
      var d = max - min;
      var s = max === 0 ? 0 : d / max;

      if (max === min) {
        h = 0;
      } else {
        h = function () {
          switch (max) {
            case r:
              return (g - b) / d + (g < b ? 6 : 0);

            case g:
              return (b - r) / d + 2;

            case b:
              return (r - g) / d + 4;
          }
        }();

        h /= 6;
      }

      return {
        h: h,
        s: s,
        v: v
      };
    } // Converts an HSV color value to RGB. Conversion formula
    // adapted from http://en.wikipedia.org/wiki/HSV_color_space.
    // Assumes h, s, and v are contained in the set [0, 1] and
    // returns r, g, and b in the set [0, 255].
    //
    // @param   [Number]  h       The hue
    // @param   [Number]  s       The saturation
    // @param   [Number]  v       The value
    // @return  [Array]           The RGB representation

  }, {
    key: "hsvToRGB",
    value: function hsvToRGB(h, s, v) {
      var b, g, r;
      var i = Math.floor(h * 6);
      var f = h * 6 - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;

        case 1:
          r = q;
          g = v;
          b = p;
          break;

        case 2:
          r = p;
          g = v;
          b = t;
          break;

        case 3:
          r = p;
          g = q;
          b = v;
          break;

        case 4:
          r = t;
          g = p;
          b = v;
          break;

        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }

      return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
      };
    } // Converts a RGB color value to the XYZ color space. Formulas
    // are based on http://en.wikipedia.org/wiki/SRGB assuming that
    // RGB values are sRGB.
    //
    // Assumes r, g, and b are contained in the set [0, 255] and
    // returns x, y, and z.
    //
    // @param   [Number]  r       The red color value
    // @param   [Number]  g       The green color value
    // @param   [Number]  b       The blue color value
    // @return  [Array]           The XYZ representation

  }, {
    key: "rgbToXYZ",
    value: function rgbToXYZ(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;

      if (r > 0.04045) {
        r = Math.pow((r + 0.055) / 1.055, 2.4);
      } else {
        r /= 12.92;
      }

      if (g > 0.04045) {
        g = Math.pow((g + 0.055) / 1.055, 2.4);
      } else {
        g /= 12.92;
      }

      if (b > 0.04045) {
        b = Math.pow((b + 0.055) / 1.055, 2.4);
      } else {
        b /= 12.92;
      }

      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return {
        x: x * 100,
        y: y * 100,
        z: z * 100
      };
    } // Converts a XYZ color value to the sRGB color space. Formulas
    // are based on http://en.wikipedia.org/wiki/SRGB and the resulting
    // RGB value will be in the sRGB color space.
    // Assumes x, y and z values are whatever they are and returns
    // r, g and b in the set [0, 255].
    //
    // @param   [Number]  x       The X value
    // @param   [Number]  y       The Y value
    // @param   [Number]  z       The Z value
    // @return  [Array]           The RGB representation

  }, {
    key: "xyzToRGB",
    value: function xyzToRGB(x, y, z) {
      x /= 100;
      y /= 100;
      z /= 100;
      var r = 3.2406 * x + -1.5372 * y + -0.4986 * z;
      var g = -0.9689 * x + 1.8758 * y + 0.0415 * z;
      var b = 0.0557 * x + -0.2040 * y + 1.0570 * z;

      if (r > 0.0031308) {
        r = 1.055 * Math.pow(r, 0.4166666667) - 0.055;
      } else {
        r *= 12.92;
      }

      if (g > 0.0031308) {
        g = 1.055 * Math.pow(g, 0.4166666667) - 0.055;
      } else {
        g *= 12.92;
      }

      if (b > 0.0031308) {
        b = 1.055 * Math.pow(b, 0.4166666667) - 0.055;
      } else {
        b *= 12.92;
      }

      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
    } // Converts a XYZ color value to the CIELAB color space. Formulas
    // are based on http://en.wikipedia.org/wiki/Lab_color_space
    // The reference white point used in the conversion is D65.
    // Assumes x, y and z values are whatever they are and returns
    // L*, a* and b* values
    //
    // @overload xyzToLab(x, y, z)
    //   @param   [Number]  x       The X value
    //   @param   [Number]  y       The Y value
    //   @param   [Number]  z       The Z value
    //
    // @overload xyzToLab(xyz)
    //   @param [Object] xyz The XYZ object.
    //   @option xyz [Number] x The X value.
    //   @option xyz [Number] y The Y value.
    //   @option xyz [Number] z The z value.
    //
    // @return [Array] The Lab representation

  }, {
    key: "xyzToLab",
    value: function xyzToLab(x, y, z) {
      if (_typeof(x) === "object") {
        var _x = x;
        y = _x.y;
        var _x2 = x;
        z = _x2.z;
        var _x3 = x;
        x = _x3.x;
      }

      var whiteX = 95.047;
      var whiteY = 100.0;
      var whiteZ = 108.883;
      x /= whiteX;
      y /= whiteY;
      z /= whiteZ;

      if (x > 0.008856451679) {
        x = Math.pow(x, 0.3333333333);
      } else {
        x = 7.787037037 * x + 0.1379310345;
      }

      if (y > 0.008856451679) {
        y = Math.pow(y, 0.3333333333);
      } else {
        y = 7.787037037 * y + 0.1379310345;
      }

      if (z > 0.008856451679) {
        z = Math.pow(z, 0.3333333333);
      } else {
        z = 7.787037037 * z + 0.1379310345;
      }

      var l = 116 * y - 16;
      var a = 500 * (x - y);
      var b = 200 * (y - z);
      return {
        l: l,
        a: a,
        b: b
      };
    } // Converts a L*, a*, b* color values from the CIELAB color space
    // to the XYZ color space. Formulas are based on
    // http://en.wikipedia.org/wiki/Lab_color_space
    //
    // The reference white point used in the conversion is D65.
    // Assumes L*, a* and b* values are whatever they are and returns
    // x, y and z values.
    //
    // @overload labToXYZ(l, a, b)
    //   @param   [Number]  l       The L* value
    //   @param   [Number]  a       The a* value
    //   @param   [Number]  b       The b* value
    //
    // @overload labToXYZ(lab)
    //   @param [Object] lab The LAB values
    //   @option lab [Number] l The L* value.
    //   @option lab [Number] a The a* value.
    //   @option lab [Number] b The b* value.
    //
    // @return  [Array]           The XYZ representation

  }, {
    key: "labToXYZ",
    value: function labToXYZ(l, a, b) {
      if (_typeof(l) === "object") {
        var _l = l;
        a = _l.a;
        var _l2 = l;
        b = _l2.b;
        var _l3 = l;
        l = _l3.l;
      }

      var y = (l + 16) / 116;
      var x = y + a / 500;
      var z = y - b / 200;

      if (x > 0.2068965517) {
        x = x * x * x;
      } else {
        x = 0.1284185493 * (x - 0.1379310345);
      }

      if (y > 0.2068965517) {
        y = y * y * y;
      } else {
        y = 0.1284185493 * (y - 0.1379310345);
      }

      if (z > 0.2068965517) {
        z = z * z * z;
      } else {
        z = 0.1284185493 * (z - 0.1379310345);
      } // D65 reference white point


      return {
        x: x * 95.047,
        y: y * 100.0,
        z: z * 108.883
      };
    } // Converts L*, a*, b* back to RGB values.
    //
    // @see Convert.rgbToXYZ
    // @see Convert.xyzToLab

  }, {
    key: "rgbToLab",
    value: function rgbToLab(r, g, b) {
      if (_typeof(r) === "object") {
        var _r4 = r;
        g = _r4.g;
        var _r5 = r;
        b = _r5.b;
        var _r6 = r;
        r = _r6.r;
      }

      var xyz = this.rgbToXYZ(r, g, b);
      return this.xyzToLab(xyz);
    }
  }, {
    key: "labToRGB",
    value: function labToRGB(l, a, b) {}
  }]);

  return Convert;
}();

Caman.Convert = Convert;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Convert, "Convert", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/convert.js");
}();

;