/** External Dependencies */
import { useCallback, useContext, useMemo } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { ADD_FILTER } from 'actions';

const useFilter = () => {
  const { dispatch, filter } = useContext(AppContext);

  const setFilter = useCallback((filterToApply) => {
    dispatch({
      type: ADD_FILTER,
      payload: {
        filter: filterToApply,
      },
    });
  }, []);

  return useMemo(() => [filter, setFilter], [filter]);
};

export default useFilter;
