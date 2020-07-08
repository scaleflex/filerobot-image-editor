"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Various image analysis methods
var Analyze = /*#__PURE__*/function () {
  function Analyze(c) {
    _classCallCheck(this, Analyze);

    this.c = c;
  } // Calculates the number of occurances of each color value throughout the image.
  // @return {Object} Hash of RGB channels and the occurance of each value


  _createClass(Analyze, [{
    key: "calculateLevels",
    value: function calculateLevels() {
      var i;
      var end;
      var levels = {
        r: {},
        g: {},
        b: {}
      }; // Initialize all values to 0 first so there are no data gaps

      for (i = 0; i <= 255; i++) {
        levels.r[i] = 0;
        levels.g[i] = 0;
        levels.b[i] = 0;
      } // Iterate through each pixel block and increment the level counters


      for (i = 0, end = this.c.pixelData.length; i < end; i += 4) {
        levels.r[this.c.pixelData[i]]++;
        levels.g[this.c.pixelData[i + 1]]++;
        levels.b[this.c.pixelData[i + 2]]++;
      } // Normalize all of the numbers by converting them to percentages between
      // 0 and 1.0


      var numPixels = this.c.pixelData.length / 4;

      for (i = 0; i <= 255; i++) {
        levels.r[i] /= numPixels;
        levels.g[i] /= numPixels;
        levels.b[i] /= numPixels;
      }

      return levels;
    }
  }]);

  return Analyze;
}();

Caman.Analyze = Analyze;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Analyze, "Analyze", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/analyze.js");
}();

;