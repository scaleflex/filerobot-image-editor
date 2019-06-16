Caman.Filter.register("concentrate", function () {
  this.sharpen(40);
  this.saturation(-50);
  this.channels({
    red: 3
  });
  this.newLayer(function () {
    this.setBlendingMode("multiply");
    this.opacity(80);
    this.copyParent();
    this.filter.sharpen(5);
    this.filter.contrast(50);
    this.filter.exposure(10);
    return this.filter.channels({
      blue: 5
    });
  });
  return this.brightness(10);
});