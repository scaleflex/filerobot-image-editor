Caman.Filter.register("love", function () {
  this.brightness(5);
  this.exposure(8);
  this.contrast(4);
  this.colorize('#c42007', 30);
  this.vibrance(50);
  return this.gamma(1.3);
});