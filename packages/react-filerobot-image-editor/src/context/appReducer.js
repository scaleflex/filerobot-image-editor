import actions from 'actions';

const appReducer = (state, action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.info('editor:', action);
  }
  return actions[action.type]
    ? actions[action.type](state, action.payload) || state
    : state;
}

export default appReducer;
