"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseAPI = void 0;

var _ = require("./");

var getBaseAPI = function getBaseAPI(baseAPI, container, platform) {
  return baseAPI ? baseAPI + '/' : (0, _.getBaseUrl)(container, platform);
};

exports.getBaseAPI = getBaseAPI;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getBaseAPI, "getBaseAPI", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-base-api.js");
}();

;