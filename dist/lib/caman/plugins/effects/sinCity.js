"use strict";

Caman.Filter.register("sinCity", function () {
  this.contrast(100);
  this.brightness(15);
  this.exposure(10);
  this.posterize(80);
  this.clip(30);
  return this.greyscale();
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;