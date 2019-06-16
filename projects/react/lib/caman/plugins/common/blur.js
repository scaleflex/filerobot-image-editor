Caman.Filter.register("boxBlur", function () {
  return this.processKernel("Box Blur", [1, 1, 1, 1, 1, 1, 1, 1, 1]);
});

Caman.Filter.register("heavyRadialBlur", function () {
  return this.processKernel("Heavy Radial Blur", [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0]);
});

Caman.Filter.register("gaussianBlur", function () {
  return this.processKernel("Gaussian Blur", [1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1]);
});

Caman.Filter.register("motionBlur", function (degrees) {
  var kernel;
  if (degrees === 0 || degrees === 180) {
    kernel = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0];
  } else if ((degrees > 0 && degrees < 90) || (degrees > 180 && degrees < 270)) {
    kernel = [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];
  } else if (degrees === 90 || degrees === 270) {
    kernel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  } else {
    kernel = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
  }
  return this.processKernel("Motion Blur", kernel);
});


Caman.Filter.register("sharpen", function (amt) {
  if (amt == null) {
    amt = 100;
  }
  amt /= 100;
  return this.processKernel("Sharpen", [0, -amt, 0, -amt, 4 * amt + 1, -amt, 0, -amt, 0]);
});