"use strict";

var _util = require("../core/util");

var _blander = _interopRequireDefault(require("../core/blander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// The entire layering system for Caman resides in this file. Layers get their own canvasLayer
// objectwhich is created when newLayer() is called. For extensive information regarding the
// specifics of howthe layering system works, there is an in-depth blog post on this very topic.
// Instead of copying the entirety of that post, I'll simply point you towards the
// [blog link](http://blog.meltingice.net/programming/implementing-layers-camanjs).
//
// However, the gist of the layering system is that, for each layer, it creates a new canvas
// element and then either copies the parent layer's data or applies a solid color to the new
// layer. After some (optional) effects are applied, the layer is blended back into the parent
// canvas layer using one of many different blending algorithms.
//
// You can also load an image (local or remote, with a proxy) into a canvas layer, which is useful
// if you want to add textures to an image.
var Layer = /*#__PURE__*/function () {
  function Layer(c) {
    _classCallCheck(this, Layer);

    // Compatibility
    this.c = c;
    this.filter = this.c;
    this.options = {
      blendingMode: 'normal',
      opacity: 1.0
    }; // Each layer gets its own unique ID

    this.layerID = _util.Util.uniqid.get(); // Create the canvas for this layer

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.c.dimensions.width;
    this.canvas.height = this.c.dimensions.height;
    this.context = this.canvas.getContext('2d');
    this.context.createImageData(this.canvas.width, this.canvas.height);
    this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pixelData = this.imageData.data;
  } // If you want to create nested layers


  _createClass(Layer, [{
    key: "newLayer",
    value: function newLayer(cb) {
      return this.c.newLayer.call(this.c, cb);
    } // Sets the blending mode of this layer. The mode is the name of a blender function.

  }, {
    key: "setBlendingMode",
    value: function setBlendingMode(mode) {
      this.options.blendingMode = mode;
      return this;
    } // Sets the opacity of this layer. This affects how much of this layer is applied to the parent
    // layer at render time.

  }, {
    key: "opacity",
    value: function opacity(_opacity) {
      this.options.opacity = _opacity / 100;
      return this;
    } // Copies the contents of the parent layer to this layer

  }, {
    key: "copyParent",
    value: function copyParent() {
      var parentData = this.c.pixelData;

      for (var i = 0, end = this.c.pixelData.length; i < end; i += 4) {
        this.pixelData[i] = parentData[i];
        this.pixelData[i + 1] = parentData[i + 1];
        this.pixelData[i + 2] = parentData[i + 2];
        this.pixelData[i + 3] = parentData[i + 3];
      }

      return this;
    } // Fills this layer with a single color

  }, {
    key: "fillColor",
    value: function fillColor() {
      return this.c.fillColor.apply(this.c, arguments);
    } // Loads and overlays an image onto this layer

  }, {
    key: "overlayImage",
    value: function overlayImage(image) {
      if (_typeof(image) === "object") {
        image = image.src;
      } else if (typeof image === "string" && image[0] === "#") {
        image = (0, _util.$)(image).src;
      }

      if (!image) {
        return this;
      }

      this.c.renderer.renderQueue.push({
        type: Caman.Filter.Type.LoadOverlay,
        src: image,
        layer: this
      });
      return this;
    } // Loads a layer mask, to affect the opacity of individual pixels during blending

  }, {
    key: "layerMask",
    value: function layerMask(image) {
      if (_typeof(image) === "object") {
        image = image.src;
      } else if (typeof image === "string" && image[0] === "#") {
        image = (0, _util.$)(image).src;
      }

      if (!image) {
        return this;
      }

      this.c.renderer.renderQueue.push({
        type: Caman.Filter.Type.LoadLayerMask,
        src: image,
        layer: this
      });
      return this;
    } // Takes the contents of this layer and applies them to the parent layer at render time. This
    // should never be called explicitly by the user.

  }, {
    key: "applyToParent",
    value: function applyToParent() {
      var _this = this;

      var parentData = this.c.pixelStack[this.c.pixelStack.length - 1];
      var layerData = this.c.pixelData;
      var opacity = this.options.opacity;
      return function () {
        var result1 = [];

        for (var i = 0, end = layerData.length; i < end; i += 4) {
          var rgbaParent = {
            r: parentData[i],
            g: parentData[i + 1],
            b: parentData[i + 2],
            a: parentData[i + 3]
          };
          var rgbaLayer = {
            r: layerData[i],
            g: layerData[i + 1],
            b: layerData[i + 2],
            a: layerData[i + 3]
          };

          if (_this.maskData) {
            opacity = _this.maskData[i] / 255; // only the red channel is used
          }

          var result = _blander.default.execute(_this.options.blendingMode, rgbaLayer, rgbaParent);

          result.r = _util.Util.clampRGB(result.r);
          result.g = _util.Util.clampRGB(result.g);
          result.b = _util.Util.clampRGB(result.b);

          if (result.a == null) {
            result.a = rgbaLayer.a;
          }

          parentData[i] = rgbaParent.r - (rgbaParent.r - result.r) * (opacity * (result.a / 255));
          parentData[i + 1] = rgbaParent.g - (rgbaParent.g - result.g) * (opacity * (result.a / 255));
          result1.push(parentData[i + 2] = rgbaParent.b - (rgbaParent.b - result.b) * (opacity * (result.a / 255)));
        }

        return result1;
      }();
    }
  }]);

  return Layer;
}();

Caman.Layer = Layer;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Layer, "Layer", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/layer.js");
}();

;