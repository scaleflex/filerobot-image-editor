import { Util } from '../core/util';
import { Log } from '../core/logger';


Caman.Plugin.register("crop", function (width, height, x, y) {
  let canvas, ctx;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }

  canvas = document.createElement('canvas');
  Util.copyAttributes(this.canvas, canvas);
  canvas.width = width;
  canvas.height = height;

  ctx = canvas.getContext('2d');
  ctx.drawImage(this.canvas, x, y, width, height, 0, 0, width, height);
  this.cropCoordinates = {
    x: x,
    y: y
  };
  this.cropped = true;
  return this.replaceCanvas(canvas);
});

Caman.Plugin.register("resize", function (newDims) {
  var canvas, ctx;
  if (newDims == null) {
    newDims = null;
  }
  if (newDims === null || ((newDims.width == null) && (newDims.height == null))) {
    Log.error("Invalid or missing dimensions given for resize");
    return;
  }
  if (newDims.width == null) {
    newDims.width = this.canvas.width * newDims.height / this.canvas.height;
  } else if (newDims.height == null) {
    newDims.height = this.canvas.height * newDims.width / this.canvas.width;
  }

  canvas = document.createElement('canvas');
  Util.copyAttributes(this.canvas, canvas);
  canvas.width = newDims.width;
  canvas.height = newDims.height;
  ctx = canvas.getContext('2d');
  ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, newDims.width, newDims.height);
  this.resized = true;
  return this.replaceCanvas(canvas);
});

Caman.Filter.register("crop", function () {
  return this.processPlugin("crop", Array.prototype.slice.call(arguments, 0));
});

Caman.Filter.register("resize", function () {
  return this.processPlugin("resize", Array.prototype.slice.call(arguments, 0));
});