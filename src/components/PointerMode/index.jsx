/** External Dependencies */
import React, { useContext } from 'react';
import { Adjust, Brush } from '@scaleflex/icons';
import { IconButton } from '@scaleflex/ui/core';

/** internal Dependencies */
import AppContext from 'context';
import { CHANGE_POINTER_MODE } from 'actions';
import { POINTER_MODES, TABS_IDS } from 'utils/constants';
import { PointerModeWrapper } from './PointerMode.styled';

const PointerMode = () => {
  const {
    pointerMode,
    dispatch,
    theme,
    tab,
  } = useContext(AppContext);

  const changePointerMode = (mode) => {
    if (mode) {
      dispatch({
        type: CHANGE_POINTER_MODE,
        payload: {
          mode,
        },
      });
    }
  };

  return (
    <PointerModeWrapper>
      <IconButton
        size="sm"
        color="link"
        onClick={() => changePointerMode(POINTER_MODES.SELECT)}
      >
        <Adjust
          size={14}
          color={pointerMode === POINTER_MODES.SELECT ? theme.palette['accent-primary'] : undefined}
        />
      </IconButton>
      <IconButton
        size="sm"
        color="link"
        disabled={tab?.id !== TABS_IDS.ANNOTATE}
        onClick={() => changePointerMode(POINTER_MODES.DRAW)}
      >
        <Brush
          size={14}
          color={pointerMode === POINTER_MODES.DRAW ? theme.palette['accent-primary'] : undefined}
        />
      </IconButton>
    </PointerModeWrapper>
  );
};

export default PointerMode;
