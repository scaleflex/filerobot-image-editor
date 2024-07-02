/** Internal Dependencies */
import { EVENTS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';
import randomId from 'utils/randomId';

export const DUPLICATE_ANNOTATIONS = 'DUPLICATE_ANNOTATIONS';

const duplicateAnnotations = (state, payload) => {
  const { onAnnotationAdd, annotations } = state;
  const duplicatedAnnotations = {};
  const hasOnAnnotationAddFn = typeof onAnnotationAdd === 'function';
  payload.annotationsIds.forEach((id) => {
    const annotation = annotations[id];
    if (annotation) {
      const clonedAnnotationId = randomId(annotation.name);
      duplicatedAnnotations[clonedAnnotationId] = {
        ...annotation,
        id: clonedAnnotationId,
        x: annotation.x + 20,
        y: annotation.y + 20,
      };

      if (hasOnAnnotationAddFn) {
        const moreAnnotationData = onAnnotationAdd(
          duplicatedAnnotations[clonedAnnotationId],
          state,
        );
        duplicatedAnnotations[clonedAnnotationId] = {
          ...duplicatedAnnotations[clonedAnnotationId],
          ...moreAnnotationData,
        };
      }
    }
  });

  emitCustomEvent(EVENTS.ANNOTATIONS_DUPLICATE, {
    duplicated: duplicatedAnnotations,
    originalIds: payload.annotationsIds,
  });

  return {
    ...state,
    // not stored in state, used in reducer to consider in undo/redo stacks
    isDesignState: !payload.dismissHistory,
    annotations: {
      ...annotations,
      ...duplicatedAnnotations,
    },
  };
};

export default duplicateAnnotations;
