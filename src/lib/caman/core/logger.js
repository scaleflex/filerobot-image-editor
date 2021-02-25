function Logger() {
  let name, _i, _len, _ref;
  _ref = ['log', 'info', 'warn', 'error'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    name = _ref[_i];
    this[name] = (function (name) {
      return function () {
        let args, e;
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
    })(name);
  }
  this.debug = this.log;
}

const Log = new Logger();

export { Log };