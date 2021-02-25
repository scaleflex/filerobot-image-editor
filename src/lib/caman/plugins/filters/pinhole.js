Caman.Filter.register("pinhole", function () {
  this.greyscale();
  this.sepia(10);
  this.exposure(10);
  this.contrast(15);
  return this.vignette("60%", 35);
});