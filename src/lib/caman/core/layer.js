import { Util, $ } from './util';
import Blender from './blander';

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
class Layer {
  constructor(c) {
    // Compatibility
    this.c = c;
    this.filter = this.c;

    this.options = {
      blendingMode: 'normal',
      opacity: 1.0
    };

    // Each layer gets its own unique ID
    this.layerID = Util.uniqid.get();

    // Create the canvas for this layer
    this.canvas = document.createElement('canvas');

    this.canvas.width = this.c.dimensions.width;
    this.canvas.height = this.c.dimensions.height;

    this.context = this.canvas.getContext('2d');
    this.context.createImageData(this.canvas.width, this.canvas.height);
    this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pixelData = this.imageData.data;
  }

  // If you want to create nested layers
  newLayer(cb) { return this.c.newLayer.call(this.c, cb); }

  // Sets the blending mode of this layer. The mode is the name of a blender function.
  setBlendingMode(mode) {
    this.options.blendingMode = mode;
    return this;
  }

  // Sets the opacity of this layer. This affects how much of this layer is applied to the parent
  // layer at render time.
  opacity(opacity) {
    this.options.opacity = opacity / 100;
    return this;
  }

  // Copies the contents of the parent layer to this layer
  copyParent() {
    const parentData = this.c.pixelData;

    for (let i = 0, end = this.c.pixelData.length; i < end; i += 4) {
      this.pixelData[i]   = parentData[i];
      this.pixelData[i+1] = parentData[i+1];
      this.pixelData[i+2] = parentData[i+2];
      this.pixelData[i+3] = parentData[i+3];
    }

    return this;
  }

  // Fills this layer with a single color
  fillColor() { return this.c.fillColor.apply(this.c, arguments); }

  // Loads and overlays an image onto this layer
  overlayImage(image) {
    if (typeof image === "object") {
      image = image.src;
    } else if ((typeof image === "string") && (image[0] === "#")) {
      image = $(image).src;
    }

    if (!image) { return this; }

    this.c.renderer.renderQueue.push({
      type: Caman.Filter.Type.LoadOverlay,
      src: image,
      layer: this
    });

    return this;
  }

  // Loads a layer mask, to affect the opacity of individual pixels during blending
  layerMask(image) {
    if (typeof image === "object") {
      image = image.src;
    } else if ((typeof image === "string") && (image[0] === "#")) {
      image = $(image).src;
    }

    if (!image) { return this; }

    this.c.renderer.renderQueue.push({
      type: Caman.Filter.Type.LoadLayerMask,
      src: image,
      layer: this
    });

    return this;
  }

  // Takes the contents of this layer and applies them to the parent layer at render time. This
  // should never be called explicitly by the user.
  applyToParent() {
    const parentData = this.c.pixelStack[this.c.pixelStack.length - 1];
    const layerData = this.c.pixelData;
    let { opacity } = this.options;

    return (() => {
      const result1 = [];
      for (let i = 0, end = layerData.length; i < end; i += 4) {
        const rgbaParent = {
          r: parentData[i],
          g: parentData[i+1],
          b: parentData[i+2],
          a: parentData[i+3]
        };

        const rgbaLayer = {
          r: layerData[i],
          g: layerData[i+1],
          b: layerData[i+2],
          a: layerData[i+3]
        };

        if (this.maskData) {
          opacity = this.maskData[i] / 255; // only the red channel is used
        }

        const result = Blender.execute(this.options.blendingMode, rgbaLayer, rgbaParent);

        result.r = Util.clampRGB(result.r);
        result.g = Util.clampRGB(result.g);
        result.b = Util.clampRGB(result.b);
        if ((result.a == null)) { result.a = rgbaLayer.a; }

        parentData[i]   = rgbaParent.r - (
          (rgbaParent.r - result.r) * (opacity * (result.a / 255))
        );
        parentData[i+1] = rgbaParent.g - (
          (rgbaParent.g - result.g) * (opacity * (result.a / 255))
        );
        result1.push(parentData[i+2] = rgbaParent.b - (
          (rgbaParent.b - result.b) * (opacity * (result.a / 255))
        ));
      }
      return result1;
    })();
  }
}

Caman.Layer = Layer;
