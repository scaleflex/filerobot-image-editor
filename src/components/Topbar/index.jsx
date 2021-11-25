/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import Separator from 'components/common/Separator';
import { usePhoneScreen, useStore } from 'hooks';
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
  const isPhoneScreen = usePhoneScreen();

  return (
    <StyledTopbar reverseDirection={showBackButton}>
      <StyledFlexCenterAlignedContainer reverseDirection={showBackButton}>
        <div>
          <SaveButton />
          {isPhoneScreen && (
            <div style={{ marginTop: 6 }}>
              <ResetButton margin="0" />
              <UndoButton margin="0" />
              <RedoButton margin="0" />
            </div>
          )}
        </div>
        {!isPhoneScreen && (
          <div>
            <ResetButton />
            <UndoButton />
            <RedoButton />
          </div>
        )}
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
