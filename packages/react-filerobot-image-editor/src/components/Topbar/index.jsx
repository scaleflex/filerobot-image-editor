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
    config: { showBackButton, disableZooming },
  } = useStore();
  const isPhoneScreen = usePhoneScreen();

  return (
    <StyledTopbar reverseDirection={showBackButton} className="FIE_topbar">
      <StyledFlexCenterAlignedContainer
        reverseDirection={showBackButton}
        className="FIE_topbar-buttons-wrapper"
      >
        {isPhoneScreen ? (
          <div>
            <SaveButton />
            <div
              style={{ marginTop: 6 }}
              className="FIE_topbar-history-buttons"
            >
              <ResetButton margin="0" />
              <UndoButton margin="0" />
              <RedoButton margin="0" />
            </div>
          </div>
        ) : (
          <>
            <SaveButton />
            <div className="FIE_topbar-history-buttons">
              <ResetButton />
              <UndoButton />
              <RedoButton />
            </div>
          </>
        )}
      </StyledFlexCenterAlignedContainer>
      <StyledFlexCenterAlignedContainer className="FIE_topbar-center-options">
        <ImageDimensionsAndDisplayToggle />
        {!disableZooming && (
          <>
            <Separator />
            <CanvasZooming />
          </>
        )}
      </StyledFlexCenterAlignedContainer>
      {showBackButton ? <BackButton /> : <CloseButton />}
    </StyledTopbar>
  );
};
export default Topbar;
