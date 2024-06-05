/** External Dependencies */
import { useCallback } from 'react';
import { TOGGLE_TABS_NAVBAR } from 'actions';

/** Internal Dependencies */
import useDispatch from './useDispatch';

const useToggleTabsNavbar = () => {
  const dispatch = useDispatch();

  const toggleTabsNavbar = useCallback(
    (open) =>
      dispatch({
        type: TOGGLE_TABS_NAVBAR,
        payload: {
          opened: open,
        },
      }),
    [],
  );

  return toggleTabsNavbar;
};

export default useToggleTabsNavbar;
