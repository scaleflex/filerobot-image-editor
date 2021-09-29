/** Internal Dependencies */
import initialAppState from 'context/initialAppState';

/**
 * Extracts the needed properties/state that are used in canvas's design from the global state.
 *
 * @param {Object} state The global state.
 * @param {Object} defaultValue Value assigned to any undefined/null property in returned object.
 * @returns {Object} The extracted design state.
 */
const extractCurrentDesignState = (state) => ({
  finetunes: state.finetunes || initialAppState.finetunes,
  finetunesProps: state.finetunesProps || initialAppState.finetunesProps,
  filter: state.filter || initialAppState.filter,
  adjustments: state.adjustments || initialAppState.adjustments,
  annotations: state.annotations || initialAppState.annotations,
});

export default extractCurrentDesignState;
