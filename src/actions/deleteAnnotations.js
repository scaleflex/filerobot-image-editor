export const DELETE_ANNOTATIONS = 'DELETE_ANNOTATIONS';

const deleteAnnotations = (state, payload) => {
  const { annotations } = state;
  payload.annotationsIds.forEach((id) => {
    if (state.designLayer && annotations[id]) {
      const annotationNode = state.designLayer.findOne(`#${id}`);
      if (annotationNode) {
        annotationNode.destroy();
      }
      delete annotations[id];
    }
  });

  return {
    ...state,
    // not stored in state, used in reducer to consider in undo/redo stacks
    isDesignState: payload.isDesignState || true,
    annotations,
  };
};

export default deleteAnnotations;
