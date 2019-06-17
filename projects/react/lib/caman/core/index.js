import Module from './module';
import { Util, $ } from '../core/util';
import { Log } from './logger';
import Store from './store';
import Renderer from './renderer';

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
class Caman extends Module {
  static initClass() {
    // The current version.
    this.version = {
      release: "4.1.2",
      date: "7/27/2013"
    };

    // @property [Boolean] Debug mode enables console logging.
    this.DEBUG = false;

    // @property [Boolean] Allow reverting the canvas?
    //   If your JS process is running out of memory, disabling
    //   this could help drastically.
    this.allowRevert = true;

    // @property [String] Default cross-origin policy.
    this.crossOrigin = "anonymous";

    // @property [String] Set the URL of the image proxy script.
    this.remoteProxy = "";

    // @proparty [String] The GET param used with the proxy script.
    this.proxyParam = "camanProxyUrl";

    // @property [Boolean] Should we check the DOM for images with Caman instructions?
    this.autoload = true;
  }

  // Custom toString()
  // @return [String] Version and release information.
  static toString() {
    return `Version ${Caman.version.release}, Released ${Caman.version.date}`;
  }

  // Get the ID assigned to this canvas by Caman.
  // @param [DOMObject] canvas The canvas to inspect.
  // @return [String] The Caman ID associated with this canvas.
  static getAttrId(canvas) {
    if (typeof canvas === "string") {
      canvas = $(canvas);
    }

    if ((canvas == null) || (canvas.getAttribute == null)) { return null; }
    return canvas.getAttribute('data-caman-id');
  }

  // The Caman function. While technically a constructor, it was made to be called without
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
  constructor() {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { return this; }).toString();
      let thisName = thisFn.match(/return (?:_assertThisInitialized\()*(\w+)\)*;?/)[1];
      eval(`${thisName} = this;`);
    }
    if (arguments.length === 0) { throw "Invalid arguments"; }

    if (this instanceof Caman) {
      // We have to do this to avoid polluting the global scope
      // because of how Coffeescript binds functions specified
      // with => and the fact that Caman can be invoked as both
      // a function and as a 'new' object.
      let id;
      this.finishInit = this.finishInit.bind(this);
      this.imageLoaded = this.imageLoaded.bind(this);

      const args = Array.prototype.slice.call(arguments, 0);

      id = parseInt(Caman.getAttrId(args[0]), 10);
      const callback = typeof args[1] === "function" ?
        args[1]
        : typeof args[2] === "function" ?
          args[2]
          :
          function() {};

      if (!isNaN(id) && Store.has(id)) {
        return Store.execute(id, callback);
      }

      // Every instance gets a unique ID. Makes it much simpler to check if two variables are the
      // same instance.
      this.id = Util.uniqid.get();

      this.initializedPixelData = (this.originalPixelData = null);
      this.cropCoordinates = {x: 0, y: 0};
      this.cropped = false;
      this.resized = false;

      this.pixelStack = [];  // Stores the pixel layers
      this.layerStack = [];  // Stores all of the layers waiting to be rendered
      this.canvasQueue = []; // Stores all of the canvases to be processed
      this.currentLayer = null;
      this.scaled = false;

      //this.analyze = new Analyze(this);
      this.renderer = new Renderer(this);

      this.domIsLoaded(() => {
        this.parseArguments(args);
        return this.setup();
      });

      return this;
    } else {
      return new Caman(arguments);
    }
  }

  // Checks to ensure the DOM is loaded. Ensures the callback is always fired, even
  // if the DOM is already loaded before it's invoked. The callback is also always
  // called asynchronously.
  //
  // @param [Function] cb The callback function to fire when the DOM is ready.
  domIsLoaded(cb) {
    if (document.readyState === "complete") {
      Log.debug("DOM initialized");
      return setTimeout(() => {
          return cb.call(this);
        }
        , 0);
    } else {
      const listener = () => {
        if (document.readyState === "complete") {
          Log.debug("DOM initialized");
          return cb.call(this);
        }
      };

      return document.addEventListener("readystatechange", listener, false);
    }
  }

  // Parses the arguments given to the Caman function, and sets the appropriate
  // properties on this instance.
  //
  // @params [Array] args Array of arguments passed to Caman.
  parseArguments(args) {
    if (args.length === 0) { throw "Invalid arguments given"; }

    // Defaults
    this.initObj = null;
    this.initType = null;
    this.imageUrl = null;
    this.callback = function() {};

    // First argument is always our canvas/image
    this.setInitObject(args[0]);
    if (args.length === 1) { return; }

    switch (typeof args[1]) {
      case "string": this.imageUrl = args[1]; break;
      case "function": this.callback = args[1]; break;
    }

    if (args.length === 2) { return; }

    this.callback = args[2];

    if (args.length === 4) {
      return (() => {
        const result = [];
        for (let key of Object.keys(args[4] || {})) {
          const val = args[4][key];
          result.push(this.options[key] = val);
        }
        return result;
      })();
    }
  }

  // Sets the initialization object for this instance.
  //
  // @param [Object, String] obj The initialization argument.
  setInitObject(obj) {
    if (typeof obj === "object") {
      this.initObj = obj;
    } else {
      this.initObj = $(obj);
    }

    if (this.initObj == null) { throw "Could not find image or canvas for initialization."; }

    return this.initType = this.initObj.nodeName.toLowerCase();
  }

  // Begins the setup process, which differs depending on whether we're in NodeJS,
  // or if an image or canvas object was provided.
  setup() {
    switch (this.initType) {
      case "node": return this.initNode();
      case "img": return this.initImage();
      case "canvas": return this.initCanvas();
    }
  }

  // Initialization function for the browser and image objects.
  initImage() {
    this.image = this.initObj;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    Util.copyAttributes(this.image, this.canvas, {except: ['src']});

    // Swap out the image with the canvas element if the image exists
    // in the DOM.
    if (this.image.parentNode != null) { this.image.parentNode.replaceChild(this.canvas, this.image); }

    this.imageAdjustments();
    return this.waitForImageLoaded();
  }

  // Initialization function for the browser and canvas objects.
  initCanvas() {
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
  }

  // Automatically check for a HiDPI capable screen and swap out the image if possible.
  // Also checks the image URL to see if it's a cross-domain request, and attempt to
  // proxy the image. If a cross-origin type is configured, the proxy will be ignored.
  imageAdjustments() {
    if (this.needsHiDPISwap()) {
      Log.debug(this.image.src, "->", this.hiDPIReplacement());

      this.swapped = true;
      this.image.src = this.hiDPIReplacement();
    }

    if (Caman.IO.isRemote(this.image)) {
      this.image.src = Caman.IO.proxyUrl(this.image.src);
      return Log.debug(`Remote image detected, using URL = ${this.image.src}`);
    }
  }

  // Utility function that fires {Caman#imageLoaded} once the image is finished loading.
  waitForImageLoaded() {
    if (this.isImageLoaded()) {
      return this.imageLoaded();
    } else {
      return this.image.onload = this.imageLoaded;
    }
  }

  // Checks if the given image is finished loading.
  // @return [Boolean] Is the image loaded?
  isImageLoaded() {
    if (!this.image.complete) { return false; }

    // Internet Explorer is weird.
    if ((this.image.naturalWidth != null) && (this.image.naturalWidth === 0)) { return false; }
    return true;
  }

  // Internet Explorer has issues figuring out image dimensions when they aren't
  // explicitly defined, apparently. We check the normal width/height properties first,
  // but fall back to natural sizes if they are 0.
  // @return [Number] Width of the initialization image.
  imageWidth() { return this.image.width || this.image.naturalWidth; }

  // @see Caman#imageWidth
  // @return [Number] Height of the initialization image.
  imageHeight() { return this.image.height || this.image.naturalHeight; }

  // Function that is called once the initialization image is finished loading.
  // We make sure that the canvas dimensions are properly set here.
  imageLoaded() {
    Log.debug(`Image loaded. Width = ${this.imageWidth()}, Height = ${this.imageHeight()}`);

    if (this.swapped) {
      this.canvas.width = this.imageWidth() / this.hiDPIRatio();
      this.canvas.height = this.imageHeight() / this.hiDPIRatio();
    } else {
      this.canvas.width = this.imageWidth();
      this.canvas.height = this.imageHeight();
    }

    return this.finishInit();
  }

  // Final step of initialization. We finish setting up our canvas element, and we
  // draw the image to the canvas (if applicable).
  finishInit() {
    if (this.context == null) { this.context = this.canvas.getContext('2d'); }

    this.originalWidth = (this.preScaledWidth = (this.width = this.canvas.width));
    this.originalHeight = (this.preScaledHeight = (this.height = this.canvas.height));

    this.hiDPIAdjustments();
    if (!this.hasId()) { this.assignId(); }

    if (this.image != null) {
      this.context.drawImage(this.image,
        0, 0,
        this.imageWidth(), this.imageHeight(),
        0, 0,
        this.preScaledWidth, this.preScaledHeight);
    }

    this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pixelData = this.imageData.data;

    if (Caman.allowRevert) {
      this.initializedPixelData = Util.dataArray(this.pixelData.length);
      this.originalPixelData = Util.dataArray(this.pixelData.length);

      for (let i = 0; i < this.pixelData.length; i++) {
        const pixel = this.pixelData[i];
        this.initializedPixelData[i] = pixel;
        this.originalPixelData[i] = pixel;
      }
    }

    this.dimensions = {
      width: this.canvas.width,
      height: this.canvas.height
    };

    Store.put(this.id, this);
    this.callback.call(this,this);

    // Reset the callback so re-initialization doesn't
    // trigger it again.
    return this.callback = function() {};
  }

  // If you have a separate context reference to this canvas outside of CamanJS
  // and you make a change to the canvas outside of CamanJS, you will have to call
  // this function to update our context reference to include those changes.
  reloadCanvasData() {
    this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    return this.pixelData = this.imageData.data;
  }

  // Reset the canvas pixels to the original state at initialization.
  resetOriginalPixelData() {
    if (!Caman.allowRevert) { throw "Revert disabled"; }

    this.originalPixelData = Util.dataArray(this.pixelData.length);
    return Array.from(this.pixelData).map((pixel, i) => (this.originalPixelData[i] = pixel));
  }

  // Does this instance have an ID assigned?
  // @return [Boolean] Existance of an ID.
  hasId() { return (Caman.getAttrId(this.canvas) != null); }

  // Assign a unique ID to this instance.
  assignId() {
    if (this.canvas.getAttribute('data-caman-id')) { return; }
    return this.canvas.setAttribute('data-caman-id', this.id);
  }

  // Is HiDPI support disabled via the HTML data attribute?
  // @return [Boolean]
  hiDPIDisabled() {
    return this.canvas.getAttribute('data-caman-hidpi-disabled') !== null;
  }

  // Perform HiDPI adjustments to the canvas. This consists of changing the
  // scaling and the dimensions to match that of the display.
  hiDPIAdjustments() {
    if (!this.needsHiDPISwap()) { return; }

    const ratio = this.hiDPIRatio();

    if (ratio !== 1) {
      Log.debug(`HiDPI ratio = ${ratio}`);
      this.scaled = true;

      this.preScaledWidth = this.canvas.width;
      this.preScaledHeight = this.canvas.height;

      this.canvas.width = this.preScaledWidth * ratio;
      this.canvas.height = this.preScaledHeight * ratio;
      this.canvas.style.width = `${this.preScaledWidth}px`;
      this.canvas.style.height = `${this.preScaledHeight}px`;

      this.context.scale(ratio, ratio);

      this.width = (this.originalWidth = this.canvas.width);
      return this.height = (this.originalHeight = this.canvas.height);
    }
  }

  // Calculate the HiDPI ratio of this display based on the backing store
  // and the pixel ratio.
  // @return [Number] The HiDPI pixel ratio.
  hiDPIRatio() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = this.context.webkitBackingStorePixelRatio ||
      this.context.mozBackingStorePixelRatio ||
      this.context.msBackingStorePixelRatio ||
      this.context.oBackingStorePixelRatio ||
      this.context.backingStorePixelRatio || 1;

    return devicePixelRatio / backingStoreRatio;
  }

  // Is this display HiDPI capable?
  // @return [Boolean]
  hiDPICapable() { return (window.devicePixelRatio != null) && (window.devicePixelRatio !== 1); }

  // Do we need to perform an image swap with a HiDPI image?
  // @return [Boolean]
  needsHiDPISwap() {
    if (this.hiDPIDisabled() || !this.hiDPICapable()) { return false; }
    return this.hiDPIReplacement() !== null;
  }

  // Gets the HiDPI replacement for the initialization image.
  // @return [String] URL to the HiDPI version.
  hiDPIReplacement() {
    if (this.image == null) { return null; }
    return this.image.getAttribute('data-caman-hidpi');
  }

  // Replaces the current canvas with a new one, and properly updates all of the
  // applicable references for this instance.
  //
  // @param [DOMObject] newCanvas The canvas to swap into this instance.
  replaceCanvas(newCanvas) {
    const oldCanvas = this.canvas;
    this.canvas = newCanvas;
    this.context = this.canvas.getContext('2d');

    oldCanvas.parentNode.replaceChild(this.canvas, oldCanvas);

    this.width  = this.canvas.width;
    this.height = this.canvas.height;

    this.reloadCanvasData();

    return this.dimensions = {
      width: this.canvas.width,
      height: this.canvas.height
    };
  }

  // Begins the rendering process. This will execute all of the filter functions
  // called either since initialization or the previous render.
  //
  // @param [Function] callback Function to call when rendering is finished.
  render(callback) {
    if (callback == null) { callback = function() {}; }
    Caman.Event.trigger(this, "renderStart");

    return this.renderer.execute(() => {
      this.context.putImageData(this.imageData, 0, 0);
      return callback.call(this);
    });
  }

  // Reverts the canvas back to it's original state while
  // maintaining any cropped or resized dimensions.
  //
  // @param [Boolean] updateContext Should we apply the reverted pixel data to the
  //   canvas context thus triggering a re-render by the browser?
  revert(updateContext) {
    if (updateContext == null) { updateContext = true; }
    if (!Caman.allowRevert) { throw "Revert disabled"; }

    const iterable = this.originalVisiblePixels();
    for (let i = 0; i < iterable.length; i++) { const pixel = iterable[i]; this.pixelData[i] = pixel; }
    if (updateContext) { return this.context.putImageData(this.imageData, 0, 0); }
  }

  // Completely resets the canvas back to it's original state.
  // Any size adjustments will also be reset.
  reset() {
    const canvas = document.createElement('canvas');
    Util.copyAttributes(this.canvas, canvas);

    canvas.width = this.originalWidth;
    canvas.height = this.originalHeight;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;

    for (let i = 0; i < this.initializedPixelData.length; i++) { const pixel = this.initializedPixelData[i]; pixelData[i] = pixel; }

    ctx.putImageData(imageData, 0, 0);

    this.cropCoordinates = {x: 0, y: 0};
    this.resized = false;

    return this.replaceCanvas(canvas);
  }

  // Returns the original pixel data while maintaining any
  // cropping or resizing that may have occured.
  // **Warning**: this is currently in beta status.
  //
  // @return [Array] Original pixel values still visible after cropping or resizing.
  originalVisiblePixels() {
    let i, pixelData, width;
    let end;
    if (!Caman.allowRevert) { throw "Revert disabled"; }

    const pixels = [];

    const startX = this.cropCoordinates.x;
    const endX = startX + this.width;
    const startY = this.cropCoordinates.y;
    const endY = startY + this.height;

    if (this.resized) {
      const canvas = document.createElement('canvas');
      canvas.width = this.originalWidth;
      canvas.height = this.originalHeight;

      let ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      pixelData = imageData.data;

      for (i = 0; i < this.originalPixelData.length; i++) { const pixel = this.originalPixelData[i]; pixelData[i] = pixel; }

      ctx.putImageData(imageData, 0, 0);

      const scaledCanvas = document.createElement('canvas');
      scaledCanvas.width = this.width;
      scaledCanvas.height = this.height;

      ctx = scaledCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, 0, this.originalWidth, this.originalHeight, 0, 0, this.width, this.height);

      pixelData = ctx.getImageData(0, 0, this.width, this.height).data;
      ({ width } = this);
    } else {
      pixelData = this.originalPixelData;
      width = this.originalWidth;
    }

    for (i = 0, end = pixelData.length; i < end; i += 4) {
      const coord = Caman.Pixel.locationToCoordinates(i, width);
      if ((startX <= coord.x && coord.x < endX) && (startY <= coord.y && coord.y < endY)) {
        pixels.push(pixelData[i],
          pixelData[i+1],
          pixelData[i+2],
          pixelData[i+3]);
      }
    }

    return pixels;
  }

  // Pushes the filter callback that modifies the RGBA object into the
  // render queue.
  //
  // @param [String] name Name of the filter function.
  // @param [Function] processFn The Filter function.
  // @return [Caman]
  process(name, processFn) {
    this.renderer.add({
      type: Caman.Filter.Type.Single,
      name,
      processFn
    });

    return this;
  }

  // Pushes the kernel into the render queue.
  //
  // @param [String] name The name of the kernel.
  // @param [Array] adjust The convolution kernel represented as a 1D array.
  // @param [Number] divisor The divisor for the convolution.
  // @param [Number] bias The bias for the convolution.
  // @return [Caman]
  processKernel(name, adjust, divisor = null, bias) {
    if (bias == null) { bias = 0; }
    if (divisor == null) {
      divisor = 0;
      for (let i = 0, end = adjust.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) { divisor += adjust[i]; }
    }

    this.renderer.add({
      type: Caman.Filter.Type.Kernel,
      name,
      adjust,
      divisor,
      bias
    });

    return this;
  }

  // Adds a standalone plugin into the render queue.
  //
  // @param [String] plugin Name of the plugin.
  // @param [Array] args Array of arguments to pass to the plugin.
  // @return [Caman]
  processPlugin(plugin, args) {
    this.renderer.add({
      type: Caman.Filter.Type.Plugin,
      plugin,
      args
    });

    return this;
  }

  // Pushes a new layer operation into the render queue and calls the layer
  // callback.
  //
  // @param [Function] callback Function that is executed within the context of the layer.
  //   All filter and adjustment functions for the layer will be executed inside of this function.
  // @return [Caman]
  newLayer(callback) {
    const layer = new Caman.Layer(this);
    this.canvasQueue.push(layer);
    this.renderer.add({type: Caman.Filter.Type.LayerDequeue});

    callback.call(layer);

    this.renderer.add({type: Caman.Filter.Type.LayerFinished});
    return this;
  }

  // Pushes the layer context and moves to the next operation.
  // @param [Layer] layer The layer to execute.
  executeLayer(layer) { return this.pushContext(layer); }

  // Set all of the relevant data to the new layer.
  // @param [Layer] layer The layer whose context we want to switch to.
  pushContext(layer) {
    this.layerStack.push(this.currentLayer);
    this.pixelStack.push(this.pixelData);
    this.currentLayer = layer;
    return this.pixelData = layer.pixelData;
  }

  // Restore the previous layer context.
  popContext() {
    this.pixelData = this.pixelStack.pop();
    return this.currentLayer = this.layerStack.pop();
  }

  // Applies the current layer to its parent layer.
  applyCurrentLayer() { return this.currentLayer.applyToParent(); }

  save() {
    return this.browserSave.apply(this, arguments);
  };

  browserSave(type) {
    if (type == null) { type = "png"; }
    type = type.toLowerCase();

    // Force download (its a bit hackish)
    const image = this.toBase64(type).replace(`image/${type}`, "image/octet-stream");
    return document.location.href = image;
  };

  // Takes the current canvas data, converts it to Base64, then sets it as the source
  // of a new Image object and returns it.
  toImage(type) {
    const img = new Image();
    img.src = this.toBase64(type);
    img.width = this.dimensions.width;
    img.height = this.dimensions.height;

    if (window.devicePixelRatio) {
      img.width /= window.devicePixelRatio;
      img.height /= window.devicePixelRatio;
    }

    return img;
  };

  // Base64 encodes the current canvas
  toBase64(type) {
    if (type == null) { type = "png"; }
    type = type.toLowerCase();
    return this.canvas.toDataURL(`image/${type}`);
  };
}

Caman.initClass();

window.Caman = Caman;

export default Caman;
