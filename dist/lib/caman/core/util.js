"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__extends = exports.$ = exports.Util = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// DOM simplifier (no jQuery dependency)
// NodeJS compatible
var $ = function $(sel, root) {
  if (root == null) {
    root = document;
  }

  if (_typeof(sel) === "object") {
    return sel;
  }

  return root.querySelector(sel);
};

exports.$ = $;

var __extends = function __extends(child, parent) {
  for (var key in parent) {
    if ({}.hasOwnProperty.call(parent, key)) child[key] = parent[key];
  }

  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
};

exports.__extends = __extends;

var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: "initClass",
    value: function initClass() {
      // Unique value utility
      this.uniqid = function () {
        var id = 0;
        return {
          get: function get() {
            return id++;
          }
        };
      }();
    } // Helper function that extends one object with all the properies of other objects

  }, {
    key: "extend",
    value: function extend(obj) {
      var dest = obj;

      for (var _len = arguments.length, src = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        src[_key - 1] = arguments[_key];
      }

      for (var _i = 0, _Array$from = Array.from(src); _i < _Array$from.length; _i++) {
        var copy = _Array$from[_i];

        for (var _i2 = 0, _Object$keys = Object.keys(copy || {}); _i2 < _Object$keys.length; _i2++) {
          var prop = _Object$keys[_i2];
          dest[prop] = copy[prop];
        }
      }

      return dest;
    } // In order to stay true to the latest spec, RGB values must be clamped between
    // 0 and 255. If we don't do this, weird things happen.

  }, {
    key: "clampRGB",
    value: function clampRGB(val) {
      if (val < 0) {
        return 0;
      }

      if (val > 255) {
        return 255;
      }

      return val;
    }
  }, {
    key: "copyAttributes",
    value: function copyAttributes(from, to, opts) {
      if (opts == null) {
        opts = {};
      }

      return function () {
        var result = [];

        for (var _i3 = 0, _Array$from2 = Array.from(from.attributes); _i3 < _Array$from2.length; _i3++) {
          var attr = _Array$from2[_i3];

          if (opts.except != null && Array.from(opts.except).includes(attr.nodeName)) {
            continue;
          }

          result.push(to.setAttribute(attr.nodeName, attr.nodeValue));
        }

        return result;
      }();
    } // Support for browsers that don't know Uint8Array (such as IE9)

  }, {
    key: "dataArray",
    value: function dataArray(length) {
      if (length == null) {
        length = 0;
      }

      if (Caman.NodeJS || window.Uint8Array != null) {
        return new Uint8Array(length);
      }

      return new Array(length);
    }
  }]);

  return Util;
}();

exports.Util = Util;
Util.initClass();
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register($, "$", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/util.js");

  __REACT_HOT_LOADER__.register(__extends, "__extends", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/util.js");

  __REACT_HOT_LOADER__.register(Util, "Util", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/util.js");
}();

;