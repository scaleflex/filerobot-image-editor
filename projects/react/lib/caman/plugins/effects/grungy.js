Caman.Filter.register("grungy", function() {
  this.gamma(1.5);
  this.clip(25);
  this.saturation(-60);
  this.contrast(5);
  this.noise(5);
  return this.vignette("50%", 30);
});