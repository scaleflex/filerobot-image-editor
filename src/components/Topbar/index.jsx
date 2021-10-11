/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import Separator from 'components/common/Separator';
import CloseButton from './CloseButton';
import SaveButton from './SaveButton';
import ResetButton from './ResetButton';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import ImageDimensionsAndDisplayToggle from './ImageDimensionsAndDisplayToggle';
import CanvasZooming from './CanvasZooming';
import {
  StyledTopbar,
  StyledFlexCenterAlignedContainer,
} from './Topbar.styled';

const Topbar = () => (
  <StyledTopbar>
    <StyledFlexCenterAlignedContainer>
      <SaveButton />
      <ResetButton />
      <UndoButton />
      <RedoButton />
    </StyledFlexCenterAlignedContainer>
    <StyledFlexCenterAlignedContainer>
      <ImageDimensionsAndDisplayToggle />
      <Separator />
      <CanvasZooming />
    </StyledFlexCenterAlignedContainer>
    <CloseButton onClose={() => console.log('closed')} />
  </StyledTopbar>
);
export default Topbar;
