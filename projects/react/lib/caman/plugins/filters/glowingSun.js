Caman.Filter.register("glowingSun", function (vignette) {
  if (vignette == null) {
    vignette = true;
  }
  this.brightness(10);
  this.newLayer(function () {
    this.setBlendingMode("multiply");
    this.opacity(80);
    this.copyParent();
    this.filter.gamma(0.8);
    this.filter.contrast(50);
    return this.filter.exposure(10);
  });
  this.newLayer(function () {
    this.setBlendingMode("softLight");
    this.opacity(80);
    return this.fillColor("#f49600");
  });
  this.exposure(20);
  this.gamma(0.8);
  if (vignette) {
    return this.vignette("45%", 20);
  }
});