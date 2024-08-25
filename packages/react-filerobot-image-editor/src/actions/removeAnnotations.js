import { EVENTS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';

export const REMOVE_ANNOTATIONS = 'REMOVE_ANNOTATIONS';

const removeAnnotations = (state, payload) => {
  const { annotations, annotationIds } = state;
  const newAnnotations = { ...annotations };
  let newAnnotationIds = annotationIds;
  let newSelectionsIds = state.selectionsIds;

  payload.annotationsIds.forEach((id) => {
    newSelectionsIds = newSelectionsIds.filter(
      (selectionId) => selectionId !== id,
    );

    if (state.designLayer && newAnnotations[id]) {
      const annotationNode = state.designLayer.findOne(`#${id}`);
      if (annotationNode) {
        annotationNode.destroy();
      }
      delete newAnnotations[id];
      newAnnotationIds = newAnnotationIds.filter(
        (annotationId) => id !== annotationId,
      );
    }
  });

  emitCustomEvent(EVENTS.ANNOTATIONS_REMOVE, {
    ids: payload.annotationsIds,
  });

  return {
    ...state,
    // not stored in state, used in reducer to consider in undo/redo stacks
    isDesignState: !payload.dismissHistory,
    annotationIds: newAnnotationIds,
    annotations: newAnnotations,
    selectionsIds: [],
  };
};

export default removeAnnotations;
