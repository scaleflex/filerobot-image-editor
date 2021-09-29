import randomId from 'utils/randomId';

export const SET_ANNOTATION = 'SET_ANNOTATION';

const setAnnotation = (state, payload) => {
  // const { absoluteDimensions, ...newAnnotation } = payload;
  const newAnnotation = payload;
  const annotationId = payload.id ?? randomId(newAnnotation.name);

  return {
    ...state,
    isDesignState: true, // not stored in state, used in reducer to consider in undo/redo stacks
    annotations: {
      ...state.annotations,
      [annotationId]: {
        ...state.annotations[annotationId],
        ...newAnnotation,
        id: annotationId,
      },
    },
  };
};

export default setAnnotation;
