"use strict";

var _logger = require("./logger");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  var parser;
  var imgs = document.querySelectorAll("img[data-caman]");

  if (!(imgs.length > 0)) {
    return;
  }

  return Array.from(imgs).map(function (img) {
    return parser = new CamanParser(img, function () {
      this.parse();
      return this.execute();
    });
  });
}; // If enabled, we check the page to see if there are any
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
} // Parses Caman instructions embedded in the HTML data-caman attribute.


var CamanParser = function () {
  var INST_REGEX = undefined;

  var CamanParser = /*#__PURE__*/function () {
    _createClass(CamanParser, null, [{
      key: "initClass",
      value: function initClass() {
        // Regex used for parsing options out of the data-caman attribute.
        INST_REGEX = "(\\w+)\\((.*?)\\)";
      } // Creates a new parser instance.
      //
      // @param [DOMObject] ele DOM object to be instantiated with CamanJS
      // @param [Function] ready Callback function to pass to CamanJS

    }]);

    function CamanParser(ele, ready) {
      _classCallCheck(this, CamanParser);

      this.dataStr = ele.getAttribute('data-caman');
      this.caman = Caman(ele, ready.bind(this));
    } // Parse the DOM object and call the parsed filter functions on the Caman object.


    _createClass(CamanParser, [{
      key: "parse",
      value: function parse() {
        var _this = this;

        this.ele = this.caman.canvas; // First we find each instruction as a whole using a global
        // regex search.

        var r = new RegExp(INST_REGEX, 'g');
        var unparsedInstructions = this.dataStr.match(r);

        if (!(unparsedInstructions.length > 0)) {
          return;
        } // Once we gather all the instructions, we go through each one
        // and parse out the filter name + it's parameters.


        r = new RegExp(INST_REGEX);
        return function () {
          var result = [];

          for (var _i = 0, _Array$from = Array.from(unparsedInstructions); _i < _Array$from.length; _i++) {
            var inst = _Array$from[_i];

            var _Array$from2 = Array.from(inst.match(r)),
                _Array$from3 = _slicedToArray(_Array$from2, 3),
                m = _Array$from3[0],
                filter = _Array$from3[1],
                args = _Array$from3[2]; // Create a factory function so we can catch any errors that
            // are produced when running the filters. This also makes it very
            // simple to support multiple/complex filter arguments.


            var instFunc = new Function("return function() { this.".concat(filter, "(").concat(args, "); };"));

            try {
              var func = instFunc();
              result.push(func.call(_this.caman));
            } catch (e) {
              result.push(_logger.Log.debug(e));
            }
          }

          return result;
        }();
      } // Execute {Caman#render} on this Caman instance.

    }, {
      key: "execute",
      value: function execute() {
        var ele = this.ele;
        return this.caman.render(function () {
          return ele.parentNode.replaceChild(this.toImage(), ele);
        });
      }
    }]);

    return CamanParser;
  }();

  CamanParser.initClass();
  return CamanParser;
}();

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CamanParser, "CamanParser", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/autoload.js");
}();

;