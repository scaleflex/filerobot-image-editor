const useDrag = (onMove, onStart, onEnd) => {
  const onDragging = (e) => {
    if (typeof onMove === 'function') {
      onMove(e.touches?.[0] || e);
    }
  };

  const disableSliding = (e) => {
    document.removeEventListener('mousemove', onDragging);
    document.removeEventListener('mouseup', disableSliding);
    document.removeEventListener('mouseleave', disableSliding);
    document.removeEventListener('touchmove', onDragging);
    document.removeEventListener('touchend', disableSliding);
    document.removeEventListener('touchcancel', disableSliding);

    if (typeof onEnd === 'function') {
      onEnd(e.touches?.[0] || e);
    }
  };

  const enableDrag = (e) => {
    document.addEventListener('mousemove', onDragging);
    document.addEventListener('mouseup', disableSliding);
    document.addEventListener('mouseleave', disableSliding);
    document.addEventListener('touchmove', onDragging);
    document.addEventListener('touchend', disableSliding);
    document.addEventListener('touchcancel', disableSliding);

    if (typeof onStart === 'function') {
      onStart(e.touches?.[0] || e);
    }
  };

  return {
    onMouseDown: enableDrag,
    onTouchStart: enableDrag,
  };
};

export default useDrag;
