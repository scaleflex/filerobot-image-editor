"use strict";

Caman.Filter.register("pinhole", function () {
  this.greyscale();
  this.sepia(10);
  this.exposure(10);
  this.contrast(15);
  return this.vignette("60%", 35);
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;