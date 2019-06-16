Caman.Filter.register("sunrise", function () {
  this.exposure(3.5);
  this.saturation(-5);
  this.vibrance(50);
  this.sepia(60);
  this.colorize("#e87b22", 10);
  this.channels({
    red: 8,
    blue: 8
  });
  this.contrast(5);
  this.gamma(1.2);
  return this.vignette("55%", 25);
});