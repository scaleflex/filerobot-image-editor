Caman.Filter.register("vintage", function (vignette) {
  if (vignette == null) {
    vignette = true;
  }
  this.greyscale();
  this.contrast(5);
  this.noise(3);
  this.sepia(100);
  this.channels({
    red: 8,
    blue: 2,
    green: 4
  });
  this.gamma(0.87);
  if (vignette) {
    return this.vignette("40%", 30);
  }
});