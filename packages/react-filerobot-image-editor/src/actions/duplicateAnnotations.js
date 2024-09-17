/** Internal Dependencies */
import { EVENTS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';
import randomId from 'utils/randomId';

export const DUPLICATE_ANNOTATIONS = 'DUPLICATE_ANNOTATIONS';

const duplicateAnnotations = (state, payload) => {
  const { annotations } = state;
  const { onAnnotationAdd } = payload;
  const duplicatedAnnotations = {};
  const hasOnAnnotationAddFn = typeof onAnnotationAdd === 'function';
  const duplicatedAnnotationIds = [];

  payload.annotationsIds.forEach((id) => {
    const annotation = annotations[id];
    if (annotation) {
      let duplicatedAnnotation = {
        ...annotation,
        id: randomId(annotation.name),
        label: `${annotation.label || annotation.id} - Copy`,
        x: annotation.x + 20,
        y: annotation.y + 20,
      };

      if (hasOnAnnotationAddFn) {
        const moreAnnotationData = onAnnotationAdd(
          { ...duplicatedAnnotation, isDuplicated: true },
          state,
        );
        duplicatedAnnotation = {
          ...duplicatedAnnotation,
          ...moreAnnotationData,
        };
      }

      duplicatedAnnotationIds.push(duplicatedAnnotation.id);
      duplicatedAnnotations[duplicatedAnnotation.id] = duplicatedAnnotation;
    }
  });

  emitCustomEvent(EVENTS.ANNOTATIONS_DUPLICATE, {
    duplicated: duplicatedAnnotations,
    originalIds: payload.annotationsIds,
  });

  return {
    ...state,
    // not stored in state, used in reducer to consider in undo/redo stacks
    selectionsIds: duplicatedAnnotationIds,
    isDesignState: !payload.dismissHistory,
    annotationIds: [...state.annotationIds, ...duplicatedAnnotationIds],
    annotations: {
      ...annotations,
      ...duplicatedAnnotations,
    },
  };
};

export default duplicateAnnotations;
