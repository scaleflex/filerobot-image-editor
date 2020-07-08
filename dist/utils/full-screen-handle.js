"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleModalFullscreen = void 0;

var _config = require("../config");

var toggleModalFullscreen = function toggleModalFullscreen() {
  document.fullscreenElement = document.fullscreenElement || document.mozFullscreenElement || document.msFullscreenElement || document.webkitFullscreenDocument;
  document.exitFullscreen = document.exitFullscreen || document.mozExitFullscreen || document.msExitFullscreen || document.webkitExitFullscreen;
  var modal = document.getElementById(_config.MODAL_ID);
  modal.requestFullscreen = modal.requestFullscreen || modal.mozRequestFullscreen || modal.msRequestFullscreen || modal.webkitRequestFullscreen;

  if (!document.fullscreenElement) {
    modal.requestFullscreen().catch(function (err) {
      alert("Error attempting to enable full-screen mode: ".concat(err.message, " (").concat(err.name, ")"));
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

exports.toggleModalFullscreen = toggleModalFullscreen;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(toggleModalFullscreen, "toggleModalFullscreen", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/full-screen-handle.js");
}();

;