/** Internal Dependencies */
import deepMerge from 'utils/deepMerge';

export const UPDATE_STATE = 'UPDATE_STATE';

const updateState = (state, payloadObjOrFn) => {
  const payload =
    payloadObjOrFn && typeof payloadObjOrFn === 'function'
      ? payloadObjOrFn(state)
      : payloadObjOrFn;
  return payload ? deepMerge(state, payload) : state;
};

export default updateState;
