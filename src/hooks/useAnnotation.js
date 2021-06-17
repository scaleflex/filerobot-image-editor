import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import Context from '../context';
import randomId from '../utils/randomId';
import getTouchPosOrEvent from '../utils/getTouchPosOrEvent';
import { POINTER_MODES, POINTER_ICONS, TABS_IDS } from '../utils/constants';
import { AVAILABLE_ANNOTATIONS_NAMES } from '../components/Tabs/Annotate/Annotate.constants';

let timeout = null;

const getProperSelectionTarget = (e) => (
  e.target.name() === AVAILABLE_ANNOTATIONS_NAMES.FREEHAND_LINE
    ? e.target.parent
    : e.target
);

const getShapeDefaultEvents = ({ updateState, canvas }) => ({
  'mouseenter touchstart': (e) => {
    updateState(
      (updatedState) => {
        if (updatedState.pointerMode === POINTER_MODES.SELECT && updatedState.tab?.id === TABS_IDS.ANNOTATE) {
          canvas.content.style.cursor = POINTER_ICONS.MOVE;
          getProperSelectionTarget(e).draggable(true);
        }
      }
    )
  },
  'mouseout mouseleave touchleave touchcancel': (e) => {
    updateState(
      (updatedState) => {
        canvas.content.style.cursor = POINTER_ICONS[updatedState.pointerMode === POINTER_MODES.DRAW ? 'CROSSHAIR' : 'DEFAULT'];
        getProperSelectionTarget(e).draggable(false);
      }
    )
  },
  'click tap': (e) => {
    updateState((updatedState) => {
      const selection = getProperSelectionTarget(e);
      if (updatedState.tab?.id === TABS_IDS.ANNOTATE && updatedState.pointerMode === POINTER_MODES.SELECT && updatedState.selections[0] !== selection) {
        return { selections: [selection] };
      }
    });
  },
  'dragstart': (e) => {
    updateState((updatedState) => {
      const selection = getProperSelectionTarget(e);
      if (updatedState.tab?.id === TABS_IDS.ANNOTATE && updatedState.pointerMode === POINTER_MODES.SELECT && updatedState.selections[0] !== selection) {
        return { selections: [selection] };
      }
    });
  },
  'dragend': (e) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      updateState({ selections: [getProperSelectionTarget(e)] });
    }, 50);
  }
});

const useAnnotation = ({
  defaultFill = '#000000', libClassName, name, calcDimensionsProps, noDimensionsMapping = false, events,
  defaultDraw = false, noPointerEvents = false, absoluteDimensions = true, ...otherProps
}) => {
  const { canvas, pointerMode, selections, updateState } = useContext(Context);
  const [currentAnnotation, setCurrentAnnotation] = useState(
    () => ({
      draw: defaultDraw,
      id: name && randomId(name),
      libClassName,
      name,
      hitStrokeWidth: 6,
      x: 0,
      absoluteDimensions: absoluteDimensions,
      y: 0,
      shadowColor: '#000000',
      stroke: '#000000',
      strokeWidth: 0,
      fill: defaultFill,
      eventsToApply: {
        ...getShapeDefaultEvents({ updateState, canvas }),
        ...events,
      },
      ...otherProps
    })
  );
  const canvasDimensions = useRef({});
  const startPosition = useRef({});

  const positionDiffStartToEnd = useCallback((event, updatedCurrentAnnotation = {}) => {
    let positionDiffDimensions = {};
    positionDiffDimensions.x = Math.min(event.pageX, startPosition.current.x);
    positionDiffDimensions.y = Math.min(event.pageY, startPosition.current.y);
    positionDiffDimensions.width = Math.max(event.pageX, startPosition.current.x) - positionDiffDimensions.x;
    positionDiffDimensions.height = Math.max(event.pageY, startPosition.current.y) - positionDiffDimensions.y;

    if (calcDimensionsProps && typeof calcDimensionsProps === 'function') {
      positionDiffDimensions = {
        ...positionDiffDimensions,
        ...calcDimensionsProps({
          ...positionDiffDimensions,
          startX: startPosition.current.x - canvasDimensions.current.x,
          startY: startPosition.current.y - canvasDimensions.current.y,
          endX: event.pageX - canvasDimensions.current.x,
          endY: event.pageY - canvasDimensions.current.y,
          prevX: updatedCurrentAnnotation.points?.[2] ?? updatedCurrentAnnotation.x,
          prevY: updatedCurrentAnnotation.points?.[3] ??updatedCurrentAnnotation.y,
          prevPoints: updatedCurrentAnnotation.points,
        })
      };
    }
    return positionDiffDimensions;
  }, [calcDimensionsProps]);

  const handleDimensionsMapping = useCallback((e) => {
    const event = getTouchPosOrEvent(e);
    setCurrentAnnotation(
      (updatedcurrentAnnotation) => {
        const mappedDimensions = positionDiffStartToEnd(event);

        // pointer end position is before the pointer start and before the canvas left.
        if (event.pageX < startPosition.current.x && event.pageX < canvasDimensions.current.x) {
          mappedDimensions.width = startPosition.current.x - canvasDimensions.current.x;
        }
        // pointer end position is before the canvas left
        if (event.pageX < canvasDimensions.current.x) { mappedDimensions.x = canvasDimensions.current.x; }

        // pointer end position is before the pointer start and before the canvas top.
        if (event.pageY - startPosition.current.y && event.pageY < canvasDimensions.current.y) {
          mappedDimensions.height = startPosition.current.y - canvasDimensions.current.y;
        }
        // pointer end position is before the canvas top
        if (event.pageY < canvasDimensions.current.y) { mappedDimensions.y = canvasDimensions.current.y; }
        // pointer end position is after the canvas right
        if (event.pageX > canvasDimensions.current.width + canvasDimensions.current.x) {
          mappedDimensions.width = canvasDimensions.current.x + (
            canvasDimensions.current.width - updatedcurrentAnnotation.x
          );
        }
        // pointer end position is after the canvas bottom
        if (event.pageY > canvasDimensions.current.height + canvasDimensions.current.y) {
          mappedDimensions.height = canvasDimensions.current.y + (
            canvasDimensions.current.height - updatedcurrentAnnotation.y
          );
        }

        return {
          ...updatedcurrentAnnotation,
          ...mappedDimensions,
        };
      }
    );
  }, [positionDiffStartToEnd]);

  const handlePointerMove = useCallback((e) => {
    const event = getTouchPosOrEvent(e);

    if (startPosition.current.isMouseOut) {
      document.removeEventListener('mousemove', handleDimensionsMapping);
      document.removeEventListener('touchmove', handleDimensionsMapping);
      startPosition.current.isMouseOut = false;
    }

    setCurrentAnnotation(
      (updatedcurrentAnnotation) => ({
        ...updatedcurrentAnnotation,
        draw: defaultDraw,
        ...positionDiffStartToEnd(event, updatedcurrentAnnotation),
      })
    );
  }, [defaultDraw, handleDimensionsMapping, positionDiffStartToEnd]);

  const handlePointerOut = useCallback((e) => {
    if (!noDimensionsMapping && !startPosition.current.isMouseOut) {
      document.addEventListener('mousemove', handleDimensionsMapping);
      document.addEventListener('touchmove', handleDimensionsMapping);
      startPosition.current.isMouseOut = true;
    }
  }, [handleDimensionsMapping, noDimensionsMapping]);

  const handlePointerUp = useCallback(() => {   
    setCurrentAnnotation(
      (updatedcurrentAnnotation) => ({
        ...updatedcurrentAnnotation,
        draw: true,
      })
    );

    canvas.off('mousemove touchmove', handlePointerMove);
    canvas.off('mouseout touchcancel', handlePointerOut);
    document.removeEventListener('mouseup', handlePointerUp);
    document.removeEventListener('touchend', handlePointerUp);
    document.removeEventListener('mouseleave', handlePointerUp);
    document.removeEventListener('touchcancel', handlePointerUp);
    document.removeEventListener('mousemove', handleDimensionsMapping);
    document.removeEventListener('touchmove', handleDimensionsMapping);
    startPosition.current.isMouseOut = false;
  }, [canvas, handleDimensionsMapping, handlePointerMove, handlePointerOut]);

  const handlePointerDown = useCallback((e) => {
    canvas.content.style.cursor = POINTER_ICONS.CROSSHAIR;
    const event = getTouchPosOrEvent(e);
    startPosition.current = {
      x: event.pageX,
      y: event.pageY,
      isMouseOut: false,
    };

    canvas.on('mousemove touchmove', handlePointerMove);
    canvas.on('mouseout touchcancel', handlePointerOut);
    document.addEventListener('mouseup', handlePointerUp);
    document.addEventListener('touchend', handlePointerUp);
    document.addEventListener('mouseleave', handlePointerUp);
    document.addEventListener('touchcancel', handlePointerUp);
  }, [canvas, handlePointerMove, handlePointerOut, handlePointerUp]);

  // useEffect is declared at the end as the fucntion is specificed in the dependecies array.
  useEffect(() => {
    if (!currentAnnotation.libClassName || noPointerEvents) { return; }
    canvasDimensions.current = canvas.content.getBoundingClientRect();

    if (pointerMode === POINTER_MODES.DRAW) {
      canvas.on('mousedown touchstart', handlePointerDown);
      canvas.content.style.cursor = POINTER_ICONS.CROSSHAIR;
      if (selections && selections.length > 0) {
        updateState({
          selections: []
        })
      }
    } else {
      canvas.content.style.cursor = POINTER_ICONS.DEFAULT;
    }
    
    return () => {
      canvas.off('mousedown touchstart', handlePointerDown);
      canvas.content.style.cursor = POINTER_ICONS.DEFAULT;
    }
  }, [currentAnnotation.libClassName, pointerMode, canvas, handlePointerDown, noPointerEvents]);

  useEffect(() => {
    if (currentAnnotation.draw) {
      const shapeToProvide ={ ...currentAnnotation };
      delete shapeToProvide.draw;

      updateState({
        tmpAnnotate: shapeToProvide
      });
    }
  }, [currentAnnotation]);

  return [currentAnnotation, setCurrentAnnotation];
}

export default useAnnotation;
