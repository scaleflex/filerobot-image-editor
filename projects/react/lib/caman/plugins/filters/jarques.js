Caman.Filter.register("jarques", function () {
  this.saturation(-35);
  this.curves('b', [20, 0], [90, 120], [186, 144], [255, 230]);
  this.curves('r', [0, 0], [144, 90], [138, 120], [255, 255]);
  this.curves('g', [10, 0], [115, 105], [148, 100], [255, 248]);
  this.curves('rgb', [0, 0], [120, 100], [128, 140], [255, 255]);
  return this.sharpen(20);
});