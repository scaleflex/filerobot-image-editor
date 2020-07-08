"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCanvasNode = void 0;

var getCanvasNode = function getCanvasNode() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'scaleflex-image-edit-box';
  return window.document.getElementById(id);
};

exports.getCanvasNode = getCanvasNode;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getCanvasNode, "getCanvasNode", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-canvas-node.js");
}();

;