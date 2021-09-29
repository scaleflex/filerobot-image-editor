/** External Dependencies */
import React, { useCallback, useContext, useEffect } from 'react';

/** Internal Dependencies */
import { CHANGE_POINTER_MODE, CLEAR_ANNOTATIONS_SELECTIONS } from 'actions';
import Topbar from 'components/Topbar';
import AppContext from 'context';
import { POINTER_MODES } from 'utils/constants';
import { TABS } from './Annotate.constants';
import * as annotationTabs from './tabs';

const Annotate = () => {
  const {
    dispatch,
    subTab,
    pointerMode,
  } = useContext(AppContext);

  const clearSelections = useCallback(() => {
    dispatch({
      type: CLEAR_ANNOTATIONS_SELECTIONS,
    });
  }, []);

  const changePointerMode = useCallback((mode) => {
    dispatch({
      type: CHANGE_POINTER_MODE,
      payload: {
        mode,
      },
    });
  }, []);

  useEffect(() => {
    if (pointerMode !== POINTER_MODES.SELECT) {
      changePointerMode(POINTER_MODES.SELECT);
    }

    return () => {
      if (pointerMode !== POINTER_MODES.DEFAULT) {
        changePointerMode(POINTER_MODES.DEFAULT);
      }

      clearSelections();
    };
  }, []);

  return (
    <Topbar
      tabsComponents={annotationTabs}
      tabs={TABS}
      tab={subTab}
      hideRootTabs={false}
    />
  );
};

export default Annotate;
