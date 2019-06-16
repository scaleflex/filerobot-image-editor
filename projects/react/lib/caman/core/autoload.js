import { Log } from './logger';
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Inform CamanJS that the DOM has been updated, and that it
// should re-scan for CamanJS instances in the document.
Caman.DOMUpdated = function () {
  let parser;
  const imgs = document.querySelectorAll("img[data-caman]");
  if (!(imgs.length > 0)) { return; }

  return Array.from(imgs).map((img) =>
    (parser = new CamanParser(img, function () {
      this.parse();
      return this.execute();
    })));
};

// If enabled, we check the page to see if there are any
// images with Caman instructions provided using HTML5
// data attributes.
if (Caman.autoload) {
  (function () {
    if (document.readyState === "complete") {
      return Caman.DOMUpdated();
    } else {
      return document.addEventListener("DOMContentLoaded", Caman.DOMUpdated, false);
    }
  })();
}

// Parses Caman instructions embedded in the HTML data-caman attribute.
var CamanParser = (function () {
  let INST_REGEX = undefined;

  class CamanParser {
    static initClass() {
      // Regex used for parsing options out of the data-caman attribute.
      INST_REGEX = "(\\w+)\\((.*?)\\)";
    }


    // Creates a new parser instance.
    //
    // @param [DOMObject] ele DOM object to be instantiated with CamanJS
    // @param [Function] ready Callback function to pass to CamanJS
    constructor(ele, ready) {
      this.dataStr = ele.getAttribute('data-caman');
      this.caman = Caman(ele, ready.bind(this));
    }

    // Parse the DOM object and call the parsed filter functions on the Caman object.
    parse() {
      this.ele = this.caman.canvas;

      // First we find each instruction as a whole using a global
      // regex search.
      let r = new RegExp(INST_REGEX, 'g');
      const unparsedInstructions = this.dataStr.match(r);
      if (!(unparsedInstructions.length > 0)) { return; }

      // Once we gather all the instructions, we go through each one
      // and parse out the filter name + it's parameters.
      r = new RegExp(INST_REGEX);
      return (() => {
        const result = [];
        for (let inst of Array.from(unparsedInstructions)) {
          const [m, filter, args] = Array.from(inst.match(r));

          // Create a factory function so we can catch any errors that
          // are produced when running the filters. This also makes it very
          // simple to support multiple/complex filter arguments.
          const instFunc = new Function(`return function() { \
this.${filter}(${args}); \
};`);

          try {
            const func = instFunc();
            result.push(func.call(this.caman));
          } catch (e) {
            result.push(Log.debug(e));
          }
        }
        return result;
      })();
    }

    // Execute {Caman#render} on this Caman instance.
    execute() {
      const { ele } = this;
      return this.caman.render(function () {
        return ele.parentNode.replaceChild(this.toImage(), ele);
      });
    }
  }

  CamanParser.initClass();

  return CamanParser;
})();