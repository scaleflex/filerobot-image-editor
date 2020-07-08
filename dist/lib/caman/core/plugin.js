"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Plugin = /*#__PURE__*/function () {
  function Plugin() {
    _classCallCheck(this, Plugin);
  }

  _createClass(Plugin, null, [{
    key: "initClass",
    value: function initClass() {
      this.plugins = {};
    }
  }, {
    key: "register",
    value: function register(name, plugin) {
      return this.plugins[name] = plugin;
    }
  }, {
    key: "execute",
    value: function execute(context, name, args) {
      return this.plugins[name].apply(context, args);
    }
  }]);

  return Plugin;
}();

Plugin.initClass();
Caman.Plugin = Plugin;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Plugin, "Plugin", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/plugin.js");
}();

;