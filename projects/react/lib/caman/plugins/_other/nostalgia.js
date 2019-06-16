Caman.Filter.register("nostalgia", function () {
  this.saturation(20);
  this.gamma(1.4);
  this.greyscale();
  this.contrast(5);
  this.sepia(100);
  this.channels({
    red: 8,
    blue: 2,
    green: 4
  });
  this.gamma(0.8);
  this.contrast(5);
  this.exposure(10);
  this.newLayer(function () {
    this.setBlendingMode('overlay');
    this.copyParent();
    this.opacity(55);
    return this.filter.stackBlur(10);
  });
  return this.vignette("50%", 30);
});