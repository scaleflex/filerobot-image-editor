Caman.Filter.register("crossProcess", function () {
  this.exposure(5);
  this.colorize("#e87b22", 4);
  this.sepia(20);
  this.channels({
    blue: 8,
    red: 3
  });
  this.curves('b', [0, 0], [100, 150], [180, 180], [255, 255]);
  this.contrast(15);
  this.vibrance(75);
  return this.gamma(1.6);
});