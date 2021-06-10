import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import Context from '../context';
import randomId from '../utils/randomId';
import getTouchPosOrEvent from '../utils/getTouchPosOrEvent';

const useCanvasShape = ({ defaultFill = 'red', className, calcDimensionsProps, ...defaultProperties }) => {
  const { canvas, updateState } = useContext(Context);
  const [currentShape, setCurrentShape] = useState(
    () => ({
      draw: false,
      key: randomId(className),
      className: className,
      x: 0,
      y: 0,
      fill: defaultFill,
      draggable: true,
      ...defaultProperties
    })
  );
  const canvasDimensions = useRef({});
  const startPosition = useRef({});

  const positionDiffStartToEnd = useCallback((event) => {
    let positionDiffDimensions = {};
    positionDiffDimensions.x = Math.min(event.pageX, startPosition.current.x);
    positionDiffDimensions.y = Math.min(event.pageY, startPosition.current.y);
    positionDiffDimensions.width = Math.max(event.pageX, startPosition.current.x) - positionDiffDimensions.x;
    positionDiffDimensions.height = Math.max(event.pageY, startPosition.current.y) - positionDiffDimensions.y;

    if (calcDimensionsProps && typeof calcDimensionsProps === 'function') {
      positionDiffDimensions = {
        ...positionDiffDimensions,
        ...calcDimensionsProps(positionDiffDimensions.width, positionDiffDimensions.height)
      };
    }
    return positionDiffDimensions;
  }, []);

  const handleDimensionsMapping = useCallback((e) => {
    const event = getTouchPosOrEvent(e);
    setCurrentShape(
      (updatedCurrentShape) => {
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
            canvasDimensions.current.width - updatedCurrentShape.x
          );
        }
        // pointer end position is after the canvas bottom
        if (event.pageY > canvasDimensions.current.height + canvasDimensions.current.y) {
          mappedDimensions.height = canvasDimensions.current.y + (
            canvasDimensions.current.height - updatedCurrentShape.y
          );
        }

        return {
          ...updatedCurrentShape,
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

    setCurrentShape(
      (updatedCurrentShape) => ({
        ...updatedCurrentShape,
        ...positionDiffStartToEnd(event),
        draw: false,
      })
    );
  }, [handleDimensionsMapping, positionDiffStartToEnd]);

  const handlePointerOut = useCallback((e) => {
    if (!startPosition.current.isMouseOut) {
      document.addEventListener('mousemove', handleDimensionsMapping);
      document.addEventListener('touchmove', handleDimensionsMapping);
      startPosition.current.isMouseOut = true;
    }
  }, [handleDimensionsMapping]);

  const handlePointerUp = useCallback(() => {
    setCurrentShape(
      (updatedCurrentShape) => ({
        ...updatedCurrentShape,
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
    canvas.on('mousedown touchstart', handlePointerDown);
    canvas.content.style.cursor = 'crosshair';
    canvasDimensions.current = canvas.content.getBoundingClientRect();
    
    return () => {
      canvas.content.style.cursor = 'default';
      canvas.off('mousedown touchstart', handlePointerDown);
    }
  }, [canvas, handlePointerDown]);

  useEffect(() => {
    if (currentShape.draw) {
      const shapeToProvide ={ ...currentShape };
      delete shapeToProvide.draw;
      delete shapeToProvide.key;

      updateState({
        tmpAnnotate: {
          ...shapeToProvide,
          key: currentShape.key
        }
      });
    }
  }, [currentShape])

  return [currentShape, setCurrentShape];
}

export default useCanvasShape;
