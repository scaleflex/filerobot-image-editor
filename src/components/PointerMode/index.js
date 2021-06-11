import React, { useContext } from 'react';
import { Adjust, Brush } from '@scaleflex/icons';
import { IconButton } from '@scaleflex/ui/core';
import { useTheme } from '@scaleflex/ui/theme/hooks';

import Context from '../../context';
import { POINTER_MODES } from '../../utils/constants';
import { PointerModeWrapper } from './PointerMode.styled';

const PointerMode = () => {
  const theme = useTheme();
  const { pointerMode, updateState } = useContext(Context);
  const changePointerMode = (mode) => {
    if (mode) {
      updateState ({
        pointerMode: mode
      })
    }
  }

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
        onClick={() => changePointerMode(POINTER_MODES.DRAW)}
      >
        <Brush
          size={14}
          color={pointerMode === POINTER_MODES.DRAW ? theme.palette['accent-primary'] : undefined}
        />
      </IconButton>
    </PointerModeWrapper>
  )
}

export default PointerMode;
