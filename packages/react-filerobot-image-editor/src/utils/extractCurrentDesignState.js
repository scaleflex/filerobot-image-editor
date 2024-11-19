/** Internal Dependencies */
import defaultConfig from 'context/defaultConfig';
import getInitialAppState from 'context/getInitialAppState';

/**
 * Extracts the needed properties/state that are used in canvas's design from the global state.
 *
 * @param {Object} state The global state.
 * @param {Object} defaultValue Value assigned to any undefined/null property in returned object.
 * @returns {Object} The extracted design state.
 */
const extractCurrentDesignState = (state, useStateAsConfig) => {
  const initialAppState = getInitialAppState(
    useStateAsConfig ? state : defaultConfig,
  );

  return {
    imgSrc: state.imgSrc || initialAppState.imgSrc,
    finetunes: state.finetunes || initialAppState.finetunes,
    finetunesProps: state.finetunesProps || initialAppState.finetunesProps,
    filter: state.filter || initialAppState.filter,
    adjustments: state.adjustments || initialAppState.adjustments,
    annotationIds: state.annotationIds || initialAppState.annotationIds,
    annotations: state.annotations || initialAppState.annotations,
    resize: state.resize || initialAppState.resize,
    originalSource: state.originalSource || initialAppState.originalSource,
    presentOriginalSources:
      state.presentOriginalSources || initialAppState.presentOriginalSources,
    extra: state.extra || initialAppState.extra,
    trim: state.trim || initialAppState.trim,
  };
};

export default extractCurrentDesignState;
