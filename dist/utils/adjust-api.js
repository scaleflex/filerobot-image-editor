"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPubliclink = exports.getPermalink = void 0;

/* API change from file.url_permalink to file.url.permalink
* */
var getPermalink = function getPermalink(file) {
  if (file.url && file.url.permalink) return file.url.permalink;else if (file.url_permalink) return file.url_permalink;else return '';
};

exports.getPermalink = getPermalink;

var getPubliclink = function getPubliclink(file) {
  if (file.url && file.url.public) return file.url.public;else if (file.url_public) return file.url_public;else return '';
};

exports.getPubliclink = getPubliclink;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getPermalink, "getPermalink", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/adjust-api.js");

  __REACT_HOT_LOADER__.register(getPubliclink, "getPubliclink", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/adjust-api.js");
}();

;