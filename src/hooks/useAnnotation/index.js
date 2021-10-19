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
import { ANNOTATIONS_NAMES } from 'utils/constants';
import previewThenCallAnnotationAdding from './previewThenCallAnnotationAdding';
import { useDebouncedCallback } from '..';

const DEFAULTS = {
  fill: '#000000',
};

// TODO: Imporve the logic.
const useAnnotation = (annotation = {}, enablePreview = true) => {
  const {
    dispatch,
    previewGroup,
    annotations,
    selectionsIds = [],
  } = useContext(AppContext);
  const [tmpAnnotation, setTmpAnnotation] = useState(() => ({
    ...DEFAULTS,
    ...annotation,
  }));
  const annotationBeforeSelection = useRef();
  const canvas = previewGroup?.getStage();

  const saveAnnotation = useCallback((annotationData) => {
    dispatch({
      type: SET_ANNOTATION,
      payload: annotationData,
    });
    if (annotationData.id && annotation.name !== ANNOTATIONS_NAMES.PEN) {
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
      avoidSave: false,
      ...(typeof updatesObjOrFn === 'function'
        ? updatesObjOrFn(latest)
        : updatesObjOrFn),
    }));
  }, 15);

  const getAnnotationInitialProps = useCallback(
    (currentAnnotation, newAnnotation = {}) => {
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
      if (currentAnnotation.name === newAnnotation.name) {
        return {
          ...DEFAULTS,
          ...annotation,
          ...dimensionlessProps,
        };
      }

      const {
        cornerRadius,
        lineCap,
        tension,
        sides,
        fontFamily,
        fontSize,
        fontStyle,
        letterSpacing,
        lineHeight,
        align,
        ...dimensionslessCommonProps
      } = dimensionlessProps;

      return dimensionslessCommonProps;
    },
    [],
  );

  const saveAnnotationNoDebounce = useCallback((annotationDataObjOrFn) => {
    setTmpAnnotation((latest) => {
      const newAnnotationData =
        typeof annotationDataObjOrFn === 'function'
          ? annotationDataObjOrFn(latest)
          : annotationDataObjOrFn;
      const initialProps = getAnnotationInitialProps(latest, newAnnotationData);

      return {
        ...annotation,
        ...initialProps,
        ...newAnnotationData,
        id:
          newAnnotationData.id ||
          randomId(newAnnotationData.name || latest.name),
        shouldSave: true,
        avoidSave: false,
      };
    });
  }, []);

  useEffect(() => {
    const { shouldSave, avoidSave, ...savableAnnotation } = tmpAnnotation;
    const selection =
      selectionsIds.length === 1 && annotations[selectionsIds[0]];
    if (!avoidSave && (shouldSave || selection)) {
      saveAnnotation({
        ...savableAnnotation,
        id: shouldSave ? savableAnnotation.id : selection.id,
      });
    }
  }, [tmpAnnotation]);

  useEffect(() => {
    if (selectionsIds.length === 1) {
      annotationBeforeSelection.current = tmpAnnotation;
      setTmpAnnotation({ ...annotations[selectionsIds[0]], avoidSave: true });
    } else if (annotationBeforeSelection.current) {
      setTmpAnnotation({
        ...annotationBeforeSelection.current,
        avoidSave: true,
      });
      annotationBeforeSelection.current = null;
    }
  }, [selectionsIds, annotations]);

  useEffect(() => {
    let stopAnnotationEventsListening = null;

    if (canvas && enablePreview) {
      const annotationInitialProps = getAnnotationInitialProps(
        tmpAnnotation,
        annotation,
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
