// DOM simplifier (no jQuery dependency)
// NodeJS compatible
const $ = function(sel, root) {
  if (root == null) { root = document; }
  if (typeof sel === "object") { return sel; }
  return root.querySelector(sel);
};

const __extends = function (child, parent) {
  for (var key in parent) { if ({}.hasOwnProperty.call(parent, key)) child[key] = parent[key]; }

  function ctor() { this.constructor = child; }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
};

class Util {
  static initClass() {
    // Unique value utility
    this.uniqid = (function() {
      let id = 0;
      return {get() { return id++; }};
    })();
  }

  // Helper function that extends one object with all the properies of other objects
  static extend(obj, ...src) {
    const dest = obj;

    for (let copy of Array.from(src)) {
      for (let prop of Object.keys(copy || {})) {
        dest[prop] = copy[prop];
      }
    }

    return dest;
  }

  // In order to stay true to the latest spec, RGB values must be clamped between
  // 0 and 255. If we don't do this, weird things happen.
  static clampRGB(val) {
    if (val < 0) { return 0; }
    if (val > 255) { return 255; }
    return val;
  }

  static copyAttributes(from, to, opts) {
    if (opts == null) { opts = {}; }
    return (() => {
      const result = [];
      for (let attr of Array.from(from.attributes)) {
        if ((opts.except != null) && Array.from(opts.except).includes(attr.nodeName)) { continue; }
        result.push(to.setAttribute(attr.nodeName, attr.nodeValue));
      }
      return result;
    })();
  }

  // Support for browsers that don't know Uint8Array (such as IE9)
  static dataArray(length) {
    if (length == null) { length = 0; }
    if (Caman.NodeJS || (window.Uint8Array != null)) { return new Uint8Array(length); }
    return new Array(length);
  }
}

Util.initClass();

export { Util, $, __extends };