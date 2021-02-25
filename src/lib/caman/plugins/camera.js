import { Util } from '../core/util';

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const vignetteFilters = {
  brightness(rgba, amt, opts) {
    rgba.r = rgba.r - (rgba.r * amt * opts.strength);
    rgba.g = rgba.g - (rgba.g * amt * opts.strength);
    rgba.b = rgba.b - (rgba.b * amt * opts.strength);
    return rgba;
  },

  gamma(rgba, amt, opts) {
    rgba.r = Math.pow(rgba.r / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
    rgba.g = Math.pow(rgba.g / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
    rgba.b = Math.pow(rgba.b / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
    return rgba;
  },

  colorize(rgba, amt, opts) {
    rgba.r -= (rgba.r - opts.color.r) * amt;
    rgba.g -= (rgba.g - opts.color.g) * amt;
    rgba.b -= (rgba.b - opts.color.b) * amt;
    return rgba;
  }
};

Caman.Filter.register("vignette", function(size, strength) {
  if (strength == null) { strength = 60; }
  if ((typeof size === "string") && (size.substr(-1) === "%")) {
    if (this.dimensions.height > this.dimensions.width) {
      size = this.dimensions.width * (parseInt(size.substr(0, size.length - 1), 10) / 100);
    } else {
      size = this.dimensions.height * (parseInt(size.substr(0, size.length - 1), 10) / 100);
    }
  }

  strength /= 100;
  const center = [this.dimensions.width / 2, this.dimensions.height / 2];
  const start = Math.sqrt(Math.pow(center[0], 2) + Math.pow(center[1], 2));
  const end = start - size;
  const bezier = Caman.Calculate.bezier([0, 1], [30, 30], [70, 60], [100, 80]);

  return this.process("vignette", function(rgba) {
    const loc = rgba.locationXY();
    const dist = Caman.Calculate.distance(loc.x, loc.y, center[0], center[1]);

    if (dist > end) {
      const div = Math.max(1, ((bezier[Math.round(((dist - end) / size) * 100)]/10) * strength));

      rgba.r = Math.pow(rgba.r / 255, div) * 255;
      rgba.g = Math.pow(rgba.g / 255, div) * 255;
      rgba.b = Math.pow(rgba.b / 255, div) * 255;
    }

    return rgba;
  });
});

Caman.Filter.register("rectangularVignette", function(opts) {
  let size;
  const defaults = {
    strength: 50,
    cornerRadius: 0,
    method: 'brightness',
    color: {
      r: 0,
      g: 0,
      b: 0
    }
  };

  opts = Util.extend(defaults, opts);

  if (!opts.size) {
    return this;
  } else if (typeof opts.size === "string") {
    const percent = parseInt(opts.size, 10) / 100;
    opts.size = {
      width: this.dimensions.width * percent,
      height: this.dimensions.height * percent
    };
  } else if (typeof opts.size === "object") {
    for (let dim of ["width", "height"]) {
      if (typeof opts.size[dim] === "string") {
        opts.size[dim] = this.dimensions[dim] * (parseInt(opts.size[dim], 10) / 100);
      }
    }
  } else if (opts.size === "number") {
    ({ size } = opts);
    opts.size = {
      width: size,
      height: size
    };
  }

  if (typeof opts.cornerRadius === "string") {
    opts.cornerRadius = (opts.size.width / 2) * (parseInt(opts.cornerRadius, 10) / 100);
  }

  opts.strength /= 100;

  // Since pixels are discreet, force size to be an int
  opts.size.width = Math.floor(opts.size.width);
  opts.size.height = Math.floor(opts.size.height);
  opts.image = {
    width: this.dimensions.width,
    height: this.dimensions.height
  };

  if ((opts.method === "colorize") && (typeof opts.color === "string")) {
    opts.color = Caman.Convert.hexToRGB(opts.color);
  }

  opts.coords = {
    left: (this.dimensions.width - opts.size.width) / 2,
    right: this.dimensions.width - opts.coords.left,
    bottom: (this.dimensions.height - opts.size.height) / 2,
    top: this.dimensions.height - opts.coords.bottom
  };

  opts.corners = [
    {x: opts.coords.left + opts.cornerRadius, y: opts.coords.top - opts.cornerRadius},
    {x: opts.coords.right - opts.cornerRadius, y: opts.coords.top - opts.cornerRadius},
    {x: opts.coords.right - opts.cornerRadius, y: opts.coords.bottom + opts.cornerRadius},
    {x: opts.coords.left + opts.cornerRadius, y: opts.coords.bottom + opts.cornerRadius}
  ];

  opts.maxDist = Caman.Calculate.distance(0, 0, opts.corners[3].x, opts.corners[3].y) - opts.cornerRadius;

  return this.process("rectangularVignette", function(rgba) {
    let amt, radialDist;
    const loc = rgba.locationXY();

    // Trivial rejects
    if (((loc.x > opts.corners[0].x) && (loc.x < opts.corners[1].x)) && ((loc.y > opts.coords.bottom) && (loc.y < opts.coords.top))) {
      return rgba;
    }
    if (((loc.x > opts.coords.left) && (loc.x < opts.coords.right)) && ((loc.y > opts.corners[3].y) && (loc.y < opts.corners[2].y))) {
      return rgba;
    }

    // Need to figure out which section we're in. First, the easy ones, then the harder ones.
    if ((loc.x > opts.corners[0].x) && (loc.x < opts.corners[1].x) && (loc.y > opts.coords.top)) {
      // top-middle section
      amt = (loc.y - opts.coords.top) / opts.maxDist;
    } else if ((loc.y > opts.corners[2].y) && (loc.y < opts.corners[1].y) && (loc.x > opts.coords.right)) {
      // right-middle section
      amt = (loc.x - opts.coords.right) / opts.maxDist;
    } else if ((loc.x > opts.corners[0].x) && (loc.x < opts.corners[1].x) && (loc.y < opts.coords.bottom)) {
      // bottom-middle section
      amt = (opts.coords.bottom - loc.y) / opts.maxDist;
    } else if ((loc.y > opts.corners[2].y) && (loc.y < opts.corners[1].y) && (loc.x < opts.coords.left)) {
      // left-middle section
      amt = (opts.coords.left - loc.x) / opts.maxDist;
    } else if ((loc.x <= opts.corners[0].x) && (loc.y >= opts.corners[0].y)) {
      // top-left corner
      radialDist = Caman.distance(loc.x, loc.y, opts.corners[0].x, opts.corners[0].y);
      amt = (radialDist - opts.cornerRadius) / opts.maxDist;
    } else if ((loc.x >= opts.corners[1].x) && (loc.y >= opts.corners[1].y)) {
      // top-right corner
      radialDist = Caman.distance(loc.x, loc.y, opts.corners[1].x, opts.corners[1].y);
      amt = (radialDist - opts.cornerRadius) / opts.maxDist;
    } else if ((loc.x >= opts.corners[2].x) && (loc.y <= opts.corners[2].y)) {
      // bottom-right corner
      radialDist = Caman.distance(loc.x, loc.y, opts.corners[2].x, opts.corners[2].y);
      amt = (radialDist - opts.cornerRadius) / opts.maxDist;
    } else if ((loc.x <= opts.corners[3].x) && (loc.y <= opts.corners[3].y)) {
      // bottom-left corner
      radialDist = Caman.distance(loc.x, loc.y, opts.corners[3].x, opts.corners[3].y);
      amt = (radialDist - opts.cornerRadius) / opts.maxDist;
    }

    if (amt < 0) { return rgba; }
    return vignetteFilters[opts.method](rgba, amt, opts);
  });
});
      