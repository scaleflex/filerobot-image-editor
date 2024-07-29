/** External Dependencies */
import { useCallback } from 'react';

/** Internal Dependencies */
import { UPDATE_STATE } from 'actions';
import useDispatch from './useDispatch';

const useUpdateState = () => {
  const dispatch = useDispatch();

  const updateState = useCallback(
    (newStateSliceObjOrFn) => {
      if (!newStateSliceObjOrFn) {
        return;
      }

      dispatch({
        type: UPDATE_STATE,
        payload: newStateSliceObjOrFn,
      });
    },
    [dispatch],
  );

  return updateState;
};

export default useUpdateState;
