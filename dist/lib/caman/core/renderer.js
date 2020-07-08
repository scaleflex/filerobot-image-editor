"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util");

var _logger = require("./logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Handles all of the various rendering methods in Caman. Most of the image modification happens
// here. A new Renderer object is created for every render operation.
var Renderer = /*#__PURE__*/function () {
  _createClass(Renderer, null, [{
    key: "initClass",
    value: function initClass() {
      // The number of blocks to split the image into during the render process to simulate
      // concurrency. This also helps the browser manage the (possibly) long running render jobs.
      this.Blocks = 4;
    }
  }]);

  function Renderer(c) {
    _classCallCheck(this, Renderer);

    this.processNext = this.processNext.bind(this);
    this.c = c;
    this.renderQueue = [];
    this.modPixelData = null;
  }

  _createClass(Renderer, [{
    key: "add",
    value: function add(job) {
      if (job == null) {
        return;
      }

      return this.renderQueue.push(job);
    } // Grabs the next operation from the render queue and passes it to Renderer
    // for execution

  }, {
    key: "processNext",
    value: function processNext() {
      // If the queue is empty, fire the finished callback
      if (this.renderQueue.length === 0) {
        Caman.Event.trigger(this, "renderFinished");

        if (this.finishedFn != null) {
          this.finishedFn.call(this.c);
        }

        return this;
      }

      this.currentJob = this.renderQueue.shift();

      switch (this.currentJob.type) {
        case Caman.Filter.Type.LayerDequeue:
          var layer = this.c.canvasQueue.shift();
          this.c.executeLayer(layer);
          return this.processNext();

        case Caman.Filter.Type.LayerFinished:
          this.c.applyCurrentLayer();
          this.c.popContext();
          return this.processNext();

        case Caman.Filter.Type.LoadOverlay:
          return this.loadOverlay(this.currentJob.layer, this.currentJob.src);

        case Caman.Filter.Type.LoadLayerMask:
          return this.loadLayerMask(this.currentJob.layer, this.currentJob.src);

        case Caman.Filter.Type.Plugin:
          return this.executePlugin();

        default:
          return this.executeFilter();
      }
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      this.finishedFn = callback;
      this.modPixelData = _util.Util.dataArray(this.c.pixelData.length);
      return this.processNext();
    }
  }, {
    key: "eachBlock",
    value: function eachBlock(fn) {
      var _this = this;

      // Prepare all the required render data
      this.blocksDone = 0;
      var n = this.c.pixelData.length;
      var blockPixelLength = Math.floor(n / 4 / Renderer.Blocks);
      var blockN = blockPixelLength * 4;
      var lastBlockN = blockN + n / 4 % Renderer.Blocks * 4;
      return function () {
        var result = [];

        for (var i = 0, end1 = Renderer.Blocks, asc = 0 <= end1; asc ? i < end1 : i > end1; asc ? i++ : i--) {
          var start = i * blockN;
          var end = start + (i === Renderer.Blocks - 1 ? lastBlockN : blockN);

          if (Caman.NodeJS) {
            var f = Fiber(function () {
              return fn.call(_this, i, start, end);
            });
            var bnum = f.run();
            result.push(_this.blockFinished(bnum));
          } else {
            result.push(setTimeout(function (i, start, end) {
              return function () {
                return fn.call(_this, i, start, end);
              };
            }(i, start, end), 0));
          }
        }

        return result;
      }();
    } // The core of the image rendering, this function executes the provided filter.
    //
    // NOTE: this does not write the updated pixel data to the canvas. That happens when all filters
    // are finished rendering in order to be as fast as possible.

  }, {
    key: "executeFilter",
    value: function executeFilter() {
      Caman.Event.trigger(this.c, "processStart", this.currentJob);

      if (this.currentJob.type === Caman.Filter.Type.Single) {
        return this.eachBlock(this.renderBlock);
      } else {
        return this.eachBlock(this.renderKernel);
      }
    } // Executes a standalone plugin

  }, {
    key: "executePlugin",
    value: function executePlugin() {
      _logger.Log.debug("Executing plugin ".concat(this.currentJob.plugin));

      Caman.Plugin.execute(this.c, this.currentJob.plugin, this.currentJob.args);

      _logger.Log.debug("Plugin ".concat(this.currentJob.plugin, " finished!"));

      return this.processNext();
    } // Renders a single block of the canvas with the current filter function

  }, {
    key: "renderBlock",
    value: function renderBlock(bnum, start, end) {
      _logger.Log.debug("Block #".concat(bnum, " - Filter: ").concat(this.currentJob.name, ", Start: ").concat(start, ", End: ").concat(end));

      Caman.Event.trigger(this.c, "blockStarted", {
        blockNum: bnum,
        totalBlocks: Renderer.Blocks,
        startPixel: start,
        endPixel: end
      });
      var pixel = new Caman.Pixel();
      pixel.setContext(this.c);

      for (var i = start, end1 = end; i < end1; i += 4) {
        pixel.loc = i;
        pixel.r = this.c.pixelData[i];
        pixel.g = this.c.pixelData[i + 1];
        pixel.b = this.c.pixelData[i + 2];
        pixel.a = this.c.pixelData[i + 3];
        this.currentJob.processFn(pixel);
        this.c.pixelData[i] = _util.Util.clampRGB(pixel.r);
        this.c.pixelData[i + 1] = _util.Util.clampRGB(pixel.g);
        this.c.pixelData[i + 2] = _util.Util.clampRGB(pixel.b);
        this.c.pixelData[i + 3] = _util.Util.clampRGB(pixel.a);
      }

      return this.blockFinished(bnum);
    } // Applies an image kernel to the canvas

  }, {
    key: "renderKernel",
    value: function renderKernel(bnum, start, end) {
      var name = this.currentJob.name;
      var bias = this.currentJob.bias;
      var divisor = this.currentJob.divisor;
      var n = this.c.pixelData.length;
      var adjust = this.currentJob.adjust;
      var adjustSize = Math.sqrt(adjust.length);
      var kernel = [];

      _logger.Log.debug("Rendering kernel - Filter: ".concat(this.currentJob.name));

      start = Math.max(start, this.c.dimensions.width * 4 * ((adjustSize - 1) / 2));
      end = Math.min(end, n - this.c.dimensions.width * 4 * ((adjustSize - 1) / 2));
      var builder = (adjustSize - 1) / 2;
      var pixel = new Caman.Pixel();
      pixel.setContext(this.c);

      for (var i = start, end1 = end; i < end1; i += 4) {
        pixel.loc = i;
        var builderIndex = 0;

        for (var j = -builder, end2 = builder, asc = -builder <= end2; asc ? j <= end2 : j >= end2; asc ? j++ : j--) {
          for (var k = builder, end3 = -builder, asc1 = builder <= end3; asc1 ? k <= end3 : k >= end3; asc1 ? k++ : k--) {
            var p = pixel.getPixelRelative(j, k);
            kernel[builderIndex * 3] = p.r;
            kernel[builderIndex * 3 + 1] = p.g;
            kernel[builderIndex * 3 + 2] = p.b;
            builderIndex++;
          }
        }

        var res = this.processKernel(adjust, kernel, divisor, bias);
        this.modPixelData[i] = _util.Util.clampRGB(res.r);
        this.modPixelData[i + 1] = _util.Util.clampRGB(res.g);
        this.modPixelData[i + 2] = _util.Util.clampRGB(res.b);
        this.modPixelData[i + 3] = this.c.pixelData[i + 3];
      }

      return this.blockFinished(bnum);
    } // Called when a single block is finished rendering. Once all blocks are done, we signal that this
    // filter is finished rendering and continue to the next step.

  }, {
    key: "blockFinished",
    value: function blockFinished(bnum) {
      if (bnum >= 0) {
        _logger.Log.debug("Block #".concat(bnum, " finished! Filter: ").concat(this.currentJob.name));
      }

      this.blocksDone++;
      Caman.Event.trigger(this.c, "blockFinished", {
        blockNum: bnum,
        blocksFinished: this.blocksDone,
        totalBlocks: Renderer.Blocks
      });

      if (this.blocksDone === Renderer.Blocks) {
        if (this.currentJob.type === Caman.Filter.Type.Kernel) {
          for (var i = 0, end = this.c.pixelData.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
            this.c.pixelData[i] = this.modPixelData[i];
          }
        }

        if (bnum >= 0) {
          _logger.Log.debug("Filter ".concat(this.currentJob.name, " finished!"));
        }

        Caman.Event.trigger(this.c, "processComplete", this.currentJob);
        return this.processNext();
      }
    } // The "filter function" for kernel adjustments.

  }, {
    key: "processKernel",
    value: function processKernel(adjust, kernel, divisor, bias) {
      var val = {
        r: 0,
        g: 0,
        b: 0
      };

      for (var i = 0, end = adjust.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        val.r += adjust[i] * kernel[i * 3];
        val.g += adjust[i] * kernel[i * 3 + 1];
        val.b += adjust[i] * kernel[i * 3 + 2];
      }

      val.r = val.r / divisor + bias;
      val.g = val.g / divisor + bias;
      val.b = val.b / divisor + bias;
      return val;
    } // Loads an image onto the current canvas

  }, {
    key: "loadOverlay",
    value: function loadOverlay(layer, src) {
      var _this2 = this;

      var img = new Image();

      img.onload = function () {
        layer.context.drawImage(img, 0, 0, _this2.c.dimensions.width, _this2.c.dimensions.height);
        layer.imageData = layer.context.getImageData(0, 0, _this2.c.dimensions.width, _this2.c.dimensions.height);
        layer.pixelData = layer.imageData.data;
        _this2.c.pixelData = layer.pixelData;
        return _this2.processNext();
      };

      var proxyUrl = Caman.IO.remoteCheck(src);
      return img.src = proxyUrl != null ? proxyUrl : src;
    } // Loads an image and save as mask data

  }, {
    key: "loadLayerMask",
    value: function loadLayerMask(layer, src) {
      var _this3 = this;

      var img = new Image();

      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = _this3.c.dimensions.width;
        canvas.height = _this3.c.dimensions.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, _this3.c.dimensions.width, _this3.c.dimensions.height);
        var maskData = context.getImageData(0, 0, _this3.c.dimensions.width, _this3.c.dimensions.height);
        layer.maskData = maskData.data;
        return _this3.processNext();
      };

      var proxyUrl = Caman.IO.remoteCheck(src);
      return img.src = proxyUrl != null ? proxyUrl : src;
    }
  }]);

  return Renderer;
}();

Renderer.initClass();
var _default = Renderer;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Renderer, "Renderer", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/renderer.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/renderer.js");
}();

;