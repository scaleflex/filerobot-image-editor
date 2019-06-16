Caman.Filter.register("oldBoot", function () {
  this.saturation(-20);
  this.vibrance(-50);
  this.gamma(1.1);
  this.sepia(30);
  this.channels({
    red: -10,
    blue: 5
  });
  this.curves('rgb', [0, 0], [80, 50], [128, 230], [255, 255]);
  return this.vignette("60%", 30);
});
