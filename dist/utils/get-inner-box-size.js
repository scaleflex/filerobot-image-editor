"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInnerBoxSize = void 0;

var getInnerBoxSize = function getInnerBoxSize(parentElem, originalImg) {
  var parentElemRect = parentElem.getBoundingClientRect();

  var _ref = window.getComputedStyle(parentElem) || {},
      _ref$paddingLeft = _ref.paddingLeft,
      paddingLeft = _ref$paddingLeft === void 0 ? 0 : _ref$paddingLeft,
      _ref$paddingRight = _ref.paddingRight,
      paddingRight = _ref$paddingRight === void 0 ? 0 : _ref$paddingRight,
      _ref$paddingTop = _ref.paddingTop,
      paddingTop = _ref$paddingTop === void 0 ? 0 : _ref$paddingTop,
      _ref$paddingBottom = _ref.paddingBottom,
      paddingBottom = _ref$paddingBottom === void 0 ? 0 : _ref$paddingBottom;

  var pWidth = parentElemRect.width - (parseInt(paddingLeft, 10) || 0) - (parseInt(paddingRight, 10) || 0);
  var pHeight = parentElemRect.height - (parseInt(paddingTop, 10) || 0) - (parseInt(paddingBottom, 10) || 0);
  var width = 0;
  var height = 0;

  if (pWidth >= originalImg.width && pHeight >= originalImg.height) {
    width = originalImg.width;
    height = originalImg.height;
  } else if (pWidth > originalImg.width && pHeight < originalImg.height) {
    height = pHeight;
    width = pHeight * originalImg.ratio;
  } else if (pWidth < originalImg.width && pHeight > originalImg.height) {
    width = pWidth;
    height = pWidth / originalImg.ratio;
  } else {
    var w1 = pWidth;
    var h1 = pWidth / originalImg.ratio;
    var w2 = pHeight * originalImg.ratio;
    var h2 = pHeight;

    if (originalImg.width <= w1 && originalImg.height <= h1) {
      width = w1;
      height = h1;
    } else {
      width = w2;
      height = h2;
    }
  }

  return {
    width: width,
    height: height
  };
};

exports.getInnerBoxSize = getInnerBoxSize;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getInnerBoxSize, "getInnerBoxSize", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-inner-box-size.js");
}();

;