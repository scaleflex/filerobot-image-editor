/** External Dependencies */
import React, { useCallback, useContext, useEffect, useRef } from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { ANNOTATIONS_NAMES } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';
import AppContext from 'context';
import getPointerOffsetPositionBoundedToObject from 'utils/getPointerOffsetPositionBoundedToObject';
import randomId from 'utils/randomId';

const eventsOptions = {
  passive: true,
};

const PenOptions = () => {
  const { designLayer } = useContext(AppContext);
  const [pen, savePen, startNewPen] = useAnnotation(
    {
      name: ANNOTATIONS_NAMES.PEN,
    },
    false,
  );
  const canvasRef = useRef(null);

  const getPointerPosition = useCallback((e) => {
    const canvasBoundingRect =
      canvasRef.current.content.getBoundingClientRect();
    const canvasScale = canvasRef.current.scale();
    const pos = getPointerOffsetPositionBoundedToObject(e, canvasBoundingRect);

    return [
      pos.offsetX / canvasScale.x - (designLayer.attrs.xPadding || 0),
      pos.offsetY / canvasScale.y - (designLayer.attrs.yPadding || 0),
    ];
  }, []);

  const saveLine = useCallback((e) => {
    savePen((currentPen) => {
      const linesLength = currentPen.lines.length;
      const lastLine = currentPen.lines[linesLength - 1];
      lastLine.points = lastLine.points.concat(getPointerPosition(e));
      currentPen.lines.splice(linesLength - 1, 1, lastLine);

      return { lines: currentPen.lines.concat() };
    }, true);
  }, []);

  const handlePointerMove = useCallback(saveLine, [saveLine]);

  const handlePointerUp = useCallback(() => {
    canvasRef.current.off('mousemove touchmove', handlePointerMove);
    canvasRef.current.off('mouseleave touchcancel', handlePointerUp);
    document.removeEventListener('mouseup', handlePointerUp, eventsOptions);
    document.removeEventListener('touchend', handlePointerUp, eventsOptions);
    document.removeEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.removeEventListener('touchcancel', handlePointerUp, eventsOptions);
  }, []);

  const handlePointerDown = useCallback((e) => {
    startNewPen((latestPen) => ({
      ...latestPen,
      lines: [
        {
          id: randomId(ANNOTATIONS_NAMES.PEN_LINE),
          name: ANNOTATIONS_NAMES.PEN_LINE,
          points: getPointerPosition(e),
        },
      ],
    }));

    canvasRef.current.on('mousemove touchmove', handlePointerMove);
    canvasRef.current.on('mouseleave touchcancel', handlePointerUp);
    document.addEventListener('mouseup', handlePointerUp, eventsOptions);
    document.addEventListener('touchend', handlePointerUp, eventsOptions);
    document.addEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.addEventListener('touchcancel', handlePointerUp, eventsOptions);
  }, []);

  useEffect(() => {
    canvasRef.current = designLayer?.getStage();
    if (canvasRef.current) {
      canvasRef.current.on('mousedown touchstart', handlePointerDown);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.off('mousedown touchstart', handlePointerDown);
      }
    };
  }, []);

  return (
    <AnnotationOptions
      annotation={pen}
      updateAnnotation={savePen}
      hideFillOption
    />
  );
};

export default PenOptions;
