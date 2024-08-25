export const UPDATE_ANNOTATION_IDS = 'UPDATE_ANNOTATION_IDS';

const updateAnnotationIds = (state, payload) => {
  return {
    ...state,
    // not stored in state, used in reducer to consider in undo/redo stacks
    isDesignState: !payload.dismissHistory,
    annotationIds: payload.annotationIds,
  };
};

export default updateAnnotationIds;
