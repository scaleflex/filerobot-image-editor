class Plugin {
  static initClass() {
    this.plugins = {};
  }

  static register(name, plugin) { return this.plugins[name] = plugin; }
  static execute(context, name, args) { return this.plugins[name].apply(context, args); }
}

Plugin.initClass();

Caman.Plugin = Plugin;