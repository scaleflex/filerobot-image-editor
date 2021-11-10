/** External Dependencies */
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { SELECT_ANNOTATION, SET_ANNOTATION } from 'actions';
import randomId from 'utils/randomId';
import debounce from 'utils/debounce';
import { TOOLS_IDS } from 'utils/constants';
import previewThenCallAnnotationAdding from './previewThenCallAnnotationAdding';
import { useDebouncedCallback } from '..';

// TODO: Imporve the logic and separate the selected annotation options from handling preview and options before draw.
const useAnnotation = (annotation = {}, enablePreview = true) => {
  const {
    dispatch,
    previewGroup,
    options,
    annotations,
    selectionsIds = [],
  } = useContext(AppContext);
  const annotationDefaults = {
    ...options.common,
    ...options[annotations[selectionsIds[0]]?.name || annotation.name],
  };
  const [tmpAnnotation, setTmpAnnotation] = useState(() => ({
    ...annotationDefaults,
    ...annotation,
    ...annotations[selectionsIds[0]],
  }));
  const annotationBeforeSelection = useRef();
  const canvas = previewGroup?.getStage();

  const saveAnnotation = useCallback((annotationData) => {
    dispatch({
      type: SET_ANNOTATION,
      payload: annotationData,
    });
    if (annotationData.id && annotation.name !== TOOLS_IDS.PEN) {
      debounce(() => {
        dispatch({
          type: SELECT_ANNOTATION,
          payload: {
            annotationId: annotationData.id,
          },
        });
      }, 30)();
    }
  }, []);

  const updateTmpAnnotation = useDebouncedCallback((updatesObjOrFn) => {
    setTmpAnnotation((latest) => ({
      ...latest,
      id: undefined,
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
          x,
          y,
          width,
          height,
          radius,
          radiusX,
          radiusY,
          points,
          image,
          text,
          scaleX,
          scaleY,
          rotation,
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
    [],
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

  useEffect(() => {
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
