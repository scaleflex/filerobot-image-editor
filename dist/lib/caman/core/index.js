"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _module = _interopRequireDefault(require("./module"));

var _util = require("../core/util");

var _logger = require("./logger");

var _store = _interopRequireDefault(require("./store"));

var _renderer = _interopRequireDefault(require("./renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS203: Remove `|| {}` from converted for-own loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Here it begins. Caman is defined.
// There are many different initialization for Caman, which are described on the
// [Guides](http://camanjs.com/guides).
//
// Initialization is tricky because we need to make sure everything we need is actually fully
// loaded in the DOM before proceeding. When initialized on an image, we need to make sure that the
// image is done loading before converting it to a canvas element and writing the pixel data. If we
// do this prematurely, the browser will throw a DOM Error, and chaos will ensue. In the event that
// we initialize Caman on a canvas element while specifying an image URL, we need to create a new
// image element, load the image, then continue with initialization.
//
// The main goal for Caman was simplicity, so all of this is handled transparently to the end-user.
var Caman = /*#__PURE__*/function (_Module) {
  _inherits(Caman, _Module);

  var _super = _createSuper(Caman);

  _createClass(Caman, null, [{
    key: "initClass",
    value: function initClass() {
      // The current version.
      this.version = {
        release: "4.1.2",
        date: "7/27/2013"
      }; // @property [Boolean] Debug mode enables console logging.

      this.DEBUG = false; // @property [Boolean] Allow reverting the canvas?
      //   If your JS process is running out of memory, disabling
      //   this could help drastically.

      this.allowRevert = true; // @property [String] Default cross-origin policy.

      this.crossOrigin = "anonymous"; // @property [String] Set the URL of the image proxy script.

      this.remoteProxy = ""; // @proparty [String] The GET param used with the proxy script.

      this.proxyParam = "camanProxyUrl"; // @property [Boolean] Should we check the DOM for images with Caman instructions?

      this.autoload = true; // @property [Integer] to know how many angles was the image rotated so I can get the correct imageData when rotate the new canvas

      this.angle = 0; // @property [Boolean]  if canvas was rotated

      this.rotated = false;
    } // Custom toString()
    // @return [String] Version and release information.

  }, {
    key: "toString",
    value: function toString() {
      return "Version ".concat(Caman.version.release, ", Released ").concat(Caman.version.date);
    } // Get the ID assigned to this canvas by Caman.
    // @param [DOMObject] canvas The canvas to inspect.
    // @return [String] The Caman ID associated with this canvas.

  }, {
    key: "getAttrId",
    value: function getAttrId(canvas) {
      if (typeof canvas === "string") {
        canvas = (0, _util.$)(canvas);
      }

      if (canvas == null || canvas.getAttribute == null) {
        return null;
      }

      return canvas.getAttribute('data-caman-id');
    } // The Caman function. While technically a constructor, it was made to be called without
    // the `new` keyword. Caman will figure it out.
    //
    // @param [DOMObject, String] initializer The DOM selector or DOM object to initialize.
    // @overload Caman(initializer)
    //   Initialize Caman without a callback.
    //
    // @overload Caman(initializer, callback)
    //   Initialize Caman with a callback.
    //   @param [Function] callback Function to call once initialization completes.
    //
    // @overload Caman(initializer, url)
    //   Initialize Caman with a URL to an image and no callback.
    //   @param [String] url URl to an image to draw to the canvas.
    //
    // @overload Caman(initializer, url, callback)
    //   Initialize Caman with a canvas, URL to an image, and a callback.
    //   @param [String] url URl to an image to draw to the canvas.
    //   @param [Function] callback Function to call once initialization completes.
    //
    // @overload Caman(file)
    //   **NodeJS**: Initialize Caman with a path to an image file and no callback.
    //   @param [String, File] file File object or path to image to read.
    //
    // @overload Caman(file, callback)
    //   **NodeJS**: Initialize Caman with a file and a callback.
    //   @param [String, File] file File object or path to image to read.
    //   @param [Function] callback Function to call once initialization completes.
    //
    // @return [Caman] Initialized Caman instance.

  }]);

  function Caman() {
    var _this;

    _classCallCheck(this, Caman);

    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) {
        _this = _super.call(this);
      }

      var thisFn = function () {
        return _assertThisInitialized(_this);
      }.toString();

      var thisName = thisFn.match(/return (?:_assertThisInitialized\()*(\w+)\)*;?/)[1];
      eval("".concat(thisName, " = this;"));
    }

    if (arguments.length === 0) {
      throw "Invalid arguments";
    }

    if (_assertThisInitialized(_this) instanceof Caman) {
      // We have to do this to avoid polluting the global scope
      // because of how Coffeescript binds functions specified
      // with => and the fact that Caman can be invoked as both
      // a function and as a 'new' object.
      var id;
      _this.finishInit = _this.finishInit.bind(_assertThisInitialized(_this));
      _this.imageLoaded = _this.imageLoaded.bind(_assertThisInitialized(_this));
      var args = Array.prototype.slice.call(arguments, 0);
      id = parseInt(Caman.getAttrId(args[0]), 10);
      var callback = typeof args[1] === "function" ? args[1] : typeof args[2] === "function" ? args[2] : function () {};

      if (!isNaN(id) && _store.default.has(id)) {
        return _possibleConstructorReturn(_this, _store.default.execute(id, callback));
      } // Every instance gets a unique ID. Makes it much simpler to check if two variables are the
      // same instance.


      _this.id = _util.Util.uniqid.get();
      _this.initializedPixelData = _this.originalPixelData = null;
      _this.cropCoordinates = {
        x: 0,
        y: 0
      };
      _this.cropped = false;
      _this.resized = false;
      _this.pixelStack = []; // Stores the pixel layers

      _this.layerStack = []; // Stores all of the layers waiting to be rendered

      _this.canvasQueue = []; // Stores all of the canvases to be processed

      _this.currentLayer = null;
      _this.scaled = false; //this.analyze = new Analyze(this);

      _this.renderer = new _renderer.default(_assertThisInitialized(_this));

      _this.domIsLoaded(function () {
        _this.parseArguments(args);

        return _this.setup();
      });

      return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
    } else {
      return _possibleConstructorReturn(_this, new Caman(arguments));
    }

    return _possibleConstructorReturn(_this);
  } // Checks to ensure the DOM is loaded. Ensures the callback is always fired, even
  // if the DOM is already loaded before it's invoked. The callback is also always
  // called asynchronously.
  //
  // @param [Function] cb The callback function to fire when the DOM is ready.


  _createClass(Caman, [{
    key: "domIsLoaded",
    value: function domIsLoaded(cb) {
      var _this2 = this;

      if (document.readyState === "complete") {
        _logger.Log.debug("DOM initialized");

        return setTimeout(function () {
          return cb.call(_this2);
        }, 0);
      } else {
        var listener = function listener() {
          if (document.readyState === "complete") {
            _logger.Log.debug("DOM initialized");

            return cb.call(_this2);
          }
        };

        return document.addEventListener("readystatechange", listener, false);
      }
    } // Parses the arguments given to the Caman function, and sets the appropriate
    // properties on this instance.
    //
    // @params [Array] args Array of arguments passed to Caman.

  }, {
    key: "parseArguments",
    value: function parseArguments(args) {
      var _this3 = this;

      if (args.length === 0) {
        throw "Invalid arguments given";
      } // Defaults


      this.initObj = null;
      this.initType = null;
      this.imageUrl = null;

      this.callback = function () {}; // First argument is always our canvas/image


      this.setInitObject(args[0]);

      if (args.length === 1) {
        return;
      }

      switch (_typeof(args[1])) {
        case "string":
          this.imageUrl = args[1];
          break;

        case "function":
          this.callback = args[1];
          break;
      }

      if (args.length === 2) {
        return;
      }

      this.callback = args[2];

      if (args.length === 4) {
        return function () {
          var result = [];

          for (var _i2 = 0, _Object$keys = Object.keys(args[4] || {}); _i2 < _Object$keys.length; _i2++) {
            var key = _Object$keys[_i2];
            var val = args[4][key];
            result.push(_this3.options[key] = val);
          }

          return result;
        }();
      }
    } // Sets the initialization object for this instance.
    //
    // @param [Object, String] obj The initialization argument.

  }, {
    key: "setInitObject",
    value: function setInitObject(obj) {
      if (_typeof(obj) === "object") {
        this.initObj = obj;
      } else {
        this.initObj = (0, _util.$)(obj);
      }

      if (this.initObj == null) {
        throw "Could not find image or canvas for initialization.";
      }

      return this.initType = this.initObj.nodeName.toLowerCase();
    } // Begins the setup process, which differs depending on whether we're in NodeJS,
    // or if an image or canvas object was provided.

  }, {
    key: "setup",
    value: function setup() {
      switch (this.initType) {
        case "node":
          return this.initNode();

        case "img":
          return this.initImage();

        case "canvas":
          return this.initCanvas();
      }
    } // Initialization function for the browser and image objects.

  }, {
    key: "initImage",
    value: function initImage() {
      this.image = this.initObj;
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');

      _util.Util.copyAttributes(this.image, this.canvas, {
        except: ['src']
      }); // Swap out the image with the canvas element if the image exists
      // in the DOM.


      if (this.image.parentNode != null) {
        this.image.parentNode.replaceChild(this.canvas, this.image);
      }

      this.imageAdjustments();
      return this.waitForImageLoaded();
    } // Initialization function for the browser and canvas objects.

  }, {
    key: "initCanvas",
    value: function initCanvas() {
      this.canvas = this.initObj;
      this.context = this.canvas.getContext('2d');

      if (this.imageUrl != null) {
        this.image = document.createElement('img');
        this.image.src = this.imageUrl;
        this.imageAdjustments();
        return this.waitForImageLoaded();
      } else {
        return this.finishInit();
      }
    } // Automatically check for a HiDPI capable screen and swap out the image if possible.
    // Also checks the image URL to see if it's a cross-domain request, and attempt to
    // proxy the image. If a cross-origin type is configured, the proxy will be ignored.

  }, {
    key: "imageAdjustments",
    value: function imageAdjustments() {
      if (this.needsHiDPISwap()) {
        _logger.Log.debug(this.image.src, "->", this.hiDPIReplacement());

        this.swapped = true;
        this.image.src = this.hiDPIReplacement();
      }

      if (Caman.IO.isRemote(this.image)) {
        this.image.src = Caman.IO.proxyUrl(this.image.src);
        return _logger.Log.debug("Remote image detected, using URL = ".concat(this.image.src));
      }
    } // Utility function that fires {Caman#imageLoaded} once the image is finished loading.

  }, {
    key: "waitForImageLoaded",
    value: function waitForImageLoaded() {
      if (this.isImageLoaded()) {
        return this.imageLoaded();
      } else {
        return this.image.onload = this.imageLoaded;
      }
    } // Checks if the given image is finished loading.
    // @return [Boolean] Is the image loaded?

  }, {
    key: "isImageLoaded",
    value: function isImageLoaded() {
      if (!this.image.complete) {
        return false;
      } // Internet Explorer is weird.


      if (this.image.naturalWidth != null && this.image.naturalWidth === 0) {
        return false;
      }

      return true;
    } // Internet Explorer has issues figuring out image dimensions when they aren't
    // explicitly defined, apparently. We check the normal width/height properties first,
    // but fall back to natural sizes if they are 0.
    // @return [Number] Width of the initialization image.

  }, {
    key: "imageWidth",
    value: function imageWidth() {
      return this.image.width || this.image.naturalWidth;
    } // @see Caman#imageWidth
    // @return [Number] Height of the initialization image.

  }, {
    key: "imageHeight",
    value: function imageHeight() {
      return this.image.height || this.image.naturalHeight;
    } // Function that is called once the initialization image is finished loading.
    // We make sure that the canvas dimensions are properly set here.

  }, {
    key: "imageLoaded",
    value: function imageLoaded() {
      _logger.Log.debug("Image loaded. Width = ".concat(this.imageWidth(), ", Height = ").concat(this.imageHeight()));

      if (this.swapped) {
        this.canvas.width = this.imageWidth() / this.hiDPIRatio();
        this.canvas.height = this.imageHeight() / this.hiDPIRatio();
      } else {
        this.canvas.width = this.imageWidth();
        this.canvas.height = this.imageHeight();
      }

      return this.finishInit();
    } // Final step of initialization. We finish setting up our canvas element, and we
    // draw the image to the canvas (if applicable).

  }, {
    key: "finishInit",
    value: function finishInit() {
      if (this.context == null) {
        this.context = this.canvas.getContext('2d');
      }

      this.originalWidth = this.preScaledWidth = this.width = this.canvas.width;
      this.originalHeight = this.preScaledHeight = this.height = this.canvas.height;
      this.hiDPIAdjustments();

      if (!this.hasId()) {
        this.assignId();
      }

      if (this.image != null) {
        this.context.drawImage(this.image, 0, 0, this.imageWidth(), this.imageHeight(), 0, 0, this.preScaledWidth, this.preScaledHeight);
      }

      this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.pixelData = this.imageData.data;

      if (Caman.allowRevert) {
        this.initializedPixelData = _util.Util.dataArray(this.pixelData.length);
        this.originalPixelData = _util.Util.dataArray(this.pixelData.length);

        for (var i = 0; i < this.pixelData.length; i++) {
          var pixel = this.pixelData[i];
          this.initializedPixelData[i] = pixel;
          this.originalPixelData[i] = pixel;
        }
      }

      this.dimensions = {
        width: this.canvas.width,
        height: this.canvas.height
      };

      _store.default.put(this.id, this);

      this.callback.call(this, this); // Reset the callback so re-initialization doesn't
      // trigger it again.

      return this.callback = function () {};
    } // If you have a separate context reference to this canvas outside of CamanJS
    // and you make a change to the canvas outside of CamanJS, you will have to call
    // this function to update our context reference to include those changes.

  }, {
    key: "reloadCanvasData",
    value: function reloadCanvasData() {
      this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      return this.pixelData = this.imageData.data;
    } // Reset the canvas pixels to the original state at initialization.

  }, {
    key: "resetOriginalPixelData",
    value: function resetOriginalPixelData() {
      var _this4 = this;

      if (!Caman.allowRevert) {
        throw "Revert disabled";
      }

      this.originalPixelData = _util.Util.dataArray(this.pixelData.length);
      return Array.from(this.pixelData).map(function (pixel, i) {
        return _this4.originalPixelData[i] = pixel;
      });
    } // Does this instance have an ID assigned?
    // @return [Boolean] Existance of an ID.

  }, {
    key: "hasId",
    value: function hasId() {
      return Caman.getAttrId(this.canvas) != null;
    } // Assign a unique ID to this instance.

  }, {
    key: "assignId",
    value: function assignId() {
      if (this.canvas.getAttribute('data-caman-id')) {
        return;
      }

      return this.canvas.setAttribute('data-caman-id', this.id);
    } // Is HiDPI support disabled via the HTML data attribute?
    // @return [Boolean]

  }, {
    key: "hiDPIDisabled",
    value: function hiDPIDisabled() {
      return this.canvas.getAttribute('data-caman-hidpi-disabled') !== null;
    } // Perform HiDPI adjustments to the canvas. This consists of changing the
    // scaling and the dimensions to match that of the display.

  }, {
    key: "hiDPIAdjustments",
    value: function hiDPIAdjustments() {
      if (!this.needsHiDPISwap()) {
        return;
      }

      var ratio = this.hiDPIRatio();

      if (ratio !== 1) {
        _logger.Log.debug("HiDPI ratio = ".concat(ratio));

        this.scaled = true;
        this.preScaledWidth = this.canvas.width;
        this.preScaledHeight = this.canvas.height;
        this.canvas.width = this.preScaledWidth * ratio;
        this.canvas.height = this.preScaledHeight * ratio;
        this.canvas.style.width = "".concat(this.preScaledWidth, "px");
        this.canvas.style.height = "".concat(this.preScaledHeight, "px");
        this.context.scale(ratio, ratio);
        this.width = this.originalWidth = this.canvas.width;
        return this.height = this.originalHeight = this.canvas.height;
      }
    } // Calculate the HiDPI ratio of this display based on the backing store
    // and the pixel ratio.
    // @return [Number] The HiDPI pixel ratio.

  }, {
    key: "hiDPIRatio",
    value: function hiDPIRatio() {
      var devicePixelRatio = window.devicePixelRatio || 1;
      var backingStoreRatio = this.context.webkitBackingStorePixelRatio || this.context.mozBackingStorePixelRatio || this.context.msBackingStorePixelRatio || this.context.oBackingStorePixelRatio || this.context.backingStorePixelRatio || 1;
      return devicePixelRatio / backingStoreRatio;
    } // Is this display HiDPI capable?
    // @return [Boolean]

  }, {
    key: "hiDPICapable",
    value: function hiDPICapable() {
      return window.devicePixelRatio != null && window.devicePixelRatio !== 1;
    } // Do we need to perform an image swap with a HiDPI image?
    // @return [Boolean]

  }, {
    key: "needsHiDPISwap",
    value: function needsHiDPISwap() {
      if (this.hiDPIDisabled() || !this.hiDPICapable()) {
        return false;
      }

      return this.hiDPIReplacement() !== null;
    } // Gets the HiDPI replacement for the initialization image.
    // @return [String] URL to the HiDPI version.

  }, {
    key: "hiDPIReplacement",
    value: function hiDPIReplacement() {
      if (this.image == null) {
        return null;
      }

      return this.image.getAttribute('data-caman-hidpi');
    } // Replaces the current canvas with a new one, and properly updates all of the
    // applicable references for this instance.
    //
    // @param [DOMObject] newCanvas The canvas to swap into this instance.

  }, {
    key: "replaceCanvas",
    value: function replaceCanvas(newCanvas) {
      var oldCanvas = this.canvas;
      this.canvas = newCanvas;
      this.context = this.canvas.getContext('2d');
      oldCanvas.parentNode.replaceChild(this.canvas, oldCanvas);
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.reloadCanvasData();
      return this.dimensions = {
        width: this.canvas.width,
        height: this.canvas.height
      };
    } // Begins the rendering process. This will execute all of the filter functions
    // called either since initialization or the previous render.
    //
    // @param [Function] callback Function to call when rendering is finished.

  }, {
    key: "render",
    value: function render(callback) {
      var _this5 = this;

      if (callback == null) {
        callback = function callback() {};
      }

      Caman.Event.trigger(this, "renderStart");
      return this.renderer.execute(function () {
        _this5.context.putImageData(_this5.imageData, 0, 0);

        return callback.call(_this5);
      });
    } // Reverts the canvas back to it's original state while
    // maintaining any cropped or resized dimensions.
    //
    // @param [Boolean] updateContext Should we apply the reverted pixel data to the
    //   canvas context thus triggering a re-render by the browser?

  }, {
    key: "revert",
    value: function revert(updateContext) {
      if (updateContext == null) {
        updateContext = true;
      }

      if (!Caman.allowRevert) {
        throw "Revert disabled";
      }

      var iterable = this.originalVisiblePixels();

      for (var i = 0; i < iterable.length; i++) {
        var pixel = iterable[i];
        this.pixelData[i] = pixel;
      }

      if (updateContext) {
        return this.context.putImageData(this.imageData, 0, 0);
      }
    } // Completely resets the canvas back to it's original state.
    // Any size adjustments will also be reset.

  }, {
    key: "reset",
    value: function reset() {
      var canvas = document.createElement('canvas');

      _util.Util.copyAttributes(this.canvas, canvas);

      canvas.width = this.originalWidth;
      canvas.height = this.originalHeight;
      var ctx = canvas.getContext('2d');
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var pixelData = imageData.data;

      for (var i = 0; i < this.initializedPixelData.length; i++) {
        var pixel = this.initializedPixelData[i];
        pixelData[i] = pixel;
      }

      ctx.putImageData(imageData, 0, 0);
      this.cropCoordinates = {
        x: 0,
        y: 0
      };
      this.resized = false;
      this.angle = 0;
      this.rotated = false;
      return this.replaceCanvas(canvas);
    } // Returns the original pixel data while maintaining any
    // cropping or resizing that may have occured.
    // **Warning**: this is currently in beta status.
    //
    // @return [Array] Original pixel values still visible after cropping or resizing.

  }, {
    key: "originalVisiblePixels",
    value: function originalVisiblePixels() {
      var i, pixelData, width;
      var end;

      if (!Caman.allowRevert) {
        throw "Revert disabled";
      }

      var pixels = [];
      var startX = this.cropCoordinates.x;
      var endX = startX + this.width;
      var startY = this.cropCoordinates.y;
      var endY = startY + this.height;

      if (this.resized) {
        var _canvas = document.createElement('canvas');

        _canvas.width = this.originalWidth;
        _canvas.height = this.originalHeight;

        var _ctx = _canvas.getContext('2d');

        var _imageData = _ctx.getImageData(0, 0, _canvas.width, _canvas.height);

        pixelData = _imageData.data;

        for (i = 0; i < this.originalPixelData.length; i++) {
          var pixel = this.originalPixelData[i];
          pixelData[i] = pixel;
        }

        _ctx.putImageData(_imageData, 0, 0);

        var scaledCanvas = document.createElement('canvas');
        scaledCanvas.width = this.width;
        scaledCanvas.height = this.height;
        _ctx = scaledCanvas.getContext('2d');

        _ctx.drawImage(_canvas, 0, 0, this.originalWidth, this.originalHeight, 0, 0, this.width, this.height);

        pixelData = _ctx.getImageData(0, 0, this.width, this.height).data;
        width = this.width;
      } else if (this.rotated) {
        var canvas = document.createElement('canvas'); //Canvas for initial state

        canvas.width = this.originalWidth; //give it the original width

        canvas.height = this.originalHeight; //and original height

        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        pixelData = imageData.data; //get the pixelData (length equal to those of initial canvas

        var _ref = this.originalPixelData; //use it as a reference array

        var _i3, _i, _len, _pixel;

        for (_i3 = _i = 0, _len = _ref.length; _i < _len; _i3 = ++_i) {
          _pixel = _ref[_i3];
          pixelData[_i3] = _pixel; //give pixelData the initial pixels
        }

        ctx.putImageData(imageData, 0, 0); //put it back on our canvas

        var rotatedCanvas = document.createElement('canvas'); //canvas to rotate from initial

        var rotatedCtx = rotatedCanvas.getContext('2d');
        rotatedCanvas.width = this.canvas.width; //Our canvas was already rotated so it has been replaced. Caman's canvas attribute is allready rotated, So use that width

        rotatedCanvas.height = this.canvas.height; //the same

        var x = rotatedCanvas.width / 2; //for translating

        var y = rotatedCanvas.height / 2; //same

        rotatedCtx.save();
        rotatedCtx.translate(x, y);
        rotatedCtx.rotate(this.angle * Math.PI / 180); //rotation based on the total angle

        rotatedCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height); //put the image back on canvas

        rotatedCtx.restore(); //restore it

        pixelData = rotatedCtx.getImageData(0, 0, rotatedCanvas.width, rotatedCanvas.height).data; //get the pixelData back

        width = rotatedCanvas.width; //used for returning the pixels in revert function
      } else {
        pixelData = this.originalPixelData;
        width = this.originalWidth;
      }

      for (i = 0, end = pixelData.length; i < end; i += 4) {
        var coord = Caman.Pixel.locationToCoordinates(i, width);

        if (startX <= coord.x && coord.x < endX && startY <= coord.y && coord.y < endY) {
          pixels.push(pixelData[i], pixelData[i + 1], pixelData[i + 2], pixelData[i + 3]);
        }
      }

      return pixels;
    } // Pushes the filter callback that modifies the RGBA object into the
    // render queue.
    //
    // @param [String] name Name of the filter function.
    // @param [Function] processFn The Filter function.
    // @return [Caman]

  }, {
    key: "process",
    value: function process(name, processFn) {
      this.renderer.add({
        type: Caman.Filter.Type.Single,
        name: name,
        processFn: processFn
      });
      return this;
    } // Pushes the kernel into the render queue.
    //
    // @param [String] name The name of the kernel.
    // @param [Array] adjust The convolution kernel represented as a 1D array.
    // @param [Number] divisor The divisor for the convolution.
    // @param [Number] bias The bias for the convolution.
    // @return [Caman]

  }, {
    key: "processKernel",
    value: function processKernel(name, adjust) {
      var divisor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var bias = arguments.length > 3 ? arguments[3] : undefined;

      if (bias == null) {
        bias = 0;
      }

      if (divisor == null) {
        divisor = 0;

        for (var i = 0, end = adjust.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
          divisor += adjust[i];
        }
      }

      this.renderer.add({
        type: Caman.Filter.Type.Kernel,
        name: name,
        adjust: adjust,
        divisor: divisor,
        bias: bias
      });
      return this;
    } // Adds a standalone plugin into the render queue.
    //
    // @param [String] plugin Name of the plugin.
    // @param [Array] args Array of arguments to pass to the plugin.
    // @return [Caman]

  }, {
    key: "processPlugin",
    value: function processPlugin(plugin, args) {
      this.renderer.add({
        type: Caman.Filter.Type.Plugin,
        plugin: plugin,
        args: args
      });
      return this;
    } // Pushes a new layer operation into the render queue and calls the layer
    // callback.
    //
    // @param [Function] callback Function that is executed within the context of the layer.
    //   All filter and adjustment functions for the layer will be executed inside of this function.
    // @return [Caman]

  }, {
    key: "newLayer",
    value: function newLayer(callback) {
      var layer = new Caman.Layer(this);
      this.canvasQueue.push(layer);
      this.renderer.add({
        type: Caman.Filter.Type.LayerDequeue
      });
      callback.call(layer);
      this.renderer.add({
        type: Caman.Filter.Type.LayerFinished
      });
      return this;
    } // Pushes the layer context and moves to the next operation.
    // @param [Layer] layer The layer to execute.

  }, {
    key: "executeLayer",
    value: function executeLayer(layer) {
      return this.pushContext(layer);
    } // Set all of the relevant data to the new layer.
    // @param [Layer] layer The layer whose context we want to switch to.

  }, {
    key: "pushContext",
    value: function pushContext(layer) {
      this.layerStack.push(this.currentLayer);
      this.pixelStack.push(this.pixelData);
      this.currentLayer = layer;
      return this.pixelData = layer.pixelData;
    } // Restore the previous layer context.

  }, {
    key: "popContext",
    value: function popContext() {
      this.pixelData = this.pixelStack.pop();
      return this.currentLayer = this.layerStack.pop();
    } // Applies the current layer to its parent layer.

  }, {
    key: "applyCurrentLayer",
    value: function applyCurrentLayer() {
      return this.currentLayer.applyToParent();
    }
  }, {
    key: "save",
    value: function save() {
      return this.browserSave.apply(this, arguments);
    }
  }, {
    key: "browserSave",
    value: function browserSave(type) {
      if (type == null) {
        type = "png";
      }

      type = type.toLowerCase(); // Force download (its a bit hackish)

      var image = this.toBase64(type).replace("image/".concat(type), "image/octet-stream");
      return document.location.href = image;
    }
  }, {
    key: "toImage",
    // Takes the current canvas data, converts it to Base64, then sets it as the source
    // of a new Image object and returns it.
    value: function toImage(type) {
      var img = new Image();
      img.src = this.toBase64(type);
      img.width = this.dimensions.width;
      img.height = this.dimensions.height;

      if (window.devicePixelRatio) {
        img.width /= window.devicePixelRatio;
        img.height /= window.devicePixelRatio;
      }

      return img;
    }
  }, {
    key: "toBase64",
    // Base64 encodes the current canvas
    value: function toBase64(type) {
      if (type == null) {
        type = "png";
      }

      type = type.toLowerCase();
      return this.canvas.toDataURL("image/".concat(type));
    }
  }]);

  return Caman;
}(_module.default);

Caman.initClass();
window.Caman = Caman;
var _default = Caman;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Caman, "Caman", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/index.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/index.js");
}();

;