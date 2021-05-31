import React from 'react';

import { StyledBottombar } from './Bottombar.styled';
import FullscreenButton from './FullscreenButton';
import ResetButton from './ResetButton';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';

const Bottombar = () => (
  <StyledBottombar>
    <ResetButton />
    <UndoButton />
    <RedoButton />
    <FullscreenButton />
  </StyledBottombar>
)

export default Bottombar;
