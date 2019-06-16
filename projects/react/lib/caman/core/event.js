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
class Event {
  static initClass() {
    this.events = {};

    // All of the supported event types
    this.types = [
      "processStart",
      "processComplete",
      "renderStart",
      "renderFinished",
      "blockStarted",
      "blockFinished"
    ];
  }

  // Trigger an event.
  // @param [Caman] target Instance of Caman emitting the event.
  // @param [String] type The event type.
  // @param [Object] data Extra data to send with the event.
  static trigger(target, type, data = null) {
    if (this.events[type] && this.events[type].length) {
      return (() => {
        const result = [];
        for (let event of Array.from(this.events[type])) {
          if ((event.target === null) || (target.id === event.target.id)) {
            result.push(event.fn.call(target, data));
          } else {
            result.push(undefined);
          }
        }
        return result;
      })();
    }
  }

  // Listen for an event. Optionally bind the listen to a single instance
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
  static listen(target, type, fn) {
    // Adjust arguments if target is omitted
    if (typeof target === "string") {
      const _type = target;
      const _fn = type;

      target = null;
      type = _type;
      fn = _fn;
    }

    // Validation
    if (!Array.from(this.types).includes(type)) { return false; }

    if (!this.events[type]) { this.events[type] = []; }
    this.events[type].push({target, fn});

    return true;
  }
}

Event.initClass();

Caman.Event = Event;