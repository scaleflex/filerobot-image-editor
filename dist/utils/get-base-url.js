"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseUrl = void 0;

var getBaseUrl = function getBaseUrl(container) {
  var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'filerobot';
  return platform === 'filerobot' ? "https://api.filerobot.com/".concat(container, "/v3/") : "https://".concat(container, ".api.airstore.io/v1/");
};

exports.getBaseUrl = getBaseUrl;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getBaseUrl, "getBaseUrl", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-base-url.js");
}();

;