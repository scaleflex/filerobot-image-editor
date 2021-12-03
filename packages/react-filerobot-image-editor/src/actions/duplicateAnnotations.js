/** Internal Dependencies */
import randomId from 'utils/randomId';

export const DUPLICATE_ANNOTATIONS = 'DUPLICATE_ANNOTATIONS';

const duplicateAnnotations = (state, payload) => {
  const { annotations } = state;
  const duplicatedAnnotations = {};
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
    }
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
