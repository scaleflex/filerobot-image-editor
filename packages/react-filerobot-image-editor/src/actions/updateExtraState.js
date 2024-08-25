export const UPDATE_EXTRA_STATE = 'UPDATE_EXTRA_STATE';

const updateExtraState = (state, payload) => {
  const { dismissHistory = false, ...newExtraState } = payload;

  return {
    ...state,
    isDesignState: !dismissHistory,
    extra: { ...state.extra, ...newExtraState },
  };
};

export default updateExtraState;
