import React from 'react';

import { StyledBottombar } from './Bottombar.styled';
import FullscreenButton from './FullscreenButton';
import ResetButton from './ResetButton';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import PointerMode from '../PointerMode';

const Bottombar = () => (
  <StyledBottombar>
    <ResetButton />
    <UndoButton />
    <RedoButton />
    <FullscreenButton />
    <PointerMode />
  </StyledBottombar>
)

export default Bottombar;
