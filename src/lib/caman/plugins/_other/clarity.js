Caman.Filter.register("clarity", function (grey) {
  if (grey == null) {
    grey = false;
  }
  this.vibrance(20);
  this.curves('rgb', [5, 0], [130, 150], [190, 220], [250, 255]);
  this.sharpen(15);
  this.vignette("45%", 20);
  if (grey) {
    this.greyscale();
    this.contrast(4);
  }
  return this;
});