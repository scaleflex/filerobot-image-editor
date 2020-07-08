"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSecretHeaderName = void 0;

var getSecretHeaderName = function getSecretHeaderName() {
  var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'filerobot';
  return platform === 'filerobot' ? "X-Filerobot-Key" : "X-Airstore-Secret-Key";
};

exports.getSecretHeaderName = getSecretHeaderName;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getSecretHeaderName, "getSecretHeaderName", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-secret-header-name.js");
}();

;