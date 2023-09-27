/** External Dependencies */
import React from 'react';
import Konva from 'konva';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';
import Slider from 'components/common/Slider';
import {
  StyledSliderContainer,
  StyledSliderInput,
  StyledSliderLabel,
  StyledSliderWrapper,
} from '../tools.styled';

const MIN_VALUE = -1;
const DEFAULT_VALUE = {
  brightness: 0,
};
const MAX_VALUE = 1;
const sliderStyle = { width: 150, padding: 0, margin: 0 };

const BrightnessOptions = ({ t }) => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Brighten,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      brightness: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <StyledSliderContainer className="FIE_brightness-option-wrapper">
      <StyledSliderLabel className="FIE_brightness-option-label">
        {t('brightness')}
      </StyledSliderLabel>
      <StyledSliderWrapper>
        <Slider
          className="FIE_brightness-option"
          min={MIN_VALUE}
          step={0.05}
          max={MAX_VALUE}
          width="124px"
          value={finetuneProps.brightness ?? DEFAULT_VALUE.brightness}
          onChange={changeValue}
          style={sliderStyle}
        />
        <StyledSliderInput
          value={finetuneProps.brightness ?? DEFAULT_VALUE.brightness}
          onChange={({ target: { value } }) => changeValue(value)}
        />
      </StyledSliderWrapper>
    </StyledSliderContainer>
  );
};

BrightnessOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default BrightnessOptions;
