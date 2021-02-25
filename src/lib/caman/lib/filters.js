Caman.Filter.register("fillColor", function () {
  var color;
  if (arguments.length === 1) {
    color = Caman.Convert.hexToRGB(arguments[0]);
  } else {
    color = {
      r: arguments[0],
      g: arguments[1],
      b: arguments[2]
    };
  }
  return this.process("fillColor", function (rgba) {
    rgba.r = color.r;
    rgba.g = color.g;
    rgba.b = color.b;
    rgba.a = 255;
    return rgba;
  });
});

Caman.Filter.register("brightness", function (adjust) {
  adjust = Math.floor(255 * (adjust / 100));
  return this.process("brightness", function (rgba) {
    rgba.r += adjust;
    rgba.g += adjust;
    rgba.b += adjust;
    return rgba;
  });
});

Caman.Filter.register("saturation", function (adjust) {
  adjust *= -0.01;
  return this.process("saturation", function (rgba) {
    var max;
    max = Math.max(rgba.r, rgba.g, rgba.b);
    if (rgba.r !== max) {
      rgba.r += (max - rgba.r) * adjust;
    }
    if (rgba.g !== max) {
      rgba.g += (max - rgba.g) * adjust;
    }
    if (rgba.b !== max) {
      rgba.b += (max - rgba.b) * adjust;
    }
    return rgba;
  });
});

Caman.Filter.register("vibrance", function (adjust) {
  adjust *= -1;
  return this.process("vibrance", function (rgba) {
    var amt, avg, max;
    max = Math.max(rgba.r, rgba.g, rgba.b);
    avg = (rgba.r + rgba.g + rgba.b) / 3;
    amt = ((Math.abs(max - avg) * 2 / 255) * adjust) / 100;
    if (rgba.r !== max) {
      rgba.r += (max - rgba.r) * amt;
    }
    if (rgba.g !== max) {
      rgba.g += (max - rgba.g) * amt;
    }
    if (rgba.b !== max) {
      rgba.b += (max - rgba.b) * amt;
    }
    return rgba;
  });
});

Caman.Filter.register("greyscale", function (adjust) {
  return this.process("greyscale", function (rgba) {
    var avg;
    avg = Caman.Calculate.luminance(rgba);
    rgba.r = avg;
    rgba.g = avg;
    rgba.b = avg;
    return rgba;
  });
});

Caman.Filter.register("contrast", function (adjust) {
  adjust = Math.pow((adjust + 100) / 100, 2);
  return this.process("contrast", function (rgba) {
    rgba.r /= 255;
    rgba.r -= 0.5;
    rgba.r *= adjust;
    rgba.r += 0.5;
    rgba.r *= 255;
    rgba.g /= 255;
    rgba.g -= 0.5;
    rgba.g *= adjust;
    rgba.g += 0.5;
    rgba.g *= 255;
    rgba.b /= 255;
    rgba.b -= 0.5;
    rgba.b *= adjust;
    rgba.b += 0.5;
    rgba.b *= 255;
    return rgba;
  });
});

Caman.Filter.register("hue", function (adjust) {
  return this.process("hue", function (rgba) {
    var b, g, h, hsv, r, _ref;
    hsv = Caman.Convert.rgbToHSV(rgba.r, rgba.g, rgba.b);
    h = hsv.h * 100;
    h += Math.abs(adjust);
    h = h % 100;
    h /= 100;
    hsv.h = h;
    _ref = Caman.Convert.hsvToRGB(hsv.h, hsv.s, hsv.v), r = _ref.r, g = _ref.g, b = _ref.b;
    rgba.r = r;
    rgba.g = g;
    rgba.b = b;
    return rgba;
  });
});

Caman.Filter.register("colorize", function () {
  var level, rgb;
  if (arguments.length === 2) {
    rgb = Caman.Convert.hexToRGB(arguments[0]);
    level = arguments[1];
  } else if (arguments.length === 4) {
    rgb = {
      r: arguments[0],
      g: arguments[1],
      b: arguments[2]
    };
    level = arguments[3];
  }
  return this.process("colorize", function (rgba) {
    rgba.r -= (rgba.r - rgb.r) * (level / 100);
    rgba.g -= (rgba.g - rgb.g) * (level / 100);
    rgba.b -= (rgba.b - rgb.b) * (level / 100);
    return rgba;
  });
});

Caman.Filter.register("invert", function () {
  return this.process("invert", function (rgba) {
    rgba.r = 255 - rgba.r;
    rgba.g = 255 - rgba.g;
    rgba.b = 255 - rgba.b;
    return rgba;
  });
});

Caman.Filter.register("sepia", function (adjust) {
  if (adjust == null) {
    adjust = 100;
  }
  adjust /= 100;
  return this.process("sepia", function (rgba) {
    rgba.r = Math.min(255, (rgba.r * (1 - (0.607 * adjust))) + (rgba.g * (0.769 * adjust)) + (rgba.b * (0.189 * adjust)));
    rgba.g = Math.min(255, (rgba.r * (0.349 * adjust)) + (rgba.g * (1 - (0.314 * adjust))) + (rgba.b * (0.168 * adjust)));
    rgba.b = Math.min(255, (rgba.r * (0.272 * adjust)) + (rgba.g * (0.534 * adjust)) + (rgba.b * (1 - (0.869 * adjust))));
    return rgba;
  });
});

Caman.Filter.register("gamma", function (adjust) {
  return this.process("gamma", function (rgba) {
    rgba.r = Math.pow(rgba.r / 255, adjust) * 255;
    rgba.g = Math.pow(rgba.g / 255, adjust) * 255;
    rgba.b = Math.pow(rgba.b / 255, adjust) * 255;
    return rgba;
  });
});

Caman.Filter.register("noise", function (adjust) {
  adjust = Math.abs(adjust) * 2.55;
  return this.process("noise", function (rgba) {
    var rand;
    rand = Caman.Calculate.randomRange(adjust * -1, adjust);
    rgba.r += rand;
    rgba.g += rand;
    rgba.b += rand;
    return rgba;
  });
});

Caman.Filter.register("clip", function (adjust) {
  adjust = Math.abs(adjust) * 2.55;
  return this.process("clip", function (rgba) {
    if (rgba.r > 255 - adjust) {
      rgba.r = 255;
    } else if (rgba.r < adjust) {
      rgba.r = 0;
    }
    if (rgba.g > 255 - adjust) {
      rgba.g = 255;
    } else if (rgba.g < adjust) {
      rgba.g = 0;
    }
    if (rgba.b > 255 - adjust) {
      rgba.b = 255;
    } else if (rgba.b < adjust) {
      rgba.b = 0;
    }
    return rgba;
  });
});

Caman.Filter.register("channels", function (options) {
  var chan, value;
  if (typeof options !== "object") {
    return this;
  }
  for (chan in options) {
    if (!{}.hasOwnProperty.call(options, chan)) continue;
    value = options[chan];
    if (value === 0) {
      delete options[chan];
      continue;
    }
    options[chan] /= 100;
  }
  if (options.length === 0) {
    return this;
  }
  return this.process("channels", function (rgba) {
    if (options.red != null) {
      if (options.red > 0) {
        rgba.r += (255 - rgba.r) * options.red;
      } else {
        rgba.r -= rgba.r * Math.abs(options.red);
      }
    }
    if (options.green != null) {
      if (options.green > 0) {
        rgba.g += (255 - rgba.g) * options.green;
      } else {
        rgba.g -= rgba.g * Math.abs(options.green);
      }
    }
    if (options.blue != null) {
      if (options.blue > 0) {
        rgba.b += (255 - rgba.b) * options.blue;
      } else {
        rgba.b -= rgba.b * Math.abs(options.blue);
      }
    }
    return rgba;
  });
});

Caman.Filter.register("curves", function () {
  var algo, bezier, chans, cps, end, i, last, start, _i, _j, _ref, _ref1;
  chans = arguments[0], cps = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
  last = cps[cps.length - 1];
  if (typeof last === "function") {
    algo = last;
    cps.pop();
  } else if (typeof last === "string") {
    algo = Caman.Calculate[last];
    cps.pop();
  } else {
    algo = Caman.Calculate.bezier;
  }
  if (typeof chans === "string") {
    chans = chans.split("");
  }
  if (chans[0] === "v") {
    chans = ['r', 'g', 'b'];
  }
  if (cps.length < 2) {
    throw "Invalid number of arguments to curves filter";
  }
  bezier = algo(cps, 0, 255);
  start = cps[0];
  if (start[0] > 0) {
    for (i = _i = 0, _ref = start[0]; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      bezier[i] = start[1];
    }
  }
  end = cps[cps.length - 1];
  if (end[0] < 255) {
    for (i = _j = _ref1 = end[0]; _ref1 <= 255 ? _j <= 255 : _j >= 255; i = _ref1 <= 255 ? ++_j : --_j) {
      bezier[i] = end[1];
    }
  }
  return this.process("curves", function (rgba) {
    var _k, _ref2;
    for (i = _k = 0, _ref2 = chans.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
      rgba[chans[i]] = bezier[rgba[chans[i]]];
    }
    return rgba;
  });
});

Caman.Filter.register("exposure", function (adjust) {
  var ctrl1, ctrl2, p;
  p = Math.abs(adjust) / 100;
  ctrl1 = [0, 255 * p];
  ctrl2 = [255 - (255 * p), 255];
  if (adjust < 0) {
    ctrl1 = ctrl1.reverse();
    ctrl2 = ctrl2.reverse();
  }
  return this.curves('rgb', [0, 0], ctrl1, ctrl2, [255, 255]);
});
