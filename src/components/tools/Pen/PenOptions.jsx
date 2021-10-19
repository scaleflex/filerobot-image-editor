/** External Dependencies */
import React, { useCallback, useContext, useEffect, useRef } from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { ANNOTATIONS_NAMES } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';
import AppContext from 'context';
import getPointerOffsetPositionBoundedToObject from 'utils/getPointerOffsetPositionBoundedToObject';
import randomId from 'utils/randomId';
import { SELECT_ANNOTATION } from 'actions';

const eventsOptions = {
  passive: true,
};

const PenOptions = () => {
  const { dispatch, designLayer } = useContext(AppContext);
  const [pen, savePenDebounced, savePenNoDebounce] = useAnnotation(
    {
      name: ANNOTATIONS_NAMES.PEN,
      tension: 0.5,
      lineCap: 'round',
    },
    false,
  );
  const canvasRef = useRef(null);
  const startedPen = useRef({
    points: [],
    moved: false,
    id: '',
  });

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

  const handlePointerMove = useCallback((e) => {
    if (!startedPen.current.moved) {
      startedPen.current = {
        moved: true,
        id: randomId(ANNOTATIONS_NAMES.PEN),
        points: [...startedPen.current.points, ...getPointerPosition(e)],
      };

      savePenNoDebounce({
        id: startedPen.current.id,
        name: ANNOTATIONS_NAMES.PEN,
        points: startedPen.current.points,
      });
    } else {
      savePenNoDebounce(
        (currentPen) => ({
          ...currentPen,
          points: currentPen.points.concat(getPointerPosition(e)),
        }),
        true,
      );
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (startedPen.current.id) {
      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId: startedPen.current.id,
        },
      });
    }

    startedPen.current = null;
    canvasRef.current.off('mousemove touchmove', handlePointerMove);
    canvasRef.current.off('mouseleave touchcancel', handlePointerUp);
    document.removeEventListener('mouseup', handlePointerUp, eventsOptions);
    document.removeEventListener('touchend', handlePointerUp, eventsOptions);
    document.removeEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.removeEventListener('touchcancel', handlePointerUp, eventsOptions);
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (e.target.attrs.draggable) {
      return;
    }
    e.evt.preventDefault();

    startedPen.current = { points: getPointerPosition(e) };

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
      updateAnnotation={savePenDebounced}
      hideFillOption
    />
  );
};

export default PenOptions;
