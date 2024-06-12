const emitCustomEvent = (eventType, eventPayload = {}) => {
  setTimeout(() => {
    const event = new CustomEvent(eventType, eventPayload);
    window.dispatchEvent(event);
  }, 0);
};

export default emitCustomEvent;
