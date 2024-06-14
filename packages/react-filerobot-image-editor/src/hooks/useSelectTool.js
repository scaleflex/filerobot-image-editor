/** External dependencies */
import { useCallback } from 'react';

/** Internal dependencies */
import { SELECT_TOOL } from 'actions';
import useDispatch from './useDispatch';

const useSelectTool = () => {
  const dispatch = useDispatch();

  const selectTool = useCallback((toolId, keepSelections = false) => {
    dispatch({
      type: SELECT_TOOL,
      payload: {
        toolId,
        keepSelections,
      },
    });
  }, []);

  return selectTool;
};

export default useSelectTool;
