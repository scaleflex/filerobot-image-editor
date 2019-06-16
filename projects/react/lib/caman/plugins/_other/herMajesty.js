Caman.Filter.register("herMajesty", function () {
  this.brightness(40);
  this.colorize("#ea1c5d", 10);
  this.curves('b', [0, 10], [128, 180], [190, 190], [255, 255]);
  this.newLayer(function () {
    this.setBlendingMode('overlay');
    this.opacity(50);
    this.copyParent();
    this.filter.gamma(0.7);
    return this.newLayer(function () {
      this.setBlendingMode('normal');
      this.opacity(60);
      return this.fillColor('#ea1c5d');
    });
  });
  this.newLayer(function () {
    this.setBlendingMode('multiply');
    this.opacity(60);
    this.copyParent();
    this.filter.saturation(50);
    this.filter.hue(90);
    return this.filter.contrast(10);
  });
  this.gamma(1.4);
  this.vibrance(-30);
  this.newLayer(function () {
    this.opacity(10);
    return this.fillColor('#e5f0ff');
  });
  return this;
});