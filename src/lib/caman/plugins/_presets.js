/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Caman.Filter.register("vintage", function(vignette) {
  if (vignette == null) { vignette = true; }
  this.greyscale();
  this.contrast(5);
  this.noise(3);
  this.sepia(100);
  this.channels({red: 8, blue: 2, green: 4});
  this.gamma(0.87);

  if (vignette) { return this.vignette("40%", 30); }
});

Caman.Filter.register("lomo", function(vignette) {
  if (vignette == null) { vignette = true; }
  this.brightness(15);
  this.exposure(15);
  this.curves('rgb', [0, 0], [200, 0], [155, 255], [255, 255]);
  this.saturation(-20);
  this.gamma(1.8);
  if (vignette) { this.vignette("50%", 60); }
  return this.brightness(5);
});

Caman.Filter.register("clarity", function(grey) {
  if (grey == null) { grey = false; }
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

Caman.Filter.register("sinCity", function() {
  this.contrast(100);
  this.brightness(15);
  this.exposure(10);
  this.posterize(80);
  this.clip(30);
  return this.greyscale();
});

Caman.Filter.register("sunrise", function() {
  this.exposure(3.5);
  this.saturation(-5);
  this.vibrance(50);
  this.sepia(60);
  this.colorize("#e87b22", 10);
  this.channels({red: 8, blue: 8});
  this.contrast(5);
  this.gamma(1.2);
  return this.vignette("55%", 25);
});

Caman.Filter.register("crossProcess", function() {
  this.exposure(5);
  this.colorize("#e87b22", 4);
  this.sepia(20);
  this.channels({blue: 8, red: 3});
  this.curves('b', [0, 0], [100, 150], [180, 180], [255, 255]);
  this.contrast(15);
  this.vibrance(75);
  return this.gamma(1.6);
});

Caman.Filter.register("orangePeel", function() {
  this.curves('rgb', [0, 0], [100, 50], [140, 200], [255, 255]);
  this.vibrance(-30);
  this.saturation(-30);
  this.colorize('#ff9000', 30);
  this.contrast(-5);
  return this.gamma(1.4);
});

Caman.Filter.register("love", function() {
  this.brightness(5);
  this.exposure(8);
  this.contrast(4);
  this.colorize('#c42007', 30);
  this.vibrance(50);
  return this.gamma(1.3);
});

Caman.Filter.register("grungy", function() {
  this.gamma(1.5);
  this.clip(25);
  this.saturation(-60);
  this.contrast(5);
  this.noise(5);
  return this.vignette("50%", 30);
});

Caman.Filter.register("jarques", function() {
  this.saturation(-35);
  this.curves('b', [20, 0], [90, 120], [186, 144], [255, 230]);
  this.curves('r', [0, 0], [144, 90], [138, 120], [255, 255]);
  this.curves('g', [10, 0], [115, 105], [148, 100], [255, 248]);
  this.curves('rgb', [0, 0], [120, 100], [128, 140], [255, 255]);
  return this.sharpen(20);
});

Caman.Filter.register("pinhole", function() {
  this.greyscale();
  this.sepia(10);
  this.exposure(10);
  this.contrast(15);
  return this.vignette("60%", 35);
});

Caman.Filter.register("oldBoot", function() {
  this.saturation(-20);
  this.vibrance(-50);
  this.gamma(1.1);
  this.sepia(30);
  this.channels({red: -10, blue: 5});
  this.curves('rgb', [0, 0], [80, 50], [128, 230], [255, 255]);
  return this.vignette("60%", 30);
});

Caman.Filter.register("glowingSun", function(vignette) {
  if (vignette == null) { vignette = true; }
  this.brightness(10);

  this.newLayer(function() {
    this.setBlendingMode("multiply");
    this.opacity(80);
    this.copyParent();

    this.filter.gamma(0.8);
    this.filter.contrast(50);
    return this.filter.exposure(10);
  });

  this.newLayer(function() {
    this.setBlendingMode("softLight");
    this.opacity(80);
    return this.fillColor("#f49600");
  });

  this.exposure(20);
  this.gamma(0.8);
  if (vignette) { return this.vignette("45%", 20); }
});

Caman.Filter.register("hazyDays", function() {
  this.gamma(1.2);

  this.newLayer(function() {
    this.setBlendingMode("overlay");
    this.opacity(60);
    this.copyParent();

    this.filter.channels({red: 5});
    return this.filter.stackBlur(15);
  });

  this.newLayer(function() {
    this.setBlendingMode("addition");
    this.opacity(40);
    return this.fillColor("#6899ba");
  });

  this.newLayer(function() {
    this.setBlendingMode("multiply");
    this.opacity(35);
    this.copyParent();

    this.filter.brightness(40);
    this.filter.vibrance(40);
    this.filter.exposure(30);
    this.filter.contrast(15);

    this.filter.curves('r', [0, 40], [128, 128], [128, 128], [255, 215]);
    this.filter.curves('g', [0, 40], [128, 128], [128, 128], [255, 215]);
    this.filter.curves('b', [0, 40], [128, 128], [128, 128], [255, 215]);

    return this.filter.stackBlur(5);
  });

  this.curves('r', [20, 0], [128, 158], [128, 128], [235, 255]);
  this.curves('g', [20, 0], [128, 128], [128, 128], [235, 255]);
  this.curves('b', [20, 0], [128, 108], [128, 128], [235, 255]);

  return this.vignette("45%", 20);
});

Caman.Filter.register("herMajesty", function() {
  this.brightness(40);
  this.colorize("#ea1c5d", 10);
  this.curves('b', [0, 10], [128, 180], [190, 190], [255, 255]);

  this.newLayer(function() {
    this.setBlendingMode('overlay');
    this.opacity(50);
    this.copyParent();

    this.filter.gamma(0.7);
    return this.newLayer(function() {
      this.setBlendingMode('normal');
      this.opacity(60);
      return this.fillColor('#ea1c5d');
    });
  });

  this.newLayer(function() {
    this.setBlendingMode('multiply');
    this.opacity(60);
    this.copyParent();

    this.filter.saturation(50);
    this.filter.hue(90);
    return this.filter.contrast(10);
  });

  this.gamma(1.4);
  this.vibrance(-30);

  this.newLayer(function() {
    this.opacity(10);
    return this.fillColor('#e5f0ff');
  });

  return this;
});

Caman.Filter.register("nostalgia", function() {
  this.saturation(20);
  this.gamma(1.4);
  this.greyscale();
  this.contrast(5);
  this.sepia(100);
  this.channels({red: 8, blue: 2, green: 4});
  this.gamma(0.8);
  this.contrast(5);
  this.exposure(10);

  this.newLayer(function() {
    this.setBlendingMode('overlay');
    this.copyParent();
    this.opacity(55);

    return this.filter.stackBlur(10);
  });

  return this.vignette("50%", 30);
});

Caman.Filter.register("hemingway", function() {
  this.greyscale();
  this.contrast(10);
  this.gamma(0.9);

  this.newLayer(function() {
    this.setBlendingMode("multiply");
    this.opacity(40);
    this.copyParent();

    this.filter.exposure(15);
    this.filter.contrast(15);
    return this.filter.channels({green: 10, red: 5});
  });

  this.sepia(30);
  this.curves('rgb', [0, 10], [120, 90], [180, 200], [235, 255]);
  this.channels({red: 5, green: -2});
  return this.exposure(15);
});

Caman.Filter.register("concentrate", function() {
  this.sharpen(40);
  this.saturation(-50);
  this.channels({red: 3});

  this.newLayer(function() {
    this.setBlendingMode("multiply");
    this.opacity(80);
    this.copyParent();

    this.filter.sharpen(5);
    this.filter.contrast(50);
    this.filter.exposure(10);
    return this.filter.channels({blue: 5});
  });

  return this.brightness(10);
});