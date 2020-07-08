"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Store = /*#__PURE__*/function () {
  function Store() {
    _classCallCheck(this, Store);
  }

  _createClass(Store, null, [{
    key: "initClass",
    value: function initClass() {
      this.items = {};
    }
  }, {
    key: "has",
    value: function has(search) {
      return this.items[search] != null;
    }
  }, {
    key: "get",
    value: function get(search) {
      return this.items[search];
    }
  }, {
    key: "put",
    value: function put(name, obj) {
      return this.items[name] = obj;
    }
  }, {
    key: "execute",
    value: function execute(search, callback) {
      var _this = this;

      setTimeout(function () {
        return callback.call(_this.get(search), _this.get(search));
      }, 0);
      return this.get(search);
    }
  }, {
    key: "flush",
    value: function flush(name) {
      if (name == null) {
        name = false;
      }

      if (name) {
        return delete this.items[name];
      } else {
        return this.items = {};
      }
    }
  }]);

  return Store;
}();

Store.initClass();
var _default = Store;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Store, "Store", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/store.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/store.js");
}();

;