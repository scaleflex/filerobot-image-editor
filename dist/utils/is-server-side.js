"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isServerSide = void 0;
var isServerSide = typeof window === 'undefined' || typeof CanvasRenderingContext2D === 'undefined';
exports.isServerSide = isServerSide;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isServerSide, "isServerSide", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/is-server-side.js");
}();

;