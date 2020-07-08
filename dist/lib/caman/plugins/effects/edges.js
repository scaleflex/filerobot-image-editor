"use strict";

Caman.Filter.register("edgeEnhance", function () {
  return this.processKernel("Edge Enhance", [0, 0, 0, -1, 1, 0, 0, 0, 0]);
});
Caman.Filter.register("edgeDetect", function () {
  return this.processKernel("Edge Detect", [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
});
Caman.Filter.register("emboss", function () {
  return this.processKernel("Emboss", [-2, -1, 0, -1, 1, 1, 0, 1, 2]);
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;