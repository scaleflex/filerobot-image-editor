Caman.Filter.register("hemingway", function () {
  this.greyscale();
  this.contrast(10);
  this.gamma(0.9);
  this.newLayer(function () {
    this.setBlendingMode("multiply");
    this.opacity(40);
    this.copyParent();
    this.filter.exposure(15);
    this.filter.contrast(15);
    return this.filter.channels({
      green: 10,
      red: 5
    });
  });
  this.sepia(30);
  this.curves('rgb', [0, 10], [120, 90], [180, 200], [235, 255]);
  this.channels({
    red: 5,
    green: -2
  });
  return this.exposure(15);
});