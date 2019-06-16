import { Util } from '../core/util';

Caman.Plugin.register("rotate", function (degrees) {
  var angle, canvas, ctx, height, to_radians, width, x, y;
  angle = degrees % 360;
  if (angle === 0) {
    return this.dimensions = {
      width: this.canvas.width,
      height: this.canvas.height
    };
  }
  to_radians = Math.PI / 180;
  canvas = document.createElement('canvas');
  Util.copyAttributes(this.canvas, canvas);

  if (angle === 90 || angle === -270 || angle === 270 || angle === -90) {
    width = this.canvas.height;
    height = this.canvas.width;
    x = width / 2;
    y = height / 2;
  } else if (angle === 180) {
    width = this.canvas.width;
    height = this.canvas.height;
    x = width / 2;
    y = height / 2;
  } else {
    width = Math.sqrt(Math.pow(this.originalWidth, 2) + Math.pow(this.originalHeight, 2));
    height = width;
    x = this.canvas.height / 2;
    y = this.canvas.width / 2;
  }
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle * to_radians);
  ctx.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height);
  ctx.restore();
  return this.replaceCanvas(canvas);
});

Caman.Filter.register("rotate", function () {
  return this.processPlugin("rotate", Array.prototype.slice.call(arguments, 0));
});