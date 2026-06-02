/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { Slider } from 'components/common';
import {
  StyledBrushSizeWrapper,
  StyledRemoveOptionLabel,
} from './ObjectRemoval.styled';
import { StyledSliderInput, StyledSliderWrapper } from '../tools.styled';

const ObjectRemovalBrushSize = ({
  t,
  minSize,
  maxSize,
  brushSize,
  changeBrushSize,
}) => {
  return (
    <StyledBrushSizeWrapper data-testid="FIE-object-removal-tool-brush-size-option">
      <StyledRemoveOptionLabel size="sm">
        {t('objectRemovalBrushSize')}
      </StyledRemoveOptionLabel>
      <StyledSliderWrapper>
        <Slider
          data-testid="FIE-object-removal-tool-brush-size-slider"
          annotation="px"
          min={minSize}
          max={maxSize}
          onChange={changeBrushSize}
          value={+brushSize}
          width="100%"
          noMargin
        />
        <StyledSliderInput
          data-testid="FIE-object-removal-tool-brush-size-input"
          value={brushSize}
          onChange={({ target: { value } }) => changeBrushSize(value)}
        />
      </StyledSliderWrapper>
    </StyledBrushSizeWrapper>
  );
};

ObjectRemovalBrushSize.propTypes = {
  t: PropTypes.func.isRequired,
  minSize: PropTypes.number.isRequired,
  maxSize: PropTypes.number.isRequired,
  brushSize: PropTypes.number.isRequired,
  changeBrushSize: PropTypes.func.isRequired,
};

export default ObjectRemovalBrushSize;
