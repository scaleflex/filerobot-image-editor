"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWatermarkPosition = void 0;

var getWatermarkPosition = function getWatermarkPosition(watermark, canvas, image) {
  var _watermark$position = watermark.position,
      position = _watermark$position === void 0 ? 'center' : _watermark$position;
  var cw, ch, lw, lh, pw, ph, r;
  var wx, wy, ww, wh;
  var imageRatio = image.width / image.height;
  cw = canvas.width;
  ch = canvas.height;
  lw = cw / 3;
  lh = ch / 3;
  pw = cw / 60;
  ph = ch / 60;

  if (position === 'center') {
    ww = wx = lw;
    wh = ww / imageRatio;
    wy = ch / 2 - wh / 2;

    if (wh > lh) {
      wy = wh = lh;
      ww = wh * imageRatio;
      wx = cw / 2 - ww / 2;
    }
  } else if (position === 'left-bottom') {
    ww = lw - pw * 2;
    wx = pw;
    wh = ww / imageRatio;
    wy = ch - ph - wh;

    if (wh > lh) {
      wh = lh - ph * 2;
      wx = pw;
      ww = wh * imageRatio;
      wy = ch * 2 / 3 + ph;
    }
  } else if (position === 'left-top') {
    ww = lw - pw * 2;
    wx = pw;
    wh = ww / imageRatio;
    wy = ph;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
    }
  } else if (position === 'left-center') {
    ww = lw - pw * 2;
    wx = pw;
    wh = ww / imageRatio;
    wy = ch / 2 - wh / 2;

    if (wh > lh) {
      wy = lh;
      wh = lh;
      ww = wh * imageRatio;
    }
  } else if (position === 'right-top') {
    ww = lw - pw * 2;
    wx = lw * 2 + pw;
    wh = ww / imageRatio;
    wy = ph;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
      wx = cw - pw - ww;
      wy = ph;
    }
  } else if (position === 'right-bottom') {
    ww = lw - pw * 2;
    wx = lw * 2 + pw;
    wh = ww / imageRatio;
    wy = ch - ph - wh;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
      wx = cw - pw - ww;
      wy = ch - lh + ph;
    }
  } else if (position === 'center-top') {
    ww = lw;
    wh = ww / imageRatio;
    wx = lw;
    wy = ph;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
      wx = cw / 2 - ww / 2;
    }
  } else if (position === 'right-center') {
    ww = lw - pw * 2;
    wh = ww / imageRatio;
    wx = 2 * lw + pw;
    wy = ch / 2 - wh / 2;

    if (wh > lh) {
      wh = lh;
      ww = wh * imageRatio;
      wx = cw - pw - ww;
      wy = lh + ph;
    }
  } else if (position === 'center-bottom') {
    ww = lw;
    wh = ww / imageRatio;
    wx = lw;
    wy = ch - ph - wh;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
      wx = cw / 2 - ww / 2;
      wy = ch - lh + ph;
    }
  }

  return [wx, wy, ww, wh];
};

exports.getWatermarkPosition = getWatermarkPosition;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getWatermarkPosition, "getWatermarkPosition", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-watermark-position.js");
}();

;