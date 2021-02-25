Caman.Filter.register("orangePeel", function () {
  this.curves('rgb', [0, 0], [100, 50], [140, 200], [255, 255]);
  this.vibrance(-30);
  this.saturation(-30);
  this.colorize('#ff9000', 30);
  this.contrast(-5);
  return this.gamma(1.4);
});