"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Blender = /*#__PURE__*/function () {
  function Blender() {
    _classCallCheck(this, Blender);
  }

  _createClass(Blender, null, [{
    key: "initClass",
    value: function initClass() {
      this.blenders = {};
    } // Registers a blender. Can be used to add your own blenders outside of
    // the core library, if needed.
    // @param [String] name Name of the blender.
    // @param [Function] func The blender function.

  }, {
    key: "register",
    value: function register(name, func) {
      return this.blenders[name] = func;
    } // Executes a blender to combine a layer with its parent.
    // @param [String] name Name of the blending function to invoke.
    // @param [Object] rgbaLayer RGBA object of the current pixel from the layer.
    // @param [Object] rgbaParent RGBA object of the corresponding pixel in the parent layer.
    // @return [Object] RGBA object representing the blended pixel.

  }, {
    key: "execute",
    value: function execute(name, rgbaLayer, rgbaParent) {
      return this.blenders[name](rgbaLayer, rgbaParent);
    }
  }]);

  return Blender;
}();

Blender.initClass();
var _default = Blender;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Blender, "Blender", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/blander.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/blander.js");
}();

;