/** Internal dependencies */
import { EVENTS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';
import getProperDimensions from 'utils/getProperDimensions';
import mapDimensions from 'utils/mapDimensions';
import randomId from 'utils/randomId';

export const SET_ANNOTATION = 'SET_ANNOTATION';

const setAnnotation = (state, payload = {}) => {
  // dismissHistory is used to prevent considering this change in history (undo/redo).
  const {
    dismissHistory = false,
    replaceCurrent = false,
    selectOnSet = false,
    onAnnotationAdd,
    applyDimensionsMappingToOriginal = true,
    ...newAnnotationData
  } = payload;
  const annotationId = newAnnotationData.id ?? randomId(newAnnotationData.name);

  let newAnnotation = { ...newAnnotationData, id: annotationId };

  const existedAnnotation = state.annotations[annotationId] || {};

  if (
    (replaceCurrent || Object.keys(existedAnnotation) === 0) &&
    typeof onAnnotationAdd === 'function'
  ) {
    const moreAnnotationData = onAnnotationAdd(newAnnotation, state);

    newAnnotation = { ...newAnnotation, ...moreAnnotationData };
  }

  // If annotation not changed don't update it.
  if (
    existedAnnotation &&
    !Object.keys(newAnnotation).some(
      (key) =>
        typeof newAnnotation[key] !== 'undefined' &&
        newAnnotation[key] !== existedAnnotation[key],
    )
  ) {
    return state;
  }

  let annotation = {
    ...(replaceCurrent ? {} : existedAnnotation),
    ...newAnnotation,
  };

  if (applyDimensionsMappingToOriginal) {
    const canvasDimensions = getProperDimensions(
      state.resize,
      state.adjustments.crop,
      state.shownImageDimensions,
      state.originalSource,
      state.adjustments.rotation,
    );

    const dimensionsToMap = {
      x: newAnnotation.x !== existedAnnotation.x && newAnnotation.x,
      y: newAnnotation.y !== existedAnnotation.y && newAnnotation.y,
      width:
        newAnnotation.width !== existedAnnotation.width && newAnnotation.width,
      height:
        newAnnotation.height !== existedAnnotation.height &&
        newAnnotation.height,
      radiusX:
        newAnnotation.radiusX !== existedAnnotation.radiusX &&
        newAnnotation.radiusX,
      radiusY:
        newAnnotation.radiusY !== existedAnnotation.radiusY &&
        newAnnotation.radiusY,
      // NOTE: NOT APPLIED TO RADIUS AS IT'S NOT CLEAR WHICH DIMENSION TO MAP TO (HEIGHT/WIDTH)? AND NOT NEEDED YET.
      // radius:
      //   newAnnotation.radius !== existedAnnotation.radius &&
      //   newAnnotation.radius,
    };

    annotation = {
      ...annotation,
      ...mapDimensions({
        dimensions: dimensionsToMap,
        oldMapDimensions: state.shownImageDimensions,
        newMapDimensions: canvasDimensions,
      }),
    };
  }

  emitCustomEvent(
    existedAnnotation ? EVENTS.ANNOTATION_EDIT : EVENTS.ANNOTATION_ADD,
    { annotation },
  );

  return {
    ...state,
    isDesignState: !dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
    annotations: {
      ...state.annotations,
      [annotation.id]: annotation,
    },
    selectionsIds: selectOnSet ? [annotation.id] : state.selectionsIds,
  };
};

export default setAnnotation;
