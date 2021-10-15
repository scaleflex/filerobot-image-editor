/** External Dependencies */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { SELECT_ADDED_ANNOTATION, SET_ANNOTATION } from 'actions';
import randomId from 'utils/randomId';
import previewThenCallAnnotationAdding from './previewThenCallAnnotationAdding';

const DEFAULTS = {
  fill: '#000',
};

const useAnnotation = (annotation = {}, enablePreview = true) => {
  const { dispatch, previewGroup, pointerMode } = useContext(AppContext);
  const [tmpAnnotation, setTmpAnnotation] = useState(() => ({
    ...DEFAULTS,
    ...annotation,
  }));
  const canvas = previewGroup?.getStage();

  const saveAnnotation = useCallback((annotationData) => {
    dispatch({
      type: SET_ANNOTATION,
      payload: annotationData,
    });
    if (annotationData.id) {
      dispatch({
        type: SELECT_ADDED_ANNOTATION,
        payload: {
          annotationId: annotationData.id,
        },
      });
    }
  }, []);

  const updateAnnotationProps = useCallback(
    (updatesObjOrFn, updateDrawnAnnotation = false) => {
      // We used to this solution for not adding deps. in the useCallback for avoiding changing the function's ref.
      let annotationUpdated;
      setTmpAnnotation((latest) => {
        annotationUpdated = {
          ...latest,
          ...(typeof updatesObjOrFn === 'function'
            ? updatesObjOrFn(latest)
            : updatesObjOrFn),
        };
        return annotationUpdated;
      });

      if (updateDrawnAnnotation && annotationUpdated.id) {
        saveAnnotation(annotationUpdated);
      }
    },
    [],
  );

  const addNewAnnotation = useCallback((newAnnotationObjOrFn) => {
    updateAnnotationProps(
      (latestAnnotation) => ({
        ...(typeof newAnnotationObjOrFn === 'function'
          ? newAnnotationObjOrFn(latestAnnotation)
          : newAnnotationObjOrFn),
        id: randomId(annotation.name), // new id would be the reason for adding as new annotation.
      }),
      true,
    );
  }, []);

  useEffect(() => {
    let stopAnnotationEventsListening = null;

    if (canvas && enablePreview) {
      stopAnnotationEventsListening = previewThenCallAnnotationAdding(
        canvas,
        tmpAnnotation,
        previewGroup,
        addNewAnnotation,
      );
    }

    return () => {
      if (stopAnnotationEventsListening) {
        stopAnnotationEventsListening();
      }
    };
  }, [canvas, tmpAnnotation, pointerMode, previewGroup]);

  return useMemo(
    () => [tmpAnnotation, updateAnnotationProps, addNewAnnotation],
    [tmpAnnotation, updateAnnotationProps, addNewAnnotation],
  );
};

export default useAnnotation;
