export const SET_FINETUNE = 'SET_FINETUNE';

const setFinetune = (state, payload) => ({
  ...state,
  isDesignState: !payload.dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
  finetunes:
    !payload.finetune || state.finetunes.includes(payload.finetune)
      ? state.finetunes
      : [...state.finetunes, payload.finetune],
  finetunesProps: {
    ...state.finetunesProps,
    ...payload.finetuneProps,
  },
});

export default setFinetune;
