/** External Dependencies */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** Internal Dependencies */
import randomId from 'utils/randomId';
import { TOOLS_IDS } from 'utils/constants';
import {
  useSelectTool,
  useSetAnnotation,
  useStore,
  useUpdateEffect,
} from 'hooks';
import previewThenCallAnnotationAdding from './previewThenCallAnnotationAdding';
import useDebouncedCallback from '../useDebouncedCallback';

// TODO: Imporve the logic and separate the selected annotation options from handling preview and options before draw.
const useAnnotation = (annotation = {}, enablePreview = true) => {
  const setAnnotation = useSetAnnotation();
  const {
    previewGroup,
    annotations,
    selectionsIds = [],
    config,
    toolId,
  } = useStore();
  const selectTool = useSelectTool();
  const selectedAnnotationName = annotations[selectionsIds[0]]?.name;
  const annotationDefaults = {
    ...config.annotationsCommon,
    ...config[annotation.name || selectedAnnotationName],
  };
  const [tmpAnnotation, setTmpAnnotation] = useState(() => ({
    ...annotationDefaults,
    ...annotation,
    ...(selectedAnnotationName === annotation.name &&
      annotations[selectionsIds[0]]),
  }));
  const annotationBeforeSelection = useRef();
  const canvas = previewGroup?.getStage();

  const saveAnnotation = useCallback((annotationData) => {
    const { fonts, onFontChange, ...savableAnnotationData } = annotationData;
    const selectOnSet =
      savableAnnotationData.id && annotation.name !== TOOLS_IDS.PEN;
    setAnnotation({ ...savableAnnotationData, selectOnSet });
  }, []);

  const updateTmpAnnotation = useDebouncedCallback((updatesObjOrFn) => {
    setTmpAnnotation((latest) => ({
      ...latest,
      shouldSave: false,
      neverSave: false,
      ...(typeof updatesObjOrFn === 'function'
        ? updatesObjOrFn(latest)
        : updatesObjOrFn),
    }));
  }, 15);

  const getAnnotationInitialProps = useCallback(
    (currentAnnotation, newAnnotationName) => {
      if (currentAnnotation.name === newAnnotationName) {
        const {
          id,
          x,
          y,
          width,
          height,
          radius,
          radiusX,
          radiusY,
          points,
          image,
          originalImage,
          text,
          scaleX,
          scaleY,
          rotation,
          place,
          gravity,
          order,
          ...dimensionlessProps
        } = currentAnnotation;

        return {
          ...annotationDefaults,
          ...annotation,
          ...dimensionlessProps,
        };
      }

      return {
        ...annotationDefaults,
        ...annotation,
      };
    },
    [annotationDefaults, annotation],
  );

  const saveAnnotationNoDebounce = useCallback((newAnnotationData) => {
    setTmpAnnotation((latest) => {
      const initialProps = getAnnotationInitialProps(
        latest,
        newAnnotationData.name || annotation.name,
      );

      return {
        ...initialProps,
        ...newAnnotationData,
        id:
          newAnnotationData.id ||
          randomId(newAnnotationData.name || latest.name),
        shouldSave: true,
        neverSave: false,
      };
    });
  }, []);

  useEffect(() => {
    const shouldChangeTool =
      tmpAnnotation.name && tmpAnnotation.name !== toolId;
    if (shouldChangeTool) {
      selectTool(tmpAnnotation.name, true);
    }
  }, [tmpAnnotation.name]);

  useUpdateEffect(() => {
    const { shouldSave, neverSave, ...savableAnnotation } = tmpAnnotation;
    const selection =
      selectionsIds.length === 1 && annotations[selectionsIds[0]];
    if (!neverSave && (shouldSave || selection)) {
      saveAnnotation({
        ...savableAnnotation,
        id: shouldSave ? savableAnnotation.id : selection.id,
      });
    }
  }, [tmpAnnotation]);

  useUpdateEffect(() => {
    // setTimeout to make the state changes after the annotation is drawn not before.
    setTimeout(() => {
      if (selectionsIds.length === 1) {
        annotationBeforeSelection.current = tmpAnnotation;
        setTmpAnnotation({ ...annotations[selectionsIds[0]], neverSave: true });
      } else if (annotationBeforeSelection.current) {
        setTmpAnnotation({
          ...annotationBeforeSelection.current,
          neverSave: true,
        });
        annotationBeforeSelection.current = null;
      }
    });
  }, [selectionsIds, annotations]);

  useEffect(() => {
    let stopAnnotationEventsListening = null;

    if (canvas && enablePreview) {
      const annotationInitialProps = getAnnotationInitialProps(
        tmpAnnotation,
        annotation.name,
      );

      stopAnnotationEventsListening = previewThenCallAnnotationAdding(
        canvas,
        { ...annotationInitialProps, name: annotation.name },
        previewGroup,
        saveAnnotationNoDebounce,
      );
    }

    return () => {
      if (stopAnnotationEventsListening) {
        stopAnnotationEventsListening();
      }
    };
  }, [canvas, tmpAnnotation, previewGroup]);

  return useMemo(
    () => [tmpAnnotation, updateTmpAnnotation, saveAnnotationNoDebounce],
    [tmpAnnotation, updateTmpAnnotation, saveAnnotationNoDebounce],
  );
};

export default useAnnotation;
