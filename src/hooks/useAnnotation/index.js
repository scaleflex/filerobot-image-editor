/** External Dependencies */
import {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { CHANGE_POINTER_MODE, SET_ANNOTATION } from 'actions';
import { POINTER_MODES } from 'utils/constants';
import previewThenCallAnnotationAdding from './previewThenCallAnnotationAdding';

const DEFAULTS = {
  fill: '#000',
};

const useAnnotation = (annotation = {}, enablePreview = true) => {
  const {
    dispatch,
    previewLayer,
    annotations,
    pointerMode,
  } = useContext(AppContext);
  const [tmpAnnotation, setTmpAnnotation] = useState(() => ({
    ...DEFAULTS,
    ...annotation,
  }));
  const canvas = previewLayer.parent || {};

  const usedAnnotation = useMemo(() => (
    annotations[annotation.id] || tmpAnnotation
  ), [annotations[annotation.id], tmpAnnotation]);

  const updateTmpAnnotationNoDraw = useCallback(
    (updates) => {
      setTmpAnnotation(
        (latest) => ({
          ...latest,
          ...updates,
        }),
      );
    },
    [],
  );

  const updateFinalAnnotationWithDraw = useCallback((newAnnotationProps) => {
    dispatch({
      type: SET_ANNOTATION,
      payload: newAnnotationProps,
    });
  }, []);

  const disableDrawMode = useCallback(() => {
    dispatch({
      type: CHANGE_POINTER_MODE,
      payload: {
        mode: POINTER_MODES.SELECT,
      },
    });
  }, []);

  const enableAndDisableDrawMode = useCallback(() => {
    dispatch({
      type: CHANGE_POINTER_MODE,
      payload: {
        mode: POINTER_MODES.DRAW,
      },
    });

    return disableDrawMode;
  }, []);

  useEffect(enableAndDisableDrawMode, []);

  useEffect(() => {
    let stopAnnotationEventsListening = null;

    if (enablePreview && pointerMode === POINTER_MODES.DRAW) {
      stopAnnotationEventsListening = previewThenCallAnnotationAdding(
        canvas,
        usedAnnotation,
        previewLayer,
        updateFinalAnnotationWithDraw,
      );
    }

    return () => {
      if (stopAnnotationEventsListening) {
        stopAnnotationEventsListening();
      }
    };
  }, [canvas, usedAnnotation, pointerMode, previewLayer]);

  const updateAnnotationFn = usedAnnotation.id
    ? updateFinalAnnotationWithDraw(usedAnnotation)
    : updateTmpAnnotationNoDraw;

  return useMemo(
    () => [
      usedAnnotation,
      updateAnnotationFn,
    ],
    [usedAnnotation, updateAnnotationFn],
  );
};

export default useAnnotation;
