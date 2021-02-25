class Store {
  static initClass() {
    this.items = {};
  }

  static has(search) { return (this.items[search] != null); }
  static get(search) { return this.items[search]; }
  static put(name, obj) { return this.items[name] = obj; }
  static execute(search, callback) {
    setTimeout(() => {
        return callback.call(this.get(search), this.get(search));
      }
      , 0);

    return this.get(search);
  }

  static flush(name) {
    if (name == null) { name = false; }
    if (name) { return delete this.items[name]; } else { return this.items = {}; }
  }
}


Store.initClass();

export default Store;