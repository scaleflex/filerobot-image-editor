/** Internal Dependencies */
import deepMerge from 'utils/deepMerge';

export const UPDATE_STATE = 'UPDATE_STATE';

const updateState = (state, payload) => deepMerge(state, payload);

export default updateState;
