/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Responsible for registering and storing all of the filters.
class Filter {
  static initClass() {
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
  }

  // Registers a filter function.
  // @param [String] name The name of the filter.
  // @param [Function] filterFunc The filter function.
  static register(name, filterFunc) { return window.Caman.prototype[name] = filterFunc; }
}

Filter.initClass();

Caman.Filter = Filter;
