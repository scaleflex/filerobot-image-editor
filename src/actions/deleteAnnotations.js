export const DELETE_ANNOTATIONS = 'DELETE_ANNOTATIONS';

const deleteAnnotations = (state, payload) => {
  const { annotations } = state;
  payload.annotationsIds.forEach((id) => {
    if (annotations[id]) {
      state.designLayer.findOne(`#${id}`)?.destroy();
      delete annotations[id];
    }
  });

  return {
    ...state,
    isDesignState: payload.isDesignState || true, // not stored in state, used in reducer to consider in undo/redo stacks
    annotations,
  };
};

export default deleteAnnotations;
