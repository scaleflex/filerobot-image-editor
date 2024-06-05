/** External Dependencies */
import { useCallback } from 'react';

/** Internal Dependencies */
import useStore from './useStore';

const useDispatch = () => {
  const { dispatch } = useStore();

  return useCallback(dispatch, [dispatch]);
};

export default useDispatch;
