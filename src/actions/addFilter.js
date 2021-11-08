export const ADD_FILTER = 'ADD_FILTER';

const addFilter = (state, payload) => ({
  ...state,
  isDesignState: !payload.dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
  filter: payload.filter || null,
});

export default addFilter;
