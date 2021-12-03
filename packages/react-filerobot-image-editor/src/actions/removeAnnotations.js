export const REMOVE_ANNOTATIONS = 'REMOVE_ANNOTATIONS';

const removeAnnotations = (state, payload) => {
  const { annotations } = state;
  let newSelectionsIds = state.selectionsIds;

  payload.annotationsIds.forEach((id) => {
    newSelectionsIds = newSelectionsIds.filter(
      (selectionId) => selectionId !== id,
    );

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
    selectionsIds: [],
  };
};

export default removeAnnotations;
