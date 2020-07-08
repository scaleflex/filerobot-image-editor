"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Represents a single Pixel in an image.
var Pixel = /*#__PURE__*/function () {
  _createClass(Pixel, null, [{
    key: "coordinatesToLocation",
    value: function coordinatesToLocation(x, y, width) {
      return (y * width + x) * 4;
    }
  }, {
    key: "locationToCoordinates",
    value: function locationToCoordinates(loc, width) {
      var y = Math.floor(loc / (width * 4));
      var x = loc % (width * 4) / 4;
      return {
        x: x,
        y: y
      };
    }
  }]);

  function Pixel(r, g, b, a) {
    var c = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Pixel);

    if (r == null) {
      r = 0;
    }

    this.r = r;

    if (g == null) {
      g = 0;
    }

    this.g = g;

    if (b == null) {
      b = 0;
    }

    this.b = b;

    if (a == null) {
      a = 255;
    }

    this.a = a;
    this.c = c;
    this.loc = 0;
  }

  _createClass(Pixel, [{
    key: "setContext",
    value: function setContext(c) {
      return this.c = c;
    } // Retrieves the X, Y location of the current pixel. The origin is at the bottom left corner of
    // the image, like a normal coordinate system.

  }, {
    key: "locationXY",
    value: function locationXY() {
      if (this.c == null) {
        throw "Requires a CamanJS context";
      }

      var y = this.c.dimensions.height - Math.floor(this.loc / (this.c.dimensions.width * 4));
      var x = this.loc % (this.c.dimensions.width * 4) / 4;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "pixelAtLocation",
    value: function pixelAtLocation(loc) {
      if (this.c == null) {
        throw "Requires a CamanJS context";
      }

      return new Pixel(this.c.pixelData[loc], this.c.pixelData[loc + 1], this.c.pixelData[loc + 2], this.c.pixelData[loc + 3], this.c);
    } // Returns an RGBA object for a pixel whose location is specified in relation to the current
    // pixel.

  }, {
    key: "getPixelRelative",
    value: function getPixelRelative(horiz, vert) {
      if (this.c == null) {
        throw "Requires a CamanJS context";
      } // We invert the vert_offset in order to make the coordinate system non-inverted. In laymans
      // terms: -1 means down and +1 means up.


      var newLoc = this.loc + this.c.dimensions.width * 4 * (vert * -1) + 4 * horiz;

      if (newLoc > this.c.pixelData.length || newLoc < 0) {
        return new Pixel(0, 0, 0, 255, this.c);
      }

      return this.pixelAtLocation(newLoc);
    } // The counterpart to getPixelRelative, this updates the value of a pixel whose location is
    // specified in relation to the current pixel.

  }, {
    key: "putPixelRelative",
    value: function putPixelRelative(horiz, vert, rgba) {
      if (this.c == null) {
        throw "Requires a CamanJS context";
      }

      var nowLoc = this.loc + this.c.dimensions.width * 4 * (vert * -1) + 4 * horiz;

      if (newLoc > this.c.pixelData.length || newLoc < 0) {
        return;
      }

      this.c.pixelData[newLoc] = rgba.r;
      this.c.pixelData[newLoc + 1] = rgba.g;
      this.c.pixelData[newLoc + 2] = rgba.b;
      this.c.pixelData[newLoc + 3] = rgba.a;
      return true;
    } // Gets an RGBA object for an arbitrary pixel in the canvas specified by absolute X, Y coordinates

  }, {
    key: "getPixel",
    value: function getPixel(x, y) {
      if (this.c == null) {
        throw "Requires a CamanJS context";
      }

      var loc = this.coordinatesToLocation(x, y, this.width);
      return this.pixelAtLocation(loc);
    } // Updates the pixel at the given X, Y coordinate

  }, {
    key: "putPixel",
    value: function putPixel(x, y, rgba) {
      if (this.c == null) {
        throw "Requires a CamanJS context";
      }

      var loc = this.coordinatesToLocation(x, y, this.width);
      this.c.pixelData[loc] = rgba.r;
      this.c.pixelData[loc + 1] = rgba.g;
      this.c.pixelData[loc + 2] = rgba.b;
      return this.c.pixelData[loc + 3] = rgba.a;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.toKey();
    }
  }, {
    key: "toHex",
    value: function toHex(includeAlpha) {
      if (includeAlpha == null) {
        includeAlpha = false;
      }

      var hex = '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);

      if (includeAlpha) {
        return hex + this.a.toString(16);
      } else {
        return hex;
      }
    }
  }]);

  return Pixel;
}();

Caman.Pixel = Pixel;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Pixel, "Pixel", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/pixel.js");
}();

;