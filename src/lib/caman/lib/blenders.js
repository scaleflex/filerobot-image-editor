import Blender from '../core/blander';


Blender.register("normal", function (rgbaLayer, rgbaParent) {
  return {
    r: rgbaLayer.r,
    g: rgbaLayer.g,
    b: rgbaLayer.b
  };
});

Blender.register("multiply", function (rgbaLayer, rgbaParent) {
  return {
    r: (rgbaLayer.r * rgbaParent.r) / 255,
    g: (rgbaLayer.g * rgbaParent.g) / 255,
    b: (rgbaLayer.b * rgbaParent.b) / 255
  };
});

Blender.register("screen", function (rgbaLayer, rgbaParent) {
  return {
    r: 255 - (((255 - rgbaLayer.r) * (255 - rgbaParent.r)) / 255),
    g: 255 - (((255 - rgbaLayer.g) * (255 - rgbaParent.g)) / 255),
    b: 255 - (((255 - rgbaLayer.b) * (255 - rgbaParent.b)) / 255)
  };
});

Blender.register("overlay", function (rgbaLayer, rgbaParent) {
  var result;
  result = {};
  result.r = rgbaParent.r > 128 ? 255 - 2 * (255 - rgbaLayer.r) * (255 - rgbaParent.r) / 255 : (rgbaParent.r * rgbaLayer.r * 2) / 255;
  result.g = rgbaParent.g > 128 ? 255 - 2 * (255 - rgbaLayer.g) * (255 - rgbaParent.g) / 255 : (rgbaParent.g * rgbaLayer.g * 2) / 255;
  result.b = rgbaParent.b > 128 ? 255 - 2 * (255 - rgbaLayer.b) * (255 - rgbaParent.b) / 255 : (rgbaParent.b * rgbaLayer.b * 2) / 255;
  return result;
});

Blender.register("difference", function (rgbaLayer, rgbaParent) {
  return {
    r: rgbaLayer.r - rgbaParent.r,
    g: rgbaLayer.g - rgbaParent.g,
    b: rgbaLayer.b - rgbaParent.b
  };
});

Blender.register("addition", function (rgbaLayer, rgbaParent) {
  return {
    r: rgbaParent.r + rgbaLayer.r,
    g: rgbaParent.g + rgbaLayer.g,
    b: rgbaParent.b + rgbaLayer.b
  };
});

Blender.register("exclusion", function (rgbaLayer, rgbaParent) {
  return {
    r: 128 - 2 * (rgbaParent.r - 128) * (rgbaLayer.r - 128) / 255,
    g: 128 - 2 * (rgbaParent.g - 128) * (rgbaLayer.g - 128) / 255,
    b: 128 - 2 * (rgbaParent.b - 128) * (rgbaLayer.b - 128) / 255
  };
});

Blender.register("softLight", function (rgbaLayer, rgbaParent) {
  var result;
  result = {};
  result.r = rgbaParent.r > 128 ? 255 - ((255 - rgbaParent.r) * (255 - (rgbaLayer.r - 128))) / 255 : (rgbaParent.r * (rgbaLayer.r + 128)) / 255;
  result.g = rgbaParent.g > 128 ? 255 - ((255 - rgbaParent.g) * (255 - (rgbaLayer.g - 128))) / 255 : (rgbaParent.g * (rgbaLayer.g + 128)) / 255;
  result.b = rgbaParent.b > 128 ? 255 - ((255 - rgbaParent.b) * (255 - (rgbaLayer.b - 128))) / 255 : (rgbaParent.b * (rgbaLayer.b + 128)) / 255;
  return result;
});

Blender.register("lighten", function (rgbaLayer, rgbaParent) {
  return {
    r: rgbaParent.r > rgbaLayer.r ? rgbaParent.r : rgbaLayer.r,
    g: rgbaParent.g > rgbaLayer.g ? rgbaParent.g : rgbaLayer.g,
    b: rgbaParent.b > rgbaLayer.b ? rgbaParent.b : rgbaLayer.b
  };
});

Blender.register("darken", function (rgbaLayer, rgbaParent) {
  return {
    r: rgbaParent.r > rgbaLayer.r ? rgbaLayer.r : rgbaParent.r,
    g: rgbaParent.g > rgbaLayer.g ? rgbaLayer.g : rgbaParent.g,
    b: rgbaParent.b > rgbaLayer.b ? rgbaLayer.b : rgbaParent.b
  };
});