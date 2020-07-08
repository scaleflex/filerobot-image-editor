"use strict";

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
// Event system that can be used to register callbacks that get fired
// during certain times in the render process.
var Event = /*#__PURE__*/function () {
  function Event() {
    _classCallCheck(this, Event);
  }

  _createClass(Event, null, [{
    key: "initClass",
    value: function initClass() {
      this.events = {}; // All of the supported event types

      this.types = ["processStart", "processComplete", "renderStart", "renderFinished", "blockStarted", "blockFinished"];
    } // Trigger an event.
    // @param [Caman] target Instance of Caman emitting the event.
    // @param [String] type The event type.
    // @param [Object] data Extra data to send with the event.

  }, {
    key: "trigger",
    value: function trigger(target, type) {
      var _this = this;

      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (this.events[type] && this.events[type].length) {
        return function () {
          var result = [];

          for (var _i = 0, _Array$from = Array.from(_this.events[type]); _i < _Array$from.length; _i++) {
            var event = _Array$from[_i];

            if (event.target === null || target.id === event.target.id) {
              result.push(event.fn.call(target, data));
            } else {
              result.push(undefined);
            }
          }

          return result;
        }();
      }
    } // Listen for an event. Optionally bind the listen to a single instance
    // or all instances.
    //
    // @overload listen(target, type, fn)
    //   Listen for events emitted from a particular Caman instance.
    //   @param [Caman] target The instance to listen to.
    //   @param [String] type The type of event to listen for.
    //   @param [Function] fn The function to call when the event occurs.
    //
    // @overload listen(type, fn)
    //   Listen for an event from all Caman instances.
    //   @param [String] type The type of event to listen for.
    //   @param [Function] fn The function to call when the event occurs.

  }, {
    key: "listen",
    value: function listen(target, type, fn) {
      // Adjust arguments if target is omitted
      if (typeof target === "string") {
        var _type = target;
        var _fn = type;
        target = null;
        type = _type;
        fn = _fn;
      } // Validation


      if (!Array.from(this.types).includes(type)) {
        return false;
      }

      if (!this.events[type]) {
        this.events[type] = [];
      }

      this.events[type].push({
        target: target,
        fn: fn
      });
      return true;
    }
  }]);

  return Event;
}();

Event.initClass();
Caman.Event = Event;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Event, "Event", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/event.js");
}();

;