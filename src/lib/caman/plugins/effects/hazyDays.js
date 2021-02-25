Caman.Filter.register("hazyDays", function () {
  this.gamma(1.2);
  this.newLayer(function () {
    this.setBlendingMode("overlay");
    this.opacity(60);
    this.copyParent();
    this.filter.channels({
      red: 5
    });
    return this.filter.stackBlur(15);
  });
  this.newLayer(function () {
    this.setBlendingMode("addition");
    this.opacity(40);
    return this.fillColor("#6899ba");
  });
  this.newLayer(function () {
    this.setBlendingMode("multiply");
    this.opacity(35);
    this.copyParent();
    this.filter.brightness(40);
    this.filter.vibrance(40);
    this.filter.exposure(30);
    this.filter.contrast(15);
    this.filter.curves('r', [0, 40], [128, 128], [128, 128], [255, 215]);
    this.filter.curves('g', [0, 40], [128, 128], [128, 128], [255, 215]);
    this.filter.curves('b', [0, 40], [128, 128], [128, 128], [255, 215]);
    return this.filter.stackBlur(5);
  });
  this.curves('r', [20, 0], [128, 158], [128, 128], [235, 255]);
  this.curves('g', [20, 0], [128, 128], [128, 128], [235, 255]);
  this.curves('b', [20, 0], [128, 108], [128, 128], [235, 255]);
  return this.vignette("45%", 20);
});