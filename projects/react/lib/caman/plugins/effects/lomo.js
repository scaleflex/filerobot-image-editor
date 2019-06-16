Caman.Filter.register("lomo", function (vignette) {
  if (vignette == null) {
    vignette = true;
  }
  this.brightness(15);
  this.exposure(15);
  this.curves('rgb', [0, 0], [200, 0], [155, 255], [255, 255]);
  this.saturation(-20);
  this.gamma(1.8);
  if (vignette) {
    this.vignette("50%", 60);
  }
  return this.brightness(5);
});