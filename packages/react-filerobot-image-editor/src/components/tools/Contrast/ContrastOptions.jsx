/** External Depdencies */
import React from 'react';
import Konva from 'konva';
import PropTypes from 'prop-types';

/** Internal Depdencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';
import Slider from 'components/common/Slider';
import {
  StyledSliderContainer,
  StyledSliderInput,
  StyledSliderLabel,
  StyledSliderWrapper,
} from '../tools.styled';

const MIN_VALUE = -100;
const DEFAULT_VALUE = {
  contrast: 0,
};
const MAX_VALUE = 100;
const sliderStyle = { width: 150, padding: 0, margin: 0 };

const ContrastOptions = ({ t }) => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Contrast,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      contrast: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <StyledSliderContainer className="FIE_contrast-option-wrapper">
      <StyledSliderLabel className="FIE_contrast-option-label">
        {t('contrastTool')}
      </StyledSliderLabel>
      <StyledSliderWrapper>
        <Slider
          className="FIE_contrast-option"
          min={MIN_VALUE}
          max={MAX_VALUE}
          width="124px"
          value={finetuneProps.contrast ?? DEFAULT_VALUE.contrast}
          onChange={changeValue}
          style={sliderStyle}
        />
        <StyledSliderInput
          value={finetuneProps.contrast ?? DEFAULT_VALUE.contrast}
          onChange={({ target: { value } }) => changeValue(value)}
        />
      </StyledSliderWrapper>
    </StyledSliderContainer>
  );
};

ContrastOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default ContrastOptions;
