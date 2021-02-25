/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

const moduleKeywords = ['extended', 'included'];

class Module {
  // Extend the base object itself like a static method
  static extends(obj) {
    for (let key in obj) {
      const value = obj[key];
      if (!Array.from(moduleKeywords).includes(key)) {
        this[key] = value;
      }
    }

    if (obj.extended != null) {
      obj.extended.apply(this);
    }
    return this;
  }

  // Include methods on the object prototype
  static includes(obj) {
    for (let key in obj) {
      // Assign properties to the prototype
      const value = obj[key];
      if (!Array.from(moduleKeywords).includes(key)) {
        this.prototype[key] = value;
      }
    }

    if (obj.included != null) {
      obj.included.apply(this);
    }
    return this;
  }

  // Add methods on this prototype that point to another method
  // on another object's prototype.
  static delegate(...args) {
    const target = args.pop();
    return Array.from(args).map((source) => (this.prototype[source] = target.prototype[source]));
  }

  // Create an alias for a function
  static aliasFunction(to, from) {
    return this.prototype[to] = (...args) => this.prototype[from].apply(this, args);
  }

  // Create an alias for a property
  static aliasProperty(to, from) {
    return Object.defineProperty(this.prototype, to, {
        get() { return this[from]; },
        set(val) { return this[from] = val; }
      }
    );
  }

  // Execute a function in the context of the object, and pass
  // a reference to the object's prototype.
  static included(func) { return func.call(this, this.prototype); }
}


export default Module;