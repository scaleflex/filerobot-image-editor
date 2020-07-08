"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = void 0;

function Logger() {
  var name, _i, _len, _ref;

  _ref = ['log', 'info', 'warn', 'error'];

  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    name = _ref[_i];

    this[name] = function (name) {
      return function () {
        var args, e;
        args = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];

        if (!Caman.DEBUG) {
          return;
        }

        try {
          return console[name].apply(console, args);
        } catch (_error) {
          e = _error;
          return console[name](args);
        }
      };
    }(name);
  }

  this.debug = this.log;
}

var Log = new Logger();
exports.Log = Log;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Logger, "Logger", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/logger.js");

  __REACT_HOT_LOADER__.register(Log, "Log", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/logger.js");
}();

;