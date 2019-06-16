Caman.Filter.register("vignette", function (size, strength) {
  var bezier, center, end, start;
  if (strength == null) {
    strength = 60;
  }
  if (typeof size === "string" && size.substr(-1) === "%") {
    if (this.dimensions.height > this.dimensions.width) {
      size = this.dimensions.width * (parseInt(size.substr(0, size.length - 1), 10) / 100);
    } else {
      size = this.dimensions.height * (parseInt(size.substr(0, size.length - 1), 10) / 100);
    }
  }
  strength /= 100;
  center = [this.dimensions.width / 2, this.dimensions.height / 2];
  start = Math.sqrt(Math.pow(center[0], 2) + Math.pow(center[1], 2));
  end = start - size;
  bezier = Caman.Calculate.bezier([0, 1], [30, 30], [70, 60], [100, 80]);
  return this.process("vignette", function (rgba) {
    var dist, div, loc;
    loc = rgba.locationXY();
    dist = Caman.Calculate.distance(loc.x, loc.y, center[0], center[1]);
    if (dist > end) {
      div = Math.max(1, (bezier[Math.round(((dist - end) / size) * 100)] / 10) * strength);
      rgba.r = Math.pow(rgba.r / 255, div) * 255;
      rgba.g = Math.pow(rgba.g / 255, div) * 255;
      rgba.b = Math.pow(rgba.b / 255, div) * 255;
    }
    return rgba;
  });
});