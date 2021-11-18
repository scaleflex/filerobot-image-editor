/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import Separator from 'components/common/Separator';
import { useStore } from 'hooks';
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
import BackButton from './BackButton';

const Topbar = () => {
  const {
    config: { showBackButton },
  } = useStore();

  return (
    <StyledTopbar reverseDirection={showBackButton}>
      <StyledFlexCenterAlignedContainer reverseDirection={showBackButton}>
        <div>
          <SaveButton />
        </div>
        <div>
          <ResetButton />
          <UndoButton />
          <RedoButton />
        </div>
      </StyledFlexCenterAlignedContainer>
      <StyledFlexCenterAlignedContainer>
        <ImageDimensionsAndDisplayToggle />
        <Separator />
        <CanvasZooming />
      </StyledFlexCenterAlignedContainer>
      {showBackButton ? <BackButton /> : <CloseButton />}
    </StyledTopbar>
  );
};
export default Topbar;
