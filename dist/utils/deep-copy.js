"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCopy = void 0;

var deepCopy = function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
};

exports.deepCopy = deepCopy;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(deepCopy, "deepCopy", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/deep-copy.js");
}();

;