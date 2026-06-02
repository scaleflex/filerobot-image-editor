/** External Dependencies */
import React from 'react';
import { BrushOutline, EraserOutline } from '@scaleflex/icons';
import PropTypes from 'prop-types';
import { TooltipV2 } from '@scaleflex/ui/core';

/** Internal Dependencies */
import {
  StyledBrushModeWrapper,
  StyledButtonsWrapper,
  StyledIconButton,
  StyledRemoveOptionLabel,
} from './ObjectRemoval.styled';

const ObjectRemovalBrushMode = ({ t, isHighlightMode, setIsHighlightMode }) => (
  <StyledBrushModeWrapper>
    <StyledRemoveOptionLabel size="sm">
      {t('objectRemovalBrushMode')}
    </StyledRemoveOptionLabel>
    <StyledButtonsWrapper>
      <TooltipV2 title={t('objectRemovalMarkModeTooltip')} size="md">
        <StyledIconButton
          onClick={() => setIsHighlightMode(true)}
          size="sm"
          data-testid="FIE-object-removal-tool-brush-mode-toggle"
          active={isHighlightMode}
          color="base"
        >
          <BrushOutline size={20} />
        </StyledIconButton>
      </TooltipV2>
      <TooltipV2 title={t('objectRemovalUnMarkModeTooltip')} size="md">
        <StyledIconButton
          onClick={() => setIsHighlightMode(false)}
          size="sm"
          data-testid="FIE-object-removal-tool-brush-mode-toggle"
          active={!isHighlightMode}
          color="base"
        >
          <EraserOutline size={20} />
        </StyledIconButton>
      </TooltipV2>
    </StyledButtonsWrapper>
  </StyledBrushModeWrapper>
);

ObjectRemovalBrushMode.propTypes = {
  t: PropTypes.func.isRequired,
  isHighlightMode: PropTypes.bool.isRequired,
  setIsHighlightMode: PropTypes.func.isRequired,
};

export default ObjectRemovalBrushMode;
