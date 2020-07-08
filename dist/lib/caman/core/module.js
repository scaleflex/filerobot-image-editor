"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var moduleKeywords = ['extended', 'included'];

var Module = /*#__PURE__*/function () {
  function Module() {
    _classCallCheck(this, Module);
  }

  _createClass(Module, null, [{
    key: "extends",
    // Extend the base object itself like a static method
    value: function _extends(obj) {
      for (var key in obj) {
        var value = obj[key];

        if (!Array.from(moduleKeywords).includes(key)) {
          this[key] = value;
        }
      }

      if (obj.extended != null) {
        obj.extended.apply(this);
      }

      return this;
    } // Include methods on the object prototype

  }, {
    key: "includes",
    value: function includes(obj) {
      for (var key in obj) {
        // Assign properties to the prototype
        var value = obj[key];

        if (!Array.from(moduleKeywords).includes(key)) {
          this.prototype[key] = value;
        }
      }

      if (obj.included != null) {
        obj.included.apply(this);
      }

      return this;
    } // Add methods on this prototype that point to another method
    // on another object's prototype.

  }, {
    key: "delegate",
    value: function delegate() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var target = args.pop();
      return Array.from(args).map(function (source) {
        return _this.prototype[source] = target.prototype[source];
      });
    } // Create an alias for a function

  }, {
    key: "aliasFunction",
    value: function aliasFunction(to, from) {
      var _this2 = this;

      return this.prototype[to] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _this2.prototype[from].apply(_this2, args);
      };
    } // Create an alias for a property

  }, {
    key: "aliasProperty",
    value: function aliasProperty(to, from) {
      return Object.defineProperty(this.prototype, to, {
        get: function get() {
          return this[from];
        },
        set: function set(val) {
          return this[from] = val;
        }
      });
    } // Execute a function in the context of the object, and pass
    // a reference to the object's prototype.

  }, {
    key: "included",
    value: function included(func) {
      return func.call(this, this.prototype);
    }
  }]);

  return Module;
}();

var _default = Module;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(moduleKeywords, "moduleKeywords", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/module.js");

  __REACT_HOT_LOADER__.register(Module, "Module", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/module.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/module.js");
}();

;