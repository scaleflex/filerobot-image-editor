"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Responsible for registering and storing all of the filters.
var Filter = /*#__PURE__*/function () {
  function Filter() {
    _classCallCheck(this, Filter);
  }

  _createClass(Filter, null, [{
    key: "initClass",
    value: function initClass() {
      // All of the different render operatives
      this.Type = {
        Single: 1,
        Kernel: 2,
        LayerDequeue: 3,
        LayerFinished: 4,
        LoadOverlay: 5,
        LoadLayerMask: 7,
        Plugin: 6
      };
    } // Registers a filter function.
    // @param [String] name The name of the filter.
    // @param [Function] filterFunc The filter function.

  }, {
    key: "register",
    value: function register(name, filterFunc) {
      return window.Caman.prototype[name] = filterFunc;
    }
  }]);

  return Filter;
}();

Filter.initClass();
Caman.Filter = Filter;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Filter, "Filter", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/filter.js");
}();

;