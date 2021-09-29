/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import PointerMode from 'components/PointerMode';
import { StyledBottombar } from './Bottombar.styled';
import FullscreenButton from './FullscreenButton';

const Bottombar = () => (
  <StyledBottombar>
    <FullscreenButton />
    <PointerMode />
  </StyledBottombar>
);

export default Bottombar;
